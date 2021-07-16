import { useEffect, useState } from "react";
import type { HTMLProps, ReactNode } from "react";

import type { SortDirection } from "types";
import Pagination from "../Pagination";
import Table from "../Table";
import type { Props as TableProps } from "../Table/Table";
import TableRow from "../TableRow";
import TableHeader from "../TableHeader";
import TableCell from "../TableCell";
import type { Props as TableCellProps } from "../TableCell/TableCell";

export type MainTableHeader = {
  /**
   * The content of the table header.
   */
  content?: ReactNode;
  /**
   * Optional classes to apply to the table header.
   */
  className?: string;
  /**
   * A key to sort the rows by. It should match a key given to the row `sortData`.
   */
  sortKey?: string;
} & HTMLProps<HTMLTableHeaderCellElement>;

export type MainTableCell = {
  /**
   * The content of the table cell.
   */
  content?: ReactNode;
} & Omit<TableCellProps, "children" | "content">;

export type MainTableRow = {
  /**
   * The columns in this row.
   */
  columns?: MainTableCell[];
  /**
   * Whether this row should display as expanded.
   */
  expanded?: boolean;
  /**
   * The content to display when this column is expanded.
   */
  expandedContent?: ReactNode;
  /**
   * An optional key to identify this table row.
   */
  key?: number | string;
  /**
   * An object of data for use when sorting the rows. The keys of this object
   * should match the header sort keys.
   */
  sortData?: Record<MainTableHeader["sortKey"], unknown>;
} & HTMLProps<HTMLTableRowElement>;

export type Props = {
  /**
   * The default key to sort the rows by.
   */
  defaultSort?: MainTableHeader["sortKey"];
  /**
   * The default direction the row data should be sorted by.
   */
  defaultSortDirection?: SortDirection;
  /**
   * A message to display when there are no table rows.
   */
  emptyStateMsg?: ReactNode;
  /**
   * The header columns for this table.
   */
  headers?: MainTableHeader[];
  /**
   * A function that is called when the sort key is changed.
   */
  onUpdateSort?: (sortKey: MainTableHeader["sortKey"]) => void;
  /**
   * A number of rows to paginate by.
   */
  paginate?: number;
  /**
   * The rows to display in the table.
   */
  rows?: MainTableRow[];
  /**
   * Whether this table should be sortable.
   */
  sortable?: boolean;
  /**
   * A function to be used when sorting.
   */
  sortFunction?: (
    a: MainTableRow,
    b: MainTableRow,
    currentSortDirection: SortDirection,
    currentSortKey: MainTableHeader["sortKey"]
  ) => -1 | 0 | 1;
} & Omit<TableProps, "children" | "headers" | "rows">;

const updateSort = (
  setSortKey: (sortKey: MainTableHeader["sortKey"]) => void,
  setSortDirection: (direction: SortDirection) => void,
  sortKey: MainTableHeader["sortKey"],
  sortDirection: SortDirection
) => {
  let newDirection = null;
  if (sortDirection === "none") {
    newDirection = "ascending";
  } else if (sortDirection === "ascending") {
    newDirection = "descending";
  } else {
    sortKey = null;
  }
  setSortKey(sortKey);
  setSortDirection(newDirection);
};

const generateHeaders = (
  currentSortKey: MainTableHeader["sortKey"],
  currentSortDirection: SortDirection,
  expanding: Props["expanding"],
  headers: Props["headers"],
  sortable: Props["sortable"],
  setSortKey: (sortKey: MainTableHeader["sortKey"]) => void,
  setSortDirection: (direction: SortDirection) => void
) => {
  const headerItems = headers.map(({ content, sortKey, ...props }, index) => {
    let sortDirection: SortDirection;
    if (sortable && sortKey) {
      if (currentSortKey === sortKey) {
        sortDirection = currentSortDirection;
      } else {
        sortDirection = "none";
      }
    }
    return (
      <TableHeader
        key={index}
        sort={sortDirection}
        onClick={
          sortable &&
          updateSort.bind(
            this,
            setSortKey,
            setSortDirection,
            sortKey,
            sortDirection
          )
        }
        {...props}
      >
        {content}
      </TableHeader>
    );
  });
  // When there is expanding content then provide an extra hidden header to
  // account for the extra cell in the body rows.
  return (
    <thead>
      <TableRow>
        {headerItems}
        {expanding && <TableHeader aria-hidden="true"></TableHeader>}
      </TableRow>
    </thead>
  );
};

