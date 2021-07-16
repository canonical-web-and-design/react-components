import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { MouseEventHandler } from "react";

export type Props = {
  /**
   * Whether the pagination item is active, i.e. the current page is this page.
   */
  isActive?: boolean;
  /**
   * The page number.
   */
  number: number;
  /**
   * Function to handle clicking the pagination item.
   */
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const PaginationItem = ({
  number,
  onClick,
  isActive = false,
}: Props): JSX.Element => (
  <li className="p-pagination__item">
    <button
      className={classNames("p-pagination__link", {
        "is-active": isActive,
      })}
      onClick={onClick}
    >
      {number}
    </button>
  </li>
);

PaginationItem.propTypes = {
  number: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

export default PaginationItem;
