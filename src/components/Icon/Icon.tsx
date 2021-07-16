import classNames from "classnames";
import type { HTMLProps } from "react";

import type { ValueOf } from "../../types";

export const ICONS = {
  anchor: "anchor",
  chevronDown: "chevron-down",
  chevronUp: "chevron-up",
  close: "close",
  code: "code",
  collapse: "collapse",
  copy: "copy",
  delete: "delete",
  drag: "drag",
  error: "error",
  expand: "expand",
  externalLink: "external-link",
  help: "help",
  information: "information",
  menu: "menu",
  minus: "minus",
  plus: "plus",
  search: "search",
  share: "share",
  spinner: "spinner",
  success: "success",
  user: "user",
  warning: "warning",
} as const;

export type Props = {
  /**
   * Optional classes to add to the icon element.
   */
  className?: string;
  /**
   * Whether to show the light variant of the icon.
   */
  light?: boolean;
  /**
   * The name of the icon.
   */
  name: ValueOf<typeof ICONS> | string;
} & HTMLProps<HTMLElement>;

/**
 * Icon
 *
 * @param name One of built-in Vanilla icons or a name of a custom icon that follows `p-icon--{name}` convention.
 * @returns Icon
 */
const Icon = ({ className, light, name, ...props }: Props): JSX.Element => (
  <i
    className={classNames(className, `p-icon--${name}`, {
      "is-light": light,
    })}
    {...props}
  />
);

export default Icon;
