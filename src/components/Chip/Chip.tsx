import { highlightSubString } from "../../utils";
import type { KeyboardEvent, MouseEvent } from "react";

export type Props = {
  /**
   * The lead for the chip.
   */
  lead?: string;
  /**
   * Function for handling chip div click event.
   */
  onClick?: (
    event: MouseEvent<HTMLDivElement> | { lead: string; value: string }
  ) => void;
  /**
   * Function for handling dismissing a chip.
   */
  onDismiss?: () => void;
  /**
   * Whether the chip is selected.
   */
  selected?: boolean;
  /**
   * A substring to emphasise if it is part of the chip's value,
   * e.g. "sit" => poSITive
   */
  subString?: string;
  /**
   * Whether to wrap the value in quotation marks.
   */
  quoteValue?: boolean;
  /**
   * The value of the chip.
   */
  value: string;
};

const Chip = ({
  lead = "",
  onClick,
  onDismiss,
  quoteValue,
  selected,
  subString = "",
  value,
}: Props): JSX.Element => {
  // When user tabs over chip and presses Enter or Space key, chip will trigger
  // click functionality
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // The " " value is what is returned for the spacebar
    if (e.key === " " || e.key === "Enter") {
      if (typeof onClick === "function") {
        onClick({ lead: lead, value: value });
      }
    }
  };

  const chipValue = highlightSubString(value, subString).text;
  return (
    <div
      className="p-chip"
      aria-pressed={selected}
      role="button"
      tabIndex={!onDismiss ? 0 : null}
      onClick={onClick}
      onKeyDown={(e) => onKeyDown(e)}
    >
      {lead && <span className="p-chip__lead">{lead.toUpperCase()}</span>}
      <span
        className="p-chip__value"
        dangerouslySetInnerHTML={{
          __html: quoteValue ? `'${chipValue}'` : chipValue,
        }}
      />

      {onDismiss ? (
        <button className="p-chip__dismiss" onClick={() => onDismiss()}>
          <i className="p-icon--close">Dismiss</i>
        </button>
      ) : null}
    </div>
  );
};

export default Chip;
