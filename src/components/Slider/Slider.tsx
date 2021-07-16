import type { ChangeEventHandler, HTMLProps, ReactNode } from "react";

import Field from "../Field";

export const FILLED_COLOR = "#0066CC";

export type Props = {
  /**
   * Field caution message.
   */
  caution?: ReactNode;
  /**
   * Whether to disable the slider and input (if showInput is true).
   */
  disabled?: boolean;
  /**
   * Field error message.
   */
  error?: ReactNode;
  /**
   * Field help message.
   */
  help?: ReactNode;
  /**
   * Field id. Only passed to range input, not to number input.
   */
  id?: string;
  /**
   * Whether to disable only the input, but not the slider.
   */
  inputDisabled?: boolean;
  /**
   * Field label.
   */
  label?: ReactNode;
  /**
   * Maximum value of the slider.
   */
  max: number;
  /**
   * Minimum value of the slider.
   */
  min: number;
  /**
   * Change event handler.
   */
  onChange: ChangeEventHandler;
  /**
   * Whether the field is required for the form to submit.
   */
  required?: boolean;
  /**
   * Whether to show a number input with the numerical value next to the slider.
   */
  showInput?: boolean;
} & HTMLProps<HTMLInputElement>;

export const Slider = ({
  caution,
  disabled = false,
  error,
  help,
  id,
  inputDisabled = false,
  label,
  max,
  min,
  onChange,
  required = false,
  showInput = false,
  ...inputProps
}: Props): JSX.Element => {
  let style = {};
  if (navigator?.userAgent?.includes("AppleWebKit")) {
    // Range inputs on Webkit browsers don't have a built-in "filled" portion,
    // so instead it is handled here as a background.
    const val = inputProps.value || inputProps.defaultValue;
    const filledPercentage = `${((Number(val) - min) / (max - min)) * 100}%`;
    style = {
      background: `linear-gradient(
        to right,
        ${FILLED_COLOR} 0%,
        ${FILLED_COLOR} ${filledPercentage},
        transparent ${filledPercentage},
        transparent 100%
      )`,
    };
  }
  return (
    <Field
      caution={caution}
      error={error}
      help={help}
      label={label}
      required={required}
    >
      <div className="p-slider__wrapper">
        <input
          disabled={disabled}
          id={id}
          max={max}
          min={min}
          onChange={onChange}
          required={required}
          style={style}
          type="range"
          {...inputProps}
        />
        {showInput && (
          <input
            className="p-slider__input"
            disabled={disabled || inputDisabled}
            max={max}
            min={min}
            onChange={onChange}
            type="number"
            {...inputProps}
          />
        )}
      </div>
    </Field>
  );
};

export default Slider;
