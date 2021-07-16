import { HTMLProps, ReactNode } from "react";

import { SortDirection } from "types";

export type Props = {
  /**
   * The content of the table header.
   */
  children?: ReactNode;
  /**
   * The direction of sorting, if applicable.
   */
  sort?: SortDirection;
} & HTMLProps<HTMLTableHeaderCellElement>;

const TableHeader = ({ children, sort, ...props }: Props): JSX.Element => {
  return (
    <th role="columnheader" aria-sort={sort} {...props}>
      {children}
    </th>
  );
};

export default TableHeader;
