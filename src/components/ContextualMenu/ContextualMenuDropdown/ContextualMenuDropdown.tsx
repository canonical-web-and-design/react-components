import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { CSSProperties, Key, MouseEvent as ReactMouseEvent } from "react";
import type { ReactNode } from "react";

import { useWindowFitment } from "../../../hooks";
import Button from "../../Button";
import type { Props as ButtonProps } from "../../Button";
import type { WindowFitment } from "../../../hooks";

/**
 * The type of the menu links.
 * @template L - The type of the link props.
 */
export type MenuLink<L = null> = string | ButtonProps<L> | ButtonProps<L>[];

export type Position = "left" | "center" | "right";

/**
 * The props for the ContextualMenuDropdown component.
 * @template L - The type of the link props.
 */
export type Props<L = null> = {
  adjustedPosition?: Position;
  autoAdjust?: boolean;
  closePortal?: (evt?: MouseEvent) => void;
  constrainPanelWidth?: boolean;
  dropdownClassName?: string;
  dropdownContent?: ReactNode;
  id?: string;
  isOpen?: boolean;
  links?: MenuLink<L>[];
  position?: Position;
  positionCoords?: ClientRect;
  positionNode?: HTMLElement;
  setAdjustedPosition?: (position: Position) => void;
  wrapperClass?: string;
};

/**
 * Calculate the styles for the menu.
 * @param position - The menu position.
 * @param positionCoords - The coordinates of the position node.
 * @param constrainPanelWidth - Whether the menu width should be constrained to the position width.
 */
const getPositionStyle = (
  position: Position,
  positionCoords: Props["positionCoords"],
  constrainPanelWidth: Props["constrainPanelWidth"]
) => {
  if (!positionCoords) {
    return null;
  }
  const { height, left, top, width } = positionCoords;
  const topPos = top + height + (window.scrollY || 0);
  let leftPos = left;

  switch (position) {
    case "left":
      leftPos = left;
      break;
    case "center":
      leftPos = left + width / 2;
      break;
    case "right":
      leftPos = left + width;
      break;
    default:
      break;
  }

  return {
    position: "absolute",
    left: leftPos,
    top: topPos,
    // The width only needs to be set if the width is to be constrained.
    ...(constrainPanelWidth ? { width } : null),
  };
};

/**
 * Calculate the adjusted position in relation to the window.
 * @param position - The requested position.
 * @param fitsWindow - The window fitment info.
 * @return The new position.
 */
export const adjustForWindow = (
  position: Position,
  fitsWindow: WindowFitment
): Position => {
  let newPosition: string = position;
  if (!fitsWindow.fromRight.fitsLeft && newPosition === "right") {
    newPosition = "left";
  }
  if (!fitsWindow.fromLeft.fitsRight && newPosition === "left") {
    newPosition = "right";
  }
  // If the menu doesn't fit to the left or the right then center it.
  if (
    !fitsWindow.fromLeft.fitsRight &&
    !fitsWindow.fromRight.fitsLeft &&
    (newPosition === "left" || newPosition === "right")
  ) {
    newPosition = "center";
  }
  // If the menu doesn't fit when centered then find a new position.
  if (
    newPosition === "center" &&
    (!fitsWindow.fromCenter.fitsCentered.fitsRight ||
      !fitsWindow.fromCenter.fitsCentered.fitsLeft)
  ) {
    if (fitsWindow.fromLeft.fitsRight) {
      newPosition = "left";
    }
    if (fitsWindow.fromRight.fitsLeft) {
      newPosition = "right";
    }
  }
  return newPosition as Position;
};

/**
 * Generate a menu link
 * @template L - The type of the link props.
 * @param link - A button
 * @param key - A key for the DOM.
 * @param closePortal - The function to close the portal.
 */
const generateLink = <L,>(
  link: ButtonProps,
  key: Key,
  closePortal: Props["closePortal"]
) => {
  const { children, className, onClick, ...props } = link;
  return (
    <Button<L>
      className={classNames("p-contextual-menu__link", className)}
      key={key}
      onClick={
        onClick
          ? (evt: ReactMouseEvent) => {
              closePortal(evt.nativeEvent);
              onClick(evt);
            }
          : null
      }
      {...props}
    >
      {children}
    </Button>
  );
};

const ContextualMenuDropdown = <L,>({
  adjustedPosition,
  autoAdjust,
  closePortal,
  constrainPanelWidth,
  dropdownClassName,
  dropdownContent,
  id,
  isOpen,
  links,
  position,
  positionCoords,
  positionNode,
  setAdjustedPosition,
  wrapperClass,
  ...props
}: Props<L>): JSX.Element => {
  const dropdown = useRef();
  const [positionStyle, setPositionStyle] = useState(
    getPositionStyle(adjustedPosition, positionCoords, constrainPanelWidth)
  );

  // Update the styles to position the menu.
  const updatePositionStyle = useCallback(() => {
    setPositionStyle(
      getPositionStyle(adjustedPosition, positionCoords, constrainPanelWidth)
    );
  }, [adjustedPosition, positionCoords, constrainPanelWidth]);

  // Update the position when the window fitment info changes.
  const onUpdateWindowFitment = useCallback(
    (fitsWindow) => {
      setAdjustedPosition(adjustForWindow(position, fitsWindow));
    },
    [position, setAdjustedPosition]
  );

  // Handle adjusting the position of the dropdown so that it remains on screen.
  useWindowFitment(
    dropdown.current,
    positionNode,
    onUpdateWindowFitment,
    0,
    isOpen && autoAdjust
  );

  // Update the styles when the position changes.
  useEffect(() => {
    updatePositionStyle();
  }, [adjustedPosition, updatePositionStyle]);

  return (
    <span
      className={wrapperClass}
      style={positionStyle as CSSProperties}
      {...props}
    >
      <span
        className={classNames("p-contextual-menu__dropdown", dropdownClassName)}
        id={id}
        aria-hidden={isOpen ? "false" : "true"}
        aria-label="submenu"
        ref={dropdown}
        style={
          constrainPanelWidth && positionStyle?.width
            ? { width: positionStyle.width, minWidth: 0, maxWidth: "none" }
            : null
        }
      >
        {dropdownContent
          ? dropdownContent
          : links.map((item, i) => {
              if (Array.isArray(item)) {
                return (
                  <span className="p-contextual-menu__group" key={i}>
                    {item.map((link, j) =>
                      generateLink<L>(link, j, closePortal)
                    )}
                  </span>
                );
              } else if (typeof item === "string") {
                return (
                  <div className="p-contextual-menu__non-interactive" key={i}>
                    {item}
                  </div>
                );
              }
              return generateLink<L>(item, i, closePortal);
            })}
      </span>
    </span>
  );
};

export default ContextualMenuDropdown;
