import classNames from "classnames";
import { ReactNode } from "react";

export type Props = {
  /**
   * The content of the card.
   */
  children?: ReactNode;
  /**
   * Optional class(es) to pass to the wrapping div element.
   */
  className?: string;
  /**
   * Whether the card should have highlighted styling.
   */
  highlighted?: boolean;
  /**
   * Whether the card should have overlay styling.
   */
  overlay?: boolean;
  /**
   * The path to a thumbnail image.
   */
  thumbnail?: string;
  /**
   * The title of the card.
   */
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

export default Card;
