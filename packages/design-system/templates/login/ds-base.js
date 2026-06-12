// templates/tela-app/ds-base.js
(() => {
  const base = '../..';
  const sheets = ['styles.css']; // global stylesheets deste design system
  let pending = sheets.length;
  const loadBundle = () => {
    const s = document.createElement('script');
    s.src = base + '/_ds_bundle.js';
    s.onerror = () => console.error('ds-base.js: failed to load ' + s.src + ' — if this is a consuming project, point the base line in ds-base.js at the bound _ds/<folder> tree relative to this page (e.g. _ds/<folder> at the project root, ../_ds/<folder> one level down); in a fresh design system this can just mean the bundle is not compiled yet');
    document.head.appendChild(s);
  };
  // espera o CSS carregar antes do bundle — evita o React montar sem estilos
  const done = () => { if (--pending <= 0) loadBundle(); };
  for (const p of sheets) {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = base + '/' + p;
    l.onload = done; l.onerror = done;
    document.head.appendChild(l);
  }
  if (!sheets.length) loadBundle();
})();
