import classNames from "classnames";
import type { HTMLProps, ReactNode } from "react";

export type Props = {
  /**
   * The content of the link.
   */
  children: ReactNode;
  /**
   * Optional class(es) to pass to the wrapping anchor element.
   */
  className?: string;
  /**
   * Whether the link should have external styling.
   */
  external?: boolean;
  /**
   * Whether the link should have inverted styling.
   */
  inverted?: boolean;
  /**
   * Whether the link should have soft styling.
   */
  soft?: boolean;
  /**
   * Whether the link should have "back to top" styling.
   */
  top?: boolean;
} & HTMLProps<HTMLAnchorElement>;

const Link = ({
  children,
  className,
  external = false,
  href = "#",
  inverted = false,
  soft = false,
  top = false,
  ...props
}: Props): JSX.Element => {
  const link = (
    <a
      className={classNames(className, {
        "p-link--external": external,
        "p-link--inverted": inverted,
        "p-link--soft": soft,
        "p-top__link": top,
      })}
      href={href}
      {...props}
    >
      {children}
    </a>
  );
  if (top) {
    return <div className="p-top">{link}</div>;
  }
  return link;
};

export default Link;
