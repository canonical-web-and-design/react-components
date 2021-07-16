import classNames from "classnames";
import { useEffect, useRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";

import Field from "../Field";

/**
 * The props for the Textarea component.
 */
export type Props = {
  /**
   * The content for caution validation.
   */
  caution?: ReactNode;
  /**
   * Optional class(es) to pass to the textarea element.
   */
  className?: string;
  /**
   * The content for error validation.
   */
  error?: ReactNode;
  /**
   * Whether the textarea should grow to fit the content automatically.
   */
  grow?: boolean;
  /**
   * Help text to show below the field.
   */
  help?: ReactNode;
  /**
   * The id of the textarea.
   */
  id?: string;
  /**
   * The label for the field.
   */
  label?: ReactNode;
  /**
   * Optional class(es) to pass to the label component.
   */
  labelClassName?: string;
  /**
   * Whether the field is required.
   */
  required?: boolean;
  /**
   * Whether the form field should have a stacked appearance.
   */
  stacked?: boolean;
  /**
   * The content for success validation.
   */
  success?: ReactNode;
  /**
   * Whether to focus on the input on initial render.
   */
  takeFocus?: boolean;
  /**
   * Optional class(es) to pass to the wrapping Field component
   */
  wrapperClassName?: string;
} & HTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({
  caution,
  className,
  error,
  grow = false,
  help,
  id,
  label,
  labelClassName,
  onKeyUp,
  required,
  stacked,
  style,
  success,
  takeFocus = false,
  wrapperClassName,
  ...props
}: Props): JSX.Element => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (takeFocus) {
      textareaRef.current.focus();
    }
  }, [takeFocus]);

  return (
    <Field
      caution={caution}
      className={wrapperClassName}
      error={error}
      forId={id}
      help={help}
      label={label}
      labelClassName={labelClassName}
      required={required}
      stacked={stacked}
      success={success}
    >
      <textarea
        className={classNames("p-form-validation__input", className)}
        id={id}
        onKeyUp={(evt) => {
          onKeyUp && onKeyUp(evt);
          if (grow) {
            evt.currentTarget.style.height =
              evt.currentTarget.scrollHeight + "px";
          }
        }}
        ref={textareaRef}
        style={
          (grow && {
            minHeight: "5rem",
            resize: "none",
            overflow: "hidden",
            boxSizing: "border-box",
            ...style,
          }) ||
          style
        }
        {...props}
      />
    </Field>
  );
};

export default Textarea;
