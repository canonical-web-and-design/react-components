import classNames from "classnames";
import PropTypes from "prop-types";
import React, { ReactNode } from "react";

export type Props = {
  children?: ReactNode;
  className?: string;
  highlighted?: boolean;
  overlay?: boolean;
  thumbnail?: string;
  title?: ReactNode;
};

const Card = ({
  children,
  className,
  highlighted,
  overlay,
  thumbnail,
  title,
  ...props
}: Props): JSX.Element => (
  <div
    className={classNames(className, {
      "p-card": !highlighted && !overlay,
      "p-card--highlighted": highlighted,
      "p-card--overlay": overlay,
    })}
    {...props}
  >
    {thumbnail && (
      <>
        <img className="p-card__thumbnail" src={thumbnail} alt="" />
        <hr className="u-sv1" />
      </>
    )}
    {title && <h3 className="p-card__title">{title}</h3>}
    <div className="p-card__content">{children}</div>
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  highlighted: PropTypes.bool,
  overlay: PropTypes.bool,
  title: PropTypes.node,
  thumbnail: PropTypes.string,
};

export default Card;
