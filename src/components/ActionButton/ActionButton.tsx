import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import type { HTMLProps, ReactNode } from "react";

import "./ActionButton.scss";

export const LOADER_MIN_DURATION = 400; // minimium duration (ms) loader displays
export const SUCCESS_DURATION = 2000; // duration (ms) success tick is displayed

type ButtonAppearance = "base" | "neutral" | "positive" | "negative" | "brand";
type Props = {
  children?: ReactNode;
  appearance?: ButtonAppearance;
  className?: string;
  disabled?: boolean;
  inline?: boolean;
  loading?: boolean;
  success?: boolean;
} & HTMLProps<HTMLButtonElement>;

const ActionButton = ({
  appearance = "neutral",
  children,
  className,
  disabled = false,
  inline = false,
  loading = false,
  success = false,
  ...buttonProps
}: Props): JSX.Element => {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const ref = useRef(null);

  // Set up loader timer
  useEffect(() => {
    let loaderTimeout;

    if (loading) {
      // Explicitly set button dimensions
      if (ref.current && !!ref.current.getBoundingClientRect()) {
        setHeight(ref.current.getBoundingClientRect().height);
        setWidth(ref.current.getBoundingClientRect().width);
      }
      setShowLoader(true);
    }

    if (!loading && showLoader) {
      loaderTimeout = setTimeout(() => {
        setShowLoader(false);

        if (success) {
          setShowSuccess(true);
        }
      }, LOADER_MIN_DURATION);
    }

    return () => clearTimeout(loaderTimeout);
  }, [loading, showLoader, success]);

  // Set up success timer
  useEffect(() => {
    let successTimeout;

    if (showSuccess) {
      successTimeout = setTimeout(() => {
        setHeight(null);
        setWidth(null);
        setShowSuccess(false);
      }, SUCCESS_DURATION);
    }

    return () => clearTimeout(successTimeout);
  }, [showSuccess]);

  const buttonClasses = classNames(
    className,
    "p-action-button",
    `p-button--${appearance}`,
    {
      "is-loading": showLoader,
      "is-success": showSuccess,
      "is-disabled": disabled,
      "is-inline": inline,
    }
  );

  const iconClasses = classNames({
    "p-icon--spinner u-animation--spin": showLoader,
    "is-light": appearance === "positive" || appearance === "negative",
    "p-icon--success":
      showSuccess && appearance !== "positive" && appearance !== "negative",
    "p-icon--success-positive": showSuccess && appearance === "positive",
    "p-icon--success-negative": showSuccess && appearance === "negative",
  });

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      ref={ref}
      style={
        height && width
          ? {
              height: `${height}px`,
              width: `${width}px`,
            }
          : undefined
      }
      {...buttonProps}
    >
      {showLoader || showSuccess ? <i className={iconClasses} /> : children}
    </button>
  );
};

ActionButton.propTypes = {
  appearance: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  loading: PropTypes.bool,
  success: PropTypes.bool,
};

export default ActionButton;
