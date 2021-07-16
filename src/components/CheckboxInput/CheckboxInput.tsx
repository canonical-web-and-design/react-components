import { HTMLProps } from "react";
import type { ReactNode } from "react";

import CheckableInput from "../CheckableInput";

export type Props = {
  /**
   * The label for the checkbox.
   */
  label: ReactNode;
  /**
   * Whether the checkbox should display in indeterminate state.
   */
  indeterminate?: boolean;
} & HTMLProps<HTMLInputElement>;

const CheckboxInput = ({
  label,
  indeterminate = false,
  ...checkboxProps
}: Props): JSX.Element => {
  return (
    <CheckableInput
      label={label}
      inputType="checkbox"
      indeterminate={indeterminate}
      {...checkboxProps}
    ></CheckableInput>
  );
};

export default CheckboxInput;
