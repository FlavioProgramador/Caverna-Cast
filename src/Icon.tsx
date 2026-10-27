import type { ReactNode, SVGProps } from "react";

type IconName =
  | "arrow"
  | "camera"
  | "check"
  | "menu"
  | "mic"
  | "monitor"
  | "play"
  | "scissors"
  | "sparkles"
  | "layers"
  | "sliders"
  | "close"
  | "instagram"
  | "whatsapp"
  | "chevron-left"
  | "chevron-right";

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

const paths: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  camera: (
    <>
      <path d="M14 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <path d="m16 10 6-3v10l-6-3" />
      <circle cx="9" cy="12" r="3" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8m-4-4v4" />
    </>
  ),
  play: <path d="m9 6 9 6-9 6z" />,
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="m8.1 8.1 12.8 12.8M14 6l6-4M8.1 15.9l5-5" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
      <path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 8h4" />
    </>
  ),
  close: <path d="m18 6-12 12M6 6l12 12" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.2L4 20l1.1-4A8.2 8.2 0 1 1 20.2 11.8Z" />
      <path d="M8.5 8.5c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4 0 .7.3.5.8 1.1 1.4 1.6.7.6 1.3.9 1.7 1 .3.1.5.1.7-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5s-.1.8-.5 1.2c-.4.4-1 .6-1.6.6-.7 0-1.6-.3-2.7-.8-1.5-.7-2.7-1.9-3.5-3.1-.7-1-.9-1.8-.9-2.5 0-.7.3-1.4.6-1.8Z" />
    </>
  ),
  "chevron-left": <path d="m15 18-6-6 6-6" />,
  "chevron-right": <path d="m9 18 6-6-6-6" />,
};

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
