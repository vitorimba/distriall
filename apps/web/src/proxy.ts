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

  // Already authenticated accessing login: redirect based on role
  if (user && path === '/login') {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role === 'entregador') {
      return NextResponse.redirect(new URL('/driver', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Root redirect for authenticated users
  if (user && path === '/') {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role === 'entregador') {
      return NextResponse.redirect(new URL('/driver', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Bidirectional /driver protection:
  // (a) Non-drivers trying to access /driver → redirect to /dashboard
  // (b) Drivers trying to access non-driver protected routes → redirect to /driver
  if (user && path.startsWith('/driver')) {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'entregador') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  if (user && !path.startsWith('/driver')) {
    const driverOnlyPaths = ['/dashboard', '/orders', '/products', '/clients', '/financial', '/stats', '/settings'];
    const isDriverOnlyPath = driverOnlyPaths.some((p) => path.startsWith(p));
    if (isDriverOnlyPath) {
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role === 'entregador') {
        return NextResponse.redirect(new URL('/driver', request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|manifest.json|sw.js|offline.html).*)',
  ],
};
