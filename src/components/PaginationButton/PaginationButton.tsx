import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { MouseEventHandler } from "react";

export type PaginationDirection = "forward" | "back";
export type Props = {
  /**
   * The direction of the pagination.
   */
  direction: PaginationDirection;
  /**
   * Whether the pagination button should be disabled.
   */
  disabled?: boolean;
  /**
   * Function to handle clicking the pagination button.
   */
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const PaginationButton = ({
  direction,
  onClick,
  disabled = false,
}: Props): JSX.Element => {
  const label = direction === "back" ? "Previous page" : "Next page";
  return (
    <li className="p-pagination__item">
      <button
        className={classNames({
          "p-pagination__link--previous": direction === "back",
          "p-pagination__link--next": direction === "forward",
        })}
        disabled={disabled}
        onClick={onClick}
      >
        <i className="p-icon--contextual-menu">{label}</i>
      </button>
    </li>
  );
};

PaginationButton.propTypes = {
  direction: PropTypes.oneOf(["forward", "back"]).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default PaginationButton;
