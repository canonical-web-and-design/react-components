import classNames from "classnames";

export type Props = {
  /**
   * Optional class(es) to pass to the wrapping span element.
   */
  className?: string;
  /**
   * Whether the spinner should have a light appearance.
   */
  isLight?: boolean;
  /**
   * Text to display next to the spinner.
   */
  text?: string;
};

const Spinner = ({ className, text, isLight = false }: Props): JSX.Element => (
  <span className={classNames(className, "p-text--default")}>
    <i
      className={classNames("p-icon--spinner", "u-animation--spin", {
        "is-light": isLight,
      })}
    />
    {text && (
      <>
        &ensp;
        <span>{text}</span>
      </>
    )}
  </span>
);

export default Spinner;
