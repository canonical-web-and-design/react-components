import { HTMLProps } from "react";
import type { ReactNode } from "react";

import CheckableInput from "../CheckableInput";

export type Props = {
  /**
   * The label of the radio input.
   */
  label: ReactNode;
} & HTMLProps<HTMLInputElement>;

const RadioInput = ({ label, ...radioProps }: Props): JSX.Element => {
  return (
    <CheckableInput
      inputType="radio"
      label={label}
      {...radioProps}
    ></CheckableInput>
  );
};

export default RadioInput;
