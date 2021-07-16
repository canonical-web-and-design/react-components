import { useEffect, useRef, useState } from "react";
import Chip from "../../Chip";
import { overflowingChipsCount, isChipInArray } from "../utils";
import { highlightSubString } from "../../../utils";
import type { SearchAndFilterChip, SearchAndFilterData } from "../types";

export type Props = {
  /**
   * The chip data to display in the panel.
   */
  data: SearchAndFilterData;
  /**
   * The current search chips.
   */
  searchData: SearchAndFilterChip[];
  /**
   * A search string.
   */
  searchTerm: string;
  /**
   * Whether the chips should be hidden.
   */
  sectionHidden?: boolean;
  /**
   * A function to toggle whether a chip is selected.
   */
  toggleSelected: (chip: SearchAndFilterChip) => void;
};

const FilterPanelSection = ({
  data,
  searchData,
  searchTerm = "",
  sectionHidden,
  toggleSelected,
}: Props): JSX.Element => {
  const { chips, heading } = data;
  const [overflowCounter, setOverflowCounter] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const chipWrapper = useRef(null);

  const handleChipClick = (chip) => {
    toggleSelected(chip);
  };

  // If the offsetTop is more than double height of a single chip, consider it
  // overflowing
  const updateFlowCount = function () {
    const chips = chipWrapper?.current?.querySelectorAll(".p-chip");
    const overflowCount = overflowingChipsCount(chips, 2);
    setOverflowCounter(overflowCount);
  };

  // Check if search term characters matches any characters in panel heading
  const searchTermInHeading = highlightSubString(heading, searchTerm).match;

  // Serialise chip values into string so it can be interrogated with subString
  const chipValues = [];
  Object.entries(chips).forEach((chipValue) => {
    chipValues.push(chipValue[1].value);
  });

  // Search chips for character match with search term
  const searchTermInChips = highlightSubString(
    chipValues.toString(),
    searchTerm
  ).match;

  const panelSectionVisible =
    searchTermInHeading || searchTermInChips || searchTerm === "";

  // Update overflow count when component is resized
  useEffect(() => {
    const resizeObserverSupported = typeof ResizeObserver !== "undefined";
    const wrapper = chipWrapper?.current;
    let wrapperWidthObserver: ResizeObserver;
    if (resizeObserverSupported && panelSectionVisible) {
      wrapperWidthObserver = new ResizeObserver(() => {
        updateFlowCount();
      });
      wrapperWidthObserver.observe(wrapper);
    } else {
      updateFlowCount();
    }
    return () => {
      resizeObserverSupported && wrapperWidthObserver?.disconnect();
    };
  }, [panelSectionVisible]);

  // When overflow counter is clicked, all chips are shown
  const showAllChips = () => {
    setExpanded(true);
  };

  return (
    <>
      {panelSectionVisible && (
        <div className="p-filter-panel-section">
          {heading && chips.length > 0 && (
            <h3
              className="p-filter-panel-section__heading"
              dangerouslySetInnerHTML={{
                __html: highlightSubString(heading, searchTerm).text,
              }}
            />
          )}
          <div
            className="p-filter-panel-section__chips"
            aria-expanded={expanded}
            ref={chipWrapper}
          >
            {chips?.map((chip) => {
              // If search term has been added to input, only matching chips
              // should display
              const searchTermInChip = highlightSubString(
                chip.value,
                searchTerm
              ).match;
              const chipVisible =
                searchTermInChip ||
                searchTerm === "" ||
                highlightSubString(heading, searchTerm).match;
              return (
                <span key={`${chip.lead}+${chip.value}`}>
                  {chipVisible && !sectionHidden && (
                    <Chip
                      lead={chip.lead}
                      value={chip.value}
                      selected={isChipInArray(chip, searchData)}
                      subString={searchTerm}
                      onClick={() => handleChipClick(chip)}
                    />
                  )}
                </span>
              );
            })}
            {overflowCounter > 0 && !expanded && (
              <span
                className="p-filter-panel-section__counter"
                onClick={showAllChips}
                onKeyPress={showAllChips}
                tabIndex={0}
              >
                +{overflowCounter}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanelSection;
