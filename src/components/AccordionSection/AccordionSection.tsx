import { nanoid } from "nanoid";
import { useRef } from "react";
import type { ReactNode } from "react";

import type { Headings } from "types";

export type AccordionHeadings = Exclude<Headings, "h1">;

export type Props = {
  /**
   * The content of the section.
   */
  content?: ReactNode;
  /**
   * An optional value to set the expanded section. The value must match a
   * section key.
   */
  expanded?: string;
  headingLevel?: number;
  /**
   * An optional click event when the title is clicked.
   */
  onTitleClick?: (expanded: boolean, key: string) => void;
  /**
   * An optional key to be used to track which section is selected.
   */
  sectionKey?: string;
  setExpanded?: (key: string | null, title: string | null) => void;
  /**
   * The title of the section.
   */
  title?: string;
  /**
   * Optional string describing heading element that should be used for the section titles.
   */
  titleElement?: AccordionHeadings;
};

const AccordionSection = ({
  content,
  expanded,
  onTitleClick,
  sectionKey,
  setExpanded,
  title,
  titleElement,
  headingLevel = 3,
}: Props): JSX.Element => {
  const sectionId = useRef(nanoid());
  const key = sectionKey || sectionId.current;
  const isExpanded = expanded === key;
  const Title = titleElement || "div";

  return (
    <li className="p-accordion__group">
      <Title
        role={titleElement ? null : "heading"}
        aria-level={titleElement ? null : headingLevel}
        className="p-accordion__heading"
      >
        <button
          aria-controls={`#${sectionId.current}`}
          aria-expanded={isExpanded ? "true" : "false"}
          className="p-accordion__tab"
          onClick={() => {
            if (isExpanded) {
              setExpanded(null, null);
            } else {
              setExpanded(key, title);
            }
            onTitleClick && onTitleClick(!isExpanded, key);
          }}
          role="tab"
          type="button"
        >
          {title}
        </button>
      </Title>
      <section
        aria-hidden={isExpanded ? "false" : "true"}
        aria-labelledby={sectionId.current}
        className="p-accordion__panel"
        id={sectionId.current}
        role="tabpanel"
      >
        {content}
      </section>
    </li>
  );
};

export default AccordionSection;
