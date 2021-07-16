import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";

import Icon from "../Icon";
import { ButtonAppearance } from "../Button/Button";
import type { ValueOf } from "../../types";

export const LOADER_MIN_DURATION = 400; // minimium duration (ms) loader displays
export const SUCCESS_DURATION = 2000; // duration (ms) success tick is displayed

export type Props = {
  /**
   * The appearance of the button.
   */
  appearance?: ValueOf<typeof ButtonAppearance>;
  /**
   * The content of the button.
   */
  children?: ReactNode;
  /**
   * Optional class(es) to pass to the button element.
   */
  className?: string;
  /**
   * Whether the button should be disabled.
   */
  disabled?: boolean;
  /**
   * Whether the button should display inline.
   */
  inline?: boolean;
  /**
   * Whether the button should be in the loading state.
   */
  loading?: boolean;
  /**
   * Whether the button should be in the success state.
   */
  success?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

const ActionButton = ({
  appearance = ButtonAppearance.NEUTRAL,
  children,
  className,
  disabled = false,
  inline = false,
  loading = false,
  success = false,
  ...buttonProps
}: Props): JSX.Element => {
  const [height, setHeight] = useState<number | null>();
  const [width, setWidth] = useState<number | null>();
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  // Set up loader timer
  useEffect(() => {
    let loaderTimeout: number;

    if (loading) {
      // Explicitly set button dimensions
      if (ref.current && !!ref.current.getBoundingClientRect()) {
        setHeight(ref.current.getBoundingClientRect().height);
        setWidth(ref.current.getBoundingClientRect().width);
      }
      setShowLoader(true);
    }

    if (!loading && showLoader) {
      loaderTimeout = window.setTimeout(() => {
        setShowLoader(false);

        if (success) {
          setShowSuccess(true);
        }
      }, LOADER_MIN_DURATION);
    }

    return () => window.clearTimeout(loaderTimeout);
  }, [loading, showLoader, success]);

  // Set up success timer
  useEffect(() => {
    let successTimeout: number;

    if (showSuccess) {
      successTimeout = window.setTimeout(() => {
        setHeight(null);
        setWidth(null);
        setShowSuccess(false);
      }, SUCCESS_DURATION);
    }

    return () => window.clearTimeout(successTimeout);
  }, [showSuccess]);

  const buttonClasses = classNames(
    className,
    "p-action-button",
    `p-button--${appearance}`,
    {
      "is-processing": showLoader || showSuccess,
      "is-disabled": disabled,
      "is-inline": inline,
    }
  );
  const showIcon = showLoader || showSuccess;
  const icon = (showLoader && "spinner") || (showSuccess && "success") || null;
  const iconLight = appearance === "positive" || appearance === "negative";

  // This component uses the base button element instead of the Button component
  // as the button requires a ref and Button would have to be updated to use
  // forwardRef which is not currently supported by components that use
  // typescript generics.
  return (
    <button
      className={buttonClasses}
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
      {showIcon ? (
        <Icon
          className={showLoader ? "u-animation--spin" : null}
          light={iconLight}
          name={icon}
        />
      ) : (
        children
      )}
    </button>
  );
};

export default ActionButton;
