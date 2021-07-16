import classNames from "classnames";
import type { ReactNode } from "react";

import Label from "../Label";
import Col from "../Col";

/**
 * The props for the Field component.
 */
export type Props = {
  /**
   * The content for caution validation.
   */
  caution?: ReactNode;
  /**
   * The content of the Field component.
   */
  children?: ReactNode;
  /**
   * Optional class(es) to pass to the Field wrapper div.
   */
  className?: string;
  /**
   * The content for error validation.
   */
  error?: ReactNode;
  /**
   * The id of the input this Field component is controlling.
   */
  forId?: string;
  /**
   * Help text to show below the field.
   */
  help?: ReactNode;
  /**
   * Whether the component is wrapping a select element.
   */
  isSelect?: boolean;
  /**
   * The label for the field.
   */
  label?: ReactNode;
  /**
   * Optional class(es) to pass to the label component.
   */
  labelClassName?: string;
  /**
   * Whether the label should show before the input.
   */
  labelFirst?: boolean;
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
};

const generateHelp = (help: Props["help"]) =>
  help && <p className="p-form-help-text">{help}</p>;

const generateError = (
  error: Props["error"],
  caution: Props["caution"],
  success: Props["success"]
) => {
  if (!error && !caution && !success) {
    return null;
  }
  const messageType =
    (error && "Error") || (caution && "Caution") || (success && "Success");
  return (
    <p className="p-form-validation__message">
      <strong>{messageType}:</strong> {error || caution || success}
    </p>
  );
};

const generateLabel = (
  forId: Props["forId"],
  required: Props["required"],
  label: Props["label"],
  labelClassName: Props["labelClassName"],
  stacked: Props["stacked"]
) => {
  if (!label) {
    return null;
  }
  const labelNode = (
    <Label className={labelClassName} forId={forId} required={required}>
      {label}
    </Label>
  );
  if (stacked) {
    return <Col size={4}>{labelNode}</Col>;
  }
  return labelNode;
};

const generateContent = (
  isSelect: Props["isSelect"],
  children: Props["children"],
  labelFirst: Props["labelFirst"],
  labelNode: JSX.Element | null,
  help: Props["help"],
  error: Props["error"],
  caution: Props["caution"],
  success: Props["success"]
) => (
  <div className="p-form__control u-clearfix">
    {isSelect ? (
      <div className="p-form-validation__select-wrapper">{children}</div>
    ) : (
      children
    )}
    {!labelFirst && labelNode}
    {generateHelp(help)}
    {generateError(error, caution, success)}
  </div>
);

const Field = ({
  caution,
  children,
  className,
  error,
  forId,
  help,
  isSelect,
  label,
  labelClassName,
  labelFirst = true,
  required,
  stacked,
  success,
}: Props): JSX.Element => {
  const labelNode = generateLabel(
    forId,
    required,
    label,
    labelClassName,
    stacked
  );
  const content = generateContent(
    isSelect,
    children,
    labelFirst,
    labelNode,
    help,
    error,
    caution,
    success
  );
  return (
    <div
      className={classNames("p-form__group", "p-form-validation", className, {
        "is-error": error,
        "is-caution": caution,
        "is-success": success,
        row: stacked,
      })}
    >
      {labelFirst && labelNode}
      {stacked ? <Col size={8}>{content}</Col> : content}
    </div>
  );
};

export default Field;
