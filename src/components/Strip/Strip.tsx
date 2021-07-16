import classNames from "classnames";
import type { ElementType, HTMLProps, ReactNode } from "react";

import Col from "../Col";
import type { ColSize } from "../Col/Col";
import Row from "../Row";

export type Props = {
  /**
   * The content of the strip.
   */
  children: ReactNode;
  /**
   * A background images for the strip.
   */
  background?: string;
  /**
   * Whether the strip should display borders.
   */
  bordered?: boolean;
  /**
   * Optional classes for the strip.
   */
  className?: string;
  /**
   * The width of the column if `includeCol` has been set.
   */
  colSize?: ColSize;
  /**
   * Whether the strip should be dark.
   */
  dark?: boolean;
  /**
   * Whether the strip should be deep.
   */
  deep?: boolean;
  /**
   * The base HTML element of the strip.
   */
  element?: ElementType;
  /**
   * Whether the strip should wrap the content in a column.
   */
  includeCol?: boolean;
  /**
   * Whether the strip should be light.
   */
  light?: boolean;
  /**
   * Optional classes to apply to the row.
   */
  rowClassName?: string;
  /**
   * Whether the strip should be shallow.
   */
  shallow?: boolean;
  /**
   * The type of the strip (e.g. "accent" or "image").
   */
  type?: string;
} & HTMLProps<HTMLElement>;

const Strip = ({
  background,
  bordered = false,
  children,
  className,
  colSize = 12,
  dark = false,
  deep = false,
  includeCol = true,
  element: Component = "div",
  light = false,
  rowClassName,
  shallow = false,
  type,
  ...props
}: Props): JSX.Element => (
  <Component
    className={classNames(className, {
      [`p-strip--${type}`]: !!type,
      "p-strip": !type,
      "is-bordered": bordered,
      "is-dark": dark,
      "is-deep": deep,
      "is-light": light,
      "is-shallow": shallow,
    })}
    style={
      background && {
        backgroundImage: `url('${background}')`,
      }
    }
    {...props}
  >
    <Row className={rowClassName}>
      {includeCol ? <Col size={colSize}>{children}</Col> : children}
    </Row>
  </Component>
);

export default Strip;
