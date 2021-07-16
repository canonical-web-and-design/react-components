import classNames from "classnames";
import { nanoid } from "nanoid";
import { useEffect, useRef, HTMLProps } from "react";
import type { ReactNode } from "react";

export type Props = {
  /**
   * The type of the input element.
   */
  inputType: "radio" | "checkbox";
  /**
   * The label for the input element.
   */
  label: ReactNode;
  /**
   * Whether the input element should display in indeterminate state.
   */
  indeterminate?: boolean;
} & HTMLProps<HTMLInputElement>;

const CheckableInput = ({
  inputType,
  label,
  indeterminate = false,
  ...checkboxProps
}: Props): JSX.Element => {
  const inputId = useRef(nanoid());
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      className={classNames(`p-${inputType}`, {
        "is-required": checkboxProps.required,
      })}
    >
      <input
        aria-labelledby={inputId.current}
        className={`p-${inputType}__input`}
        ref={inputRef}
        type={inputType}
        {...checkboxProps}
      />
      <span className={`p-${inputType}__label`} id={inputId.current}>
        {label}
      </span>
    </label>
  );
};

export default CheckableInput;
