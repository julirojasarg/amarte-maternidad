(() => {
  const key = 'amarte_analytics';
  let paused = false;
  const choice = () => document.cookie.split(';').some(part => part.trim() === `${key}=accepted`) ? 'accepted' :
    document.cookie.split(';').some(part => part.trim() === `${key}=rejected`) ? 'rejected' : '';
  const setChoice = value => {
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    // Remove a legacy host-only cookie before writing the shared preference.
    document.cookie = `${key}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
    // Keep one preference across the apex and www hostnames.
    document.cookie = `${key}=${value}; Domain=amartecr.com; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  };
  window.AmarteAnalyticsConsent = { granted: () => !paused && choice() === 'accepted' };
  const savedChoice = choice();
  if (savedChoice) setChoice(savedChoice);

  function showPrompt(force = false) {
    if (!force && (choice() || new URLSearchParams(location.search).get('analytics') === 'off')) return;
    if (document.getElementById('analyticsConsent')) return;
    const panel = document.createElement('section');
    panel.id = 'analyticsConsent';
    panel.className = 'analytics-consent';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'false');
    panel.setAttribute('aria-labelledby', 'analyticsConsentTitle');
    panel.innerHTML = '<div class="analytics-consent-copy"><strong id="analyticsConsentTitle">¿Nos permites medir el uso del sitio?</strong><p>La analítica propia cuenta visitas, secciones y clics de contacto. Si aceptas, también estimamos provincia y cantón mediante Cloudflare. Guardamos conteos agregados, sin IP ni coordenadas en nuestra base analítica. Los proveedores aún pueden procesar datos técnicos para operar y proteger el sitio. Puedes rechazar o cambiar tu elección cuando quieras. <a href="/privacidad">Lee el aviso de privacidad.</a></p></div><div class="analytics-consent-actions"><button type="button" data-choice="rejected" class="analytics-reject">Rechazar</button><button type="button" data-choice="accepted" class="analytics-accept">Aceptar analítica</button></div>';
    panel.addEventListener('click', event => {
      const button = event.target.closest('button[data-choice]');
      if (!button) return;
      setChoice(button.dataset.choice);
      location.reload();
    });
    document.body.append(panel);
  }

  document.addEventListener('click', event => {
    if (event.target.closest('[data-analytics-settings]')) {
      event.preventDefault();
      paused = true;
      showPrompt(true);
      document.getElementById('analyticsConsent')?.scrollIntoView({ block:'nearest' });
    }
  });
  showPrompt();
})();
