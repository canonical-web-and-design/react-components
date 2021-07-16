import classNames from "classnames";
import { useState, HTMLProps } from "react";

import AccordionSection from "../AccordionSection";
import type {
  AccordionHeadings,
  AccordionSectionProps,
} from "../AccordionSection";

export type Section = AccordionSectionProps & {
  /**
   * An optional key for the section component. It will also be
   * used to track which section is selected.
   */
  key?: string | number;
};

export type Props = {
  /**
   * Optional classes applied to the parent element.
   */
  className?: string;
  /**
   * An optional value to set the expanded section. The value must match a
   * section key. This value will only set the expanded section on first render
   * if externallyControlled is not set to `true`.
   */
  expanded?: string;
  /**
   * Whether the expanded section will be controlled via external state.
   */
  externallyControlled?: boolean;
  /**
   * Optional function that is called when the expanded section is changed.
   * The function is provided the section title or null.
   */
  onExpandedChange?: (id, title: string) => void;
  /**
   * An array of sections and content.
   */
  sections: Section[];
  /**
   * Optional string describing heading element that should be used for the section titles.
   */
  titleElement?: AccordionHeadings;
} & HTMLProps<HTMLElement>;

const generateSections = (
  sections: Section[],
  setExpanded,
  expanded,
  titleElement
) =>
  sections.map(({ key, ...props }, i) => (
    <AccordionSection
      expanded={expanded}
      key={key || i}
      sectionKey={key?.toString()}
      setExpanded={setExpanded}
      titleElement={titleElement}
      {...props}
    />
  ));

const Accordion = ({
  className,
  expanded,
  externallyControlled,
  onExpandedChange,
  sections,
  titleElement,
  ...asideProps
}: Props): JSX.Element => {
  const [expandedSection, setExpandedSection] = useState(expanded);
  const setExpanded = (id, title) => {
    setExpandedSection(id);
    onExpandedChange && onExpandedChange(id, title);
  };
  return (
    <aside
      className={classNames(className, "p-accordion")}
      {...asideProps}
      role="tablist"
      aria-multiselectable="true"
    >
      <ul className="p-accordion__list">
        {generateSections(
          sections,
          setExpanded,
          externallyControlled ? expanded : expandedSection,
          titleElement
        )}
      </ul>
    </aside>
  );
};

export default Accordion;
