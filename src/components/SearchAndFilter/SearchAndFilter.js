import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import SearchBox from "../SearchBox";
import ContextualMenu from "../ContextualMenu";
import FilterPanelSection from "./FilterPanelSection";
import Chip from "../Chip";
import { overflowingChipsCount } from "./shared";

import "./SearchAndFilter.scss";

const SearchAndFilter = ({
  externallyControlled = false,
  onChange,
  filterPanelData,
}) => {
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPanelHidden, setFilterPanelHidden] = useState(true);
  const [searchBoxExpanded, setSearchBoxExpanded] = useState(false);
  const [overflowSearchTermCounter, setOverflowSearchTermCounter] = useState(0);
  const filterPanelRef = useRef();
  const searchContainerRef = useRef();

  const searchOnChange = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (externallyControlled && onChange) {
      onChange(searchTerm);
    }
  };

  // This useEffect sets up listeners so the panel will close if user clicks
  // anywhere else on the page or hits the escape key
  useEffect(() => {
    const closePanel = () => {
      setFilterPanelHidden(true);
    };

    const mouseDown = (e) => {
      // Check if click is outside of filter panel
      if (!filterPanelRef?.current?.contains(e.target)) {
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
  }, [searchTerm]);

  // Add passed chip to the searchData array
  const addToSelected = (chip) => {
    const currentSelected = [...searchData];
    if (!currentSelected.includes(chip)) {
      currentSelected.push(chip);
      setSearchData(currentSelected);
    }
  };

  // Remove passed chip from the searchData array
  const removeFromSelected = (chip) => {
    if (searchData.includes(chip)) {
      const updatedSelected = searchData.filter(
        (searchDataChip) => searchDataChip !== chip
      );
      setSearchData(updatedSelected);
    }
  };

  const handleSubmit = (e) => {
    if (searchTerm !== "") {
      addToSelected({ value: searchTerm });
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

  useEffect(() => {
    if (typeof ResizeObserver !== "undefined") {
      const wrapperWidthObserver = new ResizeObserver(() => {
        updateFlowCount();
      });
      const wrapper = searchContainerRef.current;
      wrapperWidthObserver.observe(wrapper);
    } else {
      updateFlowCount();
    }
  }, [searchData]);

  return (
    <div className="search-and-filter" ref={filterPanelRef}>
      <div
        className="search-and-filter__search-container"
        aria-expanded={searchBoxExpanded}
        ref={searchContainerRef}
      >
        {Object.values(searchData).map((chip) => {
          return (
            <Chip
              lead={chip.lead}
              value={chip.value}
              key={`search-${chip.lead}+${chip.value}`}
              onDismiss={() => removeFromSelected(chip)}
              selected={true}
            />
          );
        })}
        <SearchBox
          autocomplete="off"
          externallyControlled={externallyControlled}
          placeholder={searchData.length ? "Add filter" : "Search and filter"}
          onChange={(searchTerm) => searchOnChange(searchTerm)}
          onClick={() => setFilterPanelHidden(false)}
          onFocus={() => setFilterPanelHidden(false)}
          onSubmit={(e) => handleSubmit(e)}
          value={searchTerm}
        />
        {overflowSearchTermCounter > 0 && (
          <span
            className="search-and-filter__selected-count"
            onClick={() => setSearchBoxExpanded(true)}
            onKeyDown={() => setSearchBoxExpanded(true)}
            role="button"
          >
            +{overflowSearchTermCounter}
          </span>
        )}
      </div>
      {filterPanelData && (
        <div
          className="search-and-filter__panel"
          aria-hidden={filterPanelHidden}
        >
          <ContextualMenu>
            {filterPanelData.map((filterPanelSectionData) => {
              return (
                <div key={filterPanelSectionData.id}>
                  <FilterPanelSection
                    data={filterPanelSectionData}
                    addToSelected={addToSelected}
                    searchData={searchData}
                  />
                </div>
              );
            })}
          </ContextualMenu>
        </div>
      )}
    </div>
  );
};

SearchAndFilter.propTypes = {
  externallyControlled: PropTypes.bool,
  searchData: PropTypes.arrayOf(
    PropTypes.shape({
      chips: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          lead: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    })
  ),
  filterPanelData: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      chips: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          lead: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    })
  ),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default SearchAndFilter;
