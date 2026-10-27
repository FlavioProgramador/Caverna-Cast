import type { AnchorHTMLAttributes, ReactNode } from "react";
import { whatsappUrl } from "../data/siteData";

type WhatsAppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  message: string;
  children: ReactNode;
};

export function WhatsAppLink({ message, children, ...props }: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      data-analytics-event="whatsapp_click"
      {...props}
    >
      {children}
    </a>
  );
}