const generateRows = (
  currentSortDirection: SortDirection,
  currentSortKey: MainTableHeader["sortKey"],
  emptyStateMsg: ReactNode,
  expanding: Props["expanding"],
  paginate: Props["paginate"],
  rows: Props["rows"],
  currentPage: number,
  setCurrentPage: (page: number) => void,
  sortable: Props["sortable"],
  sortFunction: Props["sortFunction"]
) => {
  // If the table has no rows, return empty state message
  if (Object.entries(rows).length === 0 && emptyStateMsg) {
    return <caption>{emptyStateMsg}</caption>;
  }
  // Clone the rows so we can restore the original order.
  const sortedRows = [...rows];
  if (sortable && currentSortKey) {
    if (!sortFunction) {
      sortFunction = (a, b) => {
        if (!a.sortData || !b.sortData) {
          return 0;
        }
        if (a.sortData[currentSortKey] > b.sortData[currentSortKey]) {
          return currentSortDirection === "ascending" ? 1 : -1;
        } else if (a.sortData[currentSortKey] < b.sortData[currentSortKey]) {
          return currentSortDirection === "ascending" ? -1 : 1;
        }
        return 0;
      };
    }
    sortedRows.sort((a, b) =>
      sortFunction(a, b, currentSortDirection, currentSortKey)
    );
  }
  let slicedRows = sortedRows;
  if (paginate) {
    const startIndex = (currentPage - 1) * paginate;
    if (startIndex > rows.length) {
      // If the rows have changed e.g. when filtering and the user is on a page
      // that no longer exists then send them to the start.
      setCurrentPage(1);
    }
    slicedRows = sortedRows.slice(startIndex, startIndex + paginate);
  }
  const rowItems = slicedRows.map(
    (
      { columns, expanded, expandedContent, key, sortData, ...rowProps },
      index
    ) => {
      const cellItems = columns.map(({ content, ...cellProps }, index) => (
        <TableCell key={index} {...cellProps}>
          {content}
        </TableCell>
      ));

      // if key was not provided as a prop, use row's index instead
      if (key === null || typeof key === "undefined") {
        key = index;
      }

      // The expanding cell is alway created to match the correct number of
      // table cells in rows that do have expanding content.
      return (
        <TableRow key={key} {...rowProps}>
          {cellItems}
          {expanding && (
            <TableCell expanding={true} hidden={!expanded}>
              {expandedContent}
            </TableCell>
          )}
        </TableRow>
      );
    }
  );
  return <tbody>{rowItems}</tbody>;
};

const MainTable = ({
  defaultSort,
  defaultSortDirection,
  emptyStateMsg = "",
  expanding,
  headers,
  onUpdateSort,
  paginate,
  rows,
  responsive,
  sortable,
  sortFunction,
  ...props
}: Props): JSX.Element => {
  const [currentSortKey, setSortKey] = useState(defaultSort);
  const [currentSortDirection, setSortDirection] =
    useState(defaultSortDirection);
  const [currentPage, setCurrentPage] = useState(1);

  // Update the current sort state if the prop changes.
  useEffect(() => {
    setSortKey(defaultSort);
  }, [defaultSort]);

  // Update the current sort direction state if the prop changes.
  useEffect(() => {
    setSortDirection(defaultSortDirection);
  }, [defaultSortDirection]);

  const updateSort = (newSort: MainTableHeader["sortKey"]) => {
    setSortKey(newSort);
    onUpdateSort && onUpdateSort(newSort);
  };

  return (
    <>
      <Table expanding={expanding} responsive={responsive} {...props}>
        {!!headers &&
          generateHeaders(
            currentSortKey,
            currentSortDirection,
            expanding,
            headers,
            sortable,
            updateSort,
            setSortDirection
          )}
        {!!rows &&
          generateRows(
            currentSortDirection,
            currentSortKey,
            emptyStateMsg,
            expanding,
            paginate,
            rows,
            currentPage,
            setCurrentPage,
            sortable,
            sortFunction
          )}
      </Table>
      {paginate && rows && rows.length > 0 && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={paginate}
          paginate={setCurrentPage}
          style={{ marginTop: "1rem" }}
          totalItems={rows.length}
        />
      )}
    </>
  );
};

export default MainTable;
