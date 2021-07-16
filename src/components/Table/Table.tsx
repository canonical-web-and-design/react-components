import classNames from "classnames";
import { HTMLProps, ReactNode } from "react";

export type Props = {
  /**
   * The content of the table.
   */
  children?: ReactNode;
  /**
   * Optional class(es) to pass to the wrapping table element.
   */
  className?: string;
  /**
   * Whether the table can expand hidden cells.
   */
  expanding?: boolean;
  /**
   * Whether the table should show card styling on smaller screens.
   */
  responsive?: boolean;
} & HTMLProps<HTMLTableElement>;

const Table = ({
  children,
  className,
  expanding = false,
  responsive = false,
  ...props
}: Props): JSX.Element => (
  <table
    role="grid"
    className={classNames(className, {
      "p-table--mobile-card": responsive,
      "p-table--expanding": expanding,
    })}
    {...props}
  >
    {children}
  </table>
);

export default Table;
