import type { ReactNode } from "react";
import { RollText } from "./RollText";
import { WhatsAppLink } from "./WhatsAppLink";
import { generalMessage } from "../data/siteData";

/** The play triangle from the Caverna Cast logo. */
export function PlayMark() {
  return (
    <svg className="play-mark" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 1.8v12.4a.8.8 0 0 0 1.2.7l10.1-6.2a.8.8 0 0 0 0-1.4L4.2 1.1A.8.8 0 0 0 3 1.8Z" />
    </svg>
  );
}

type BookButtonProps = {
  label: string;
  message?: string;
  variant?: "ocre" | "light" | "blue";
  size?: "md" | "sm";
  className?: string;
  icon?: ReactNode;
  "aria-label"?: string;
};

/** Primary booking call to action: opens WhatsApp with a prefilled message. */
export function BookButton({
  label,
  message = generalMessage,
  variant = "ocre",
  size = "md",
  className = "",
  icon,
  ...rest
}: BookButtonProps) {
  const classes = ["btn", variant === "ocre" ? "btn--ocre" : variant === "blue" ? "btn--blue" : "", size === "sm" ? "btn--sm" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <WhatsAppLink className={classes} message={message} {...rest}>
      <span className="btn__icon">{icon ?? <PlayMark />}</span>
      <RollText>{label}</RollText>
    </WhatsAppLink>
  );
}
