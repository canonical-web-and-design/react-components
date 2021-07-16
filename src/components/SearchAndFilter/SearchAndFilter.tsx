import { useState, useEffect, useRef } from "react";

import FilterPanelSection from "./FilterPanelSection";
import Chip from "../Chip";
import { overflowingChipsCount, isChipInArray } from "./utils";
import type { SearchAndFilterChip, SearchAndFilterData } from "./types";

export type Props = {
  /**
   * A list of chips to initialise inside the input.
   */
  existingSearchData?: SearchAndFilterChip[];
  /**
   * The data for the filter panel.
   */
  filterPanelData: SearchAndFilterData[];
  /**
   * A function that is called when the search data changes.
   */
  returnSearchData: (searchData: SearchAndFilterChip[]) => void;
};

const SearchAndFilter = ({
  existingSearchData = [],
  filterPanelData,
  returnSearchData,
}: Props): JSX.Element => {
  const [searchData, setSearchData] = useState(existingSearchData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPanelHidden, setFilterPanelHidden] = useState(true);
  const [searchBoxExpanded, setSearchBoxExpanded] = useState(false);
  const [overflowSearchTermCounter, setOverflowSearchTermCounter] = useState(0);
  const [searchContainerActive, setSearchContainerActive] = useState(false);

  const searchAndFilterRef = useRef(null);
  const searchContainerRef = useRef(null);
  const searchBoxRef = useRef(null);

  // Return searchData to parent component
  useEffect(() => {
    let mounted = true;
    returnSearchData && mounted && returnSearchData(searchData);
    return () => {
      mounted = false;
    };
  }, [searchData, returnSearchData]);

  const searchOnChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // Hide manual input form field when search container is inactive
  useEffect(() => {
    const searchContainerClickCheck = (e) => {
      const clickInContainer =
        e.target?.closest(".p-search-and-filter") !== null;
      setSearchContainerActive(clickInContainer);
    };

    document.addEventListener("click", searchContainerClickCheck);

    return () => {
      document.removeEventListener("click", searchContainerClickCheck);
    };
  }, [searchContainerActive]);

  // This useEffect sets up listeners so the panel will close if user clicks
  // anywhere else on the page or hits the escape key
  useEffect(() => {
    const closePanel = () => {
      setFilterPanelHidden(true);
    };

    const mouseDown = (e) => {
      // Check if click is outside of filter panel
      if (!searchAndFilterRef?.current?.contains(e.target)) {
        // If so, close the panel
        closePanel();
      }
    };

    const keyDown = (e) => {
      if (e.code === "Escape") {
        // Close panel if Esc keydown detected
        closePanel();
      }
    };

    // Add listener on document to capture click events
    document.addEventListener("mousedown", mouseDown);
    // Add listener on document to capture keydown events
    document.addEventListener("keydown", keyDown);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("keydown", keyDown);
    };
  }, []);

  // Add passed chip to the searchData array
  const toggleSelected = (chip: SearchAndFilterChip) => {
    const currentSelected = [...searchData];
    if (!isChipInArray(chip, currentSelected)) {
      currentSelected.push(chip);
      setSearchData(currentSelected);
      setSearchTerm("");
    } else {
      const updatedCurrentSelected = currentSelected.filter(
        (currentSelectedChip) => {
          return currentSelectedChip.value !== chip.value;
        }
      );
      setSearchData(updatedCurrentSelected);
    }
  };

  // Remove passed chip from the searchData array
  const removeFromSelected = (chip: SearchAndFilterChip) => {
    if (searchData.includes(chip)) {
      const updatedSelected = searchData.filter(
        (searchDataChip) => searchDataChip !== chip
      );
      setSearchData(updatedSelected);
    }
  };

  // When overflow chips are shown, clicking anywhere outside search area
  // or clicking on a chip should hide them again
  useEffect(() => {
    const hideOverflowChips = (e) => {
      if (
        !e.target.closest(".p-search-and-filter") &&
        e.target.className !== "p-icon--close"
      ) {
        setSearchBoxExpanded(false);
      }
    };
    document.addEventListener("click", (e) => {
      hideOverflowChips(e);
    });
    return () => {
      document.removeEventListener("click", (e) => {
        hideOverflowChips(e);
      });
    };
  }, []);

  const handleSubmit = () => {
    if (searchTerm.trim() !== "") {
      toggleSelected({ value: searchTerm, quoteValue: true });
      setSearchTerm("");
    }
  };

  // If the offsetTop is more than double height of a single chip, consider it
  // overflowing
  const updateFlowCount = function () {
    const chips = searchContainerRef?.current?.querySelectorAll(".p-chip");
    const overflowCount = overflowingChipsCount(chips, 1);
    setOverflowSearchTermCounter(overflowCount);
  };

  // Watch for container resize and recalculate overflow count accordingly
  useEffect(() => {
    const resizeObserverSupported = typeof ResizeObserver !== "undefined";
    const wrapper = searchContainerRef.current;
    let wrapperWidthObserver;
    if (resizeObserverSupported && wrapper) {
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
  }, [searchData]);

  // Add search prompt value to search on Enter key
  const searchPromptKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const searchBox = searchBoxRef.current;
  const searchContainer = searchContainerRef.current;
  if (
    !searchBoxExpanded &&
    searchBox &&
    searchContainer &&
    overflowSearchTermCounter === 0
  ) {
    if (searchBox.offsetTop > searchContainer.offsetHeight) {
      setSearchBoxExpanded(true);
    }
  }

  // If chips or input field contains values, clear 'em out
  const clearAllSearchTerms = () => {
    setSearchTerm("");
  };

  const placeholder = searchData.length ? "Add filter" : "Search and filter";

  return (
    <div
      className="p-search-and-filter"
      ref={searchAndFilterRef}
      onClick={() => filterPanelHidden && setFilterPanelHidden(false)}
    >
      <div
        className="p-search-and-filter__search-container"
        aria-expanded={searchBoxExpanded}
        data-active={searchContainerActive || searchData.length === 0}
        data-empty={searchData.length <= 0}
        ref={searchContainerRef}
      >
        {searchTerm !== "" && (
          <button
            className="p-search-and-filter__clear"
            onClick={() => clearAllSearchTerms()}
          >
            <i className="p-icon--close" />
          </button>
        )}
        {Object.values(searchData).map((chip) => {
          return (
            <Chip
              lead={chip.lead}
              value={chip.value}
              key={`search-${chip.lead}+${chip.value}`}
              onDismiss={() => removeFromSelected(chip)}
              selected={true}
              quoteValue={chip.quoteValue}
            />
          );
        })}
        <form
          className="p-search-and-filter__box"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          data-overflowing={searchBoxExpanded}
          ref={searchBoxRef}
        >
          <label className="u-off-screen" htmlFor="search-and-filter-input">
            {searchData.length ? "Add filter" : "Search and filter"}
          </label>
          <input
            autoComplete="off"
            className="p-search-and-filter__input"
            id="search-and-filter-input"
            name="search"
            onChange={(e) => searchOnChange(e.target.value)}
            placeholder={placeholder}
            type="search"
            value={searchTerm}
          />
          <button className="u-off-screen" type="submit">
            Search
          </button>
        </form>
        {overflowSearchTermCounter > 0 && (
          <span
            className="p-search-and-filter__selected-count"
            onClick={() => setSearchBoxExpanded(true)}
            onKeyDown={() => setSearchBoxExpanded(true)}
            role="button"
            tabIndex={0}
          >
            +{overflowSearchTermCounter}
          </span>
        )}
      </div>
      {(filterPanelData.length > 0 || searchTerm.length > 0) && (
        <div
          className="p-search-and-filter__panel"
          aria-hidden={filterPanelHidden}
        >
          <div>
            {searchTerm.length > 0 && (
              <div
                className="p-search-and-filter__search-prompt"
                onClick={() => handleSubmit()}
                onKeyDown={(e) => searchPromptKeyDown(e)}
                role="button"
                tabIndex={0}
              >
                Search for <strong>{searchTerm}</strong>...
              </div>
            )}
            {filterPanelData.map((filterPanelSectionData) => {
              return (
                <FilterPanelSection
                  key={filterPanelSectionData.id}
                  data={filterPanelSectionData}
                  toggleSelected={toggleSelected}
                  searchData={searchData}
                  searchTerm={searchTerm}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
