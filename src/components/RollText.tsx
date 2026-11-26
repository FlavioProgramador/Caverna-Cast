type RollTextProps = {
  children: string;
};

/**
 * Text that rolls up to a duplicate copy on hover/focus of the parent link or button.
 * The copy is hidden from assistive technology, so the accessible name stays the same.
 */
export function RollText({ children }: RollTextProps) {
  return (
    <span className="roll">
      <span className="roll__line">{children}</span>
      <span className="roll__line" aria-hidden="true">{children}</span>
    </span>
  );
}
