import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_PATHS = [
  '/dashboard',
  '/driver',
  '/orders',
  '/products',
  '/clients',
  '/financial',
  '/stats',
  '/settings',
];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  // Protected routes: redirect to login if not authenticated
  const isProtected = PROTECTED_PATHS.some((p) => path.startsWith(p));
  if (!user && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Fetch user role ONCE for all checks below
  const needsRole = user && (path === '/login' || path === '/' || isProtected);
  let role: string | null = null;
  if (needsRole) {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();
    role = profile?.role ?? null;
  }
  const isDriver = role === 'entregador';

  // Already authenticated accessing login: redirect based on role
  if (user && path === '/login') {
    return NextResponse.redirect(new URL(isDriver ? '/driver' : '/dashboard', request.url));
  }

  // Root redirect for authenticated users
  if (user && path === '/') {
    return NextResponse.redirect(new URL(isDriver ? '/driver' : '/dashboard', request.url));
  }

  // Bidirectional /driver protection:
  // (a) Non-drivers trying to access /driver → redirect to /dashboard
  if (user && path.startsWith('/driver') && !isDriver) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // (b) Drivers trying to access non-driver protected routes → redirect to /driver
  if (user && !path.startsWith('/driver') && isDriver && isProtected) {
    return NextResponse.redirect(new URL('/driver', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|manifest.json|sw.js|offline.html).*)',
  ],
};
