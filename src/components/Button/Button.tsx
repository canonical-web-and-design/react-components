import classNames from "classnames";
import type {
  HTMLProps,
  ElementType,
  ReactNode,
  ComponentType,
  MouseEvent as ReactMouseEvent,
} from "react";

import type { ValueOf } from "../../types";

export const ButtonAppearance = {
  BASE: "base",
  BRAND: "brand",
  LINK: "link",
  NEGATIVE: "negative",
  NEUTRAL: "neutral",
  POSITIVE: "positive",
} as const;

/**
 * The type of the Button props.
 * @template P - The type of the props if providing a component to `element`
 */
export type Props<P = null> = {
  /**
   * The appearance of the button.
   */
  appearance?: ValueOf<typeof ButtonAppearance> | string;
  /**
   * The content of the button.
   */
  children?: ReactNode;
  /**
   * Optional class(es) to pass to the button element.
   */
  className?: string;
  /**
   * Whether the button should have dense padding.
   */
  dense?: boolean;
  /**
   * Whether the button should be disabled.
   */
  disabled?: boolean;
  /**
   * Optional element or component to use instead of <button>.
   */
  element?: ElementType | ComponentType<P>;
  /**
   * Whether the button has an icon in the content.
   */
  hasIcon?: boolean;
  /**
   * Whether the button should display inline.
   */
  inline?: boolean;
  /**
   * Function for handling button click event.
   */
  onClick?: (evt: ReactMouseEvent) => void;
  /**
   * Whether the button should be small.
   */
  small?: boolean;
} & (HTMLProps<HTMLElement> | P);

/**
 * A component for the Vanilla button.
 * @template P - The type of the props if providing a component to `element`
 */
const Button = <P,>({
  appearance = ButtonAppearance.NEUTRAL,
  children,
  className,
  dense,
  disabled,
  element: Component = "button",
  hasIcon,
  inline,
  onClick,
  small,
  ...buttonProps
}: Props<P>): JSX.Element => {
  const classes = classNames(
    `p-button--${appearance}`,
    {
      "has-icon": hasIcon,
      "is-dense": dense,
      "is-disabled": Component !== "button" && disabled,
      "is-inline": inline,
      "is-small": small,
    },
    className
  );
  const onClickDisabled = (e: MouseEvent) => e.preventDefault();
  const disabledProp =
    Component === "button" ? { disabled } : { "aria-disabled": disabled };

  return (
    <Component
      className={classes}
      onClick={disabled ? onClickDisabled : onClick}
      {...disabledProp}
      {...buttonProps}
    >
      {children}
    </Component>
  );
};

export default Button;
