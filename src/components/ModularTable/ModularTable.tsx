import { ReactNode } from "react";
import { useTable } from "react-table";
import type { Column } from "react-table";

import Table from "../Table";
import TableRow from "../TableRow";
import TableHeader from "../TableHeader";
import TableCell from "../TableCell";
import Icon from "../Icon";

export type Props<D extends Record<string, unknown>> = {
  /**
   * The columns of the table.
   */
  columns: Column<D>[];
  /**
   * The data of the table.
   */
  data: D[];
  /**
   * A message to display if data is empty.
   */
  emptyMsg?: string;
  /**
   * Optional extra row to display underneath the main table content.
   */
  footer?: ReactNode;
};

function ModularTable({
  data,
  columns,
  emptyMsg,
  footer,
}: Props<Record<string, unknown>>): JSX.Element {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const showEmpty: boolean = emptyMsg && (!rows || rows.length === 0);

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHeader
                {...column.getHeaderProps([
                  {
                    className: column.className,
                  },
                  {
                    className: column.getCellIcon
                      ? "p-table__cell--icon-placeholder"
                      : "",
                  },
                ])}
              >
                {column.render("Header")}
              </TableHeader>
            ))}
          </TableRow>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          // This function is responsible for lazily preparing a row for rendering.
          // Any row that you intend to render in your table needs to be passed to this function before every render.
          // see: https://react-table.tanstack.com/docs/api/useTable#instance-properties
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                const hasColumnIcon = cell.column.getCellIcon;
                const iconName = hasColumnIcon && cell.column.getCellIcon(cell);

                return (
                  <TableCell
                    {...cell.getCellProps([
                      {
                        className: cell.column.className,
                      },
                      {
                        className: hasColumnIcon
                          ? "p-table__cell--icon-placeholder"
                          : "",
                      },
                    ])}
                  >
                    {iconName && <Icon name={iconName} />}
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
        {showEmpty && (
          <TableRow>
            <TableCell colSpan={columns.length}>{emptyMsg}</TableCell>
          </TableRow>
        )}
        {footer && (
          <TableRow>
            <TableCell colSpan={columns.length}>{footer}</TableCell>
          </TableRow>
        )}
      </tbody>
    </Table>
  );
}

export default ModularTable;
