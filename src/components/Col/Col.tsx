import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

export const colSizes = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
] as const;

export type ColSize = typeof colSizes[number];

type Props = {
  size: ColSize;
  children?: ReactNode;
  className?: string;
  element?: ElementType;
  emptyLarge?: ColSize;
  emptyMedium?: ColSize;
  emptySmall?: ColSize;
  large?: ColSize;
  medium?: ColSize;
  small?: ColSize;
} & HTMLAttributes<HTMLElement>;

const Col = ({
  children,
  className,
  element: Component = "div",
  emptyLarge,
  emptyMedium,
  emptySmall,
  large,
  medium,
  size,
  small,
  ...props
}: Props): JSX.Element => (
  <Component
    className={classNames(className, `col-${size}`, {
      [`col-small-${small}`]: !!small,
      [`col-medium-${medium}`]: !!medium,
      [`col-large-${large}`]: !!large,
      [`col-start-small-${emptySmall}`]: !!emptySmall,
      [`col-start-medium-${emptyMedium}`]: !!emptyMedium,
      [`col-start-large-${emptyLarge}`]: !!emptyLarge,
    })}
    {...props}
  >
    {children}
  </Component>
);

Col.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  element: PropTypes.string,
  emptyLarge: PropTypes.oneOf(colSizes),
  emptyMedium: PropTypes.oneOf(colSizes),
  emptySmall: PropTypes.oneOf(colSizes),
  large: PropTypes.oneOf(colSizes),
  medium: PropTypes.oneOf(colSizes),
  size: PropTypes.oneOf(colSizes).isRequired,
  small: PropTypes.oneOf(colSizes),
};

export default Col;
