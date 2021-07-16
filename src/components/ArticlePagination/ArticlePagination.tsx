import classNames from "classnames";
import type { HTMLProps } from "react";

export type Props = {
  /**
   * Optional classes to add to the wrapping element.
   */
  className?: string;
  /**
   * The URL for the next link.
   */
  nextURL?: string;
  /**
   * The label for the next link.
   */
  nextLabel?: string;
  /**
   * The URL for the previous link.
   */
  previousURL?: string;
  /**
   * The label for the previous link.
   */
  previousLabel?: string;
} & HTMLProps<HTMLElement>;

const ArticlePagination = ({
  className,
  nextURL,
  nextLabel,
  previousURL,
  previousLabel,
  ...props
}: Props): JSX.Element => {
  return (
    <footer
      className={classNames(className, "p-article-pagination")}
      {...props}
    >
      {previousURL && previousLabel && (
        <a className="p-article-pagination__link--previous" href={previousURL}>
          <span className="p-article-pagination__label">Previous</span>
          <span className="p-article-pagination__title">{previousLabel}</span>
        </a>
      )}
      {nextURL && nextLabel && (
        <a className="p-article-pagination__link--next" href={nextURL}>
          <span className="p-article-pagination__label">Next</span>
          <span className="p-article-pagination__title">{nextLabel}</span>
        </a>
      )}
    </footer>
  );
};

export default ArticlePagination;
