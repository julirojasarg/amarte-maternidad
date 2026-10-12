// Analítica agregada: eventos categorizados, sin IP, identificadores ni texto libre.
(() => {
  if (new URLSearchParams(window.location.search).get('analytics') === 'off') return;
  if (!window.AmarteAnalyticsConsent?.granted()) return;
  const sections = new Set(['inicio', 'parto', 'paquetes', 'lactancia', 'cobertura', 'sobre-mi', 'testimonios', 'faq', 'contacto', 'footer']);
  const sentSections = new Set();
  const pendingSections = new Map();
  let observer;

  function getReferrerOrigin() {
    try { return document.referrer ? new URL(document.referrer).origin : ''; } catch (_) { return ''; }
  }

  function sendAnalyticsEvent(event, element, section = '') {
    if (!window.AmarteAnalyticsConsent?.granted()) return;
    if (!['section_view', 'navigation_click', 'faq_open', 'whatsapp_click', 'outbound_click'].includes(event)) return;
    const body = JSON.stringify({ event, element, section, referrer: getReferrerOrigin() });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/event', new Blob([body], { type: 'application/json' }));
    } else {
      fetch('/api/analytics/event', { method:'POST', headers:{'Content-Type':'application/json'}, body, keepalive:true }).catch(() => {});
    }
  }

  window.trackAnalytics = sendAnalyticsEvent;

  function clearPendingSections() {
    for (const timer of pendingSections.values()) clearTimeout(timer);
    pendingSections.clear();
  }

  function startSectionMeasurement() {
    if (!('IntersectionObserver' in window)) return;
    const targets = [...document.querySelectorAll('section[id], footer#footer, [data-analytics-section]')]
      .filter(node => sections.has(node.id) && !node.closest('.hidden'));
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const id = entry.target.id;
        if (!sections.has(id) || sentSections.has(id)) continue;
        if (document.visibilityState !== 'visible' || !entry.isIntersecting) {
          const timer = pendingSections.get(id);
          if (timer) clearTimeout(timer);
          pendingSections.delete(id);
          continue;
        }
        if (!pendingSections.has(id)) {
          const timer = setTimeout(() => {
            pendingSections.delete(id);
            if (document.visibilityState === 'visible' && !sentSections.has(id)) {
              sentSections.add(id);
              sendAnalyticsEvent('section_view', 'visible_section', id);
            }
          }, 1200);
          pendingSections.set(id, timer);
        }
      }
    }, { rootMargin:'-20% 0px -60% 0px', threshold:0 });
    targets.forEach(node => observer.observe(node));
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') clearPendingSections();
    else if (observer) {
      observer.disconnect();
      startSectionMeasurement();
    }
  });

  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const cta = target.closest('[data-analytics-cta]');
    if (cta) {
      sendAnalyticsEvent('whatsapp_click', cta.dataset.analyticsCta);
      return;
    }

    const outbound = target.closest('[data-analytics-outbound]');
    if (outbound) {
      sendAnalyticsEvent('outbound_click', outbound.dataset.analyticsOutbound);
      return;
    }

    const anchor = target.closest('a[href^="#"]');
    if (!anchor) return;
    const id = anchor.getAttribute('href').slice(1);
    if (!sections.has(id) || !document.getElementById(id) || document.getElementById(id).closest('.hidden')) return;
    const element = anchor.dataset.analyticsNav ||
      (anchor.closest('#mobile-menu') ? 'nav_mobile' :
        anchor.closest('#navbar nav') ? 'nav_desktop' :
          anchor.closest('footer') ? 'footer_links' :
            anchor.closest('[data-analytics-banner]') ? 'banner_link' : 'content_link');
    sendAnalyticsEvent('navigation_click', element, id);
  }, { capture:true });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startSectionMeasurement, { once:true });
  else startSectionMeasurement();
})();
