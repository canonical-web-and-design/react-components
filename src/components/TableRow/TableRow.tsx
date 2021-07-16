import type { HTMLProps, ReactNode } from "react";

export type Props = {
  /**
   * The content of the table row.
   */
  children: ReactNode;
} & HTMLProps<HTMLTableRowElement>;

const TableRow = ({ children, ...trProps }: Props): JSX.Element => (
  <tr role="row" {...trProps}>
    {children}
  </tr>
);

export default TableRow;
