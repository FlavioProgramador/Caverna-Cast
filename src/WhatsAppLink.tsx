import type { AnchorHTMLAttributes, ReactNode } from "react";
import { whatsappUrl } from "./siteData";

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
      {...props}
    >
      {children}
    </a>
  );
}
