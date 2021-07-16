import classNames from "classnames";
import type { HTMLProps, ReactNode } from "react";

export type BaseForm = {
  /**
   * The content of the form.
   */
  children?: ReactNode;
  /**
   * Optional class(es) to pass to the form element.
   */
  className?: string;
};

export type OrderedForm = BaseForm & {
  inline?: false;
  stacked?: false;
};

export type InlineForm = BaseForm & {
  inline: boolean;
  stacked?: false;
};

export type StackedForm = BaseForm & {
  inline?: false;
  stacked: boolean;
};

export type Props = (OrderedForm | InlineForm | StackedForm) &
  HTMLProps<HTMLFormElement>;

const Form = ({
  children,
  className,
  inline,
  stacked,
  ...props
}: Props): JSX.Element => (
  <form
    className={classNames(className, {
      "p-form": inline || stacked,
      "p-form--inline": inline,
      "p-form--stacked": stacked,
    })}
    {...props}
  >
    {children}
  </form>
);

export default Form;
