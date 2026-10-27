type PlausibleEvent = (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;

declare global {
  interface Window {
    plausible?: PlausibleEvent;
  }
}

const providerDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN?.trim();
const providerScript = import.meta.env.VITE_PLAUSIBLE_SRC?.trim() || "https://plausible.io/js/script.js";
let initialized = false;

/**
 * Optional, privacy-conscious event instrumentation.
 * No script or event is sent unless a Plausible domain is explicitly configured.
 * Never pass message contents, phone numbers, emails, or other personal data as props.
 */
export function initAnalytics(): void {
  if (initialized || !providerDomain || typeof document === "undefined") return;
  initialized = true;

  const script = document.createElement("script");
  script.defer = true;
  script.src = providerScript;
  script.dataset.domain = providerDomain;
  document.head.append(script);

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const control = target.closest<HTMLElement>("[data-analytics-event]");
    const eventName = control?.dataset.analyticsEvent;
    if (!eventName) return;
    window.plausible?.(eventName);
  });
}

export function trackEvent(eventName: string): void {
  if (!providerDomain || typeof window === "undefined") return;
  window.plausible?.(eventName);
}
