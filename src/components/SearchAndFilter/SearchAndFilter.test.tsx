import { shallow, mount } from "enzyme";

import SearchAndFilter from "./SearchAndFilter";

const sampleData = [
  {
    id: 0,
    heading: "Clouds",
    chips: [{ value: "Google" }, { value: "AWS" }, { value: "Azure" }],
  },
  {
    id: 1,
    heading: "Regions",
    chips: [
      { value: "us-east1" },
      { value: "us-east2" },
      { value: "us-east3" },
    ],
  },
  {
    id: 3,
    heading: "Owner",
    chips: [{ value: "foo" }, { value: "bar" }, { value: "baz" }],
  },
];

describe("Search and filter", () => {
  it("renders", () => {
    const returnSearchData = jest.fn();
    const wrapper = shallow(
      <SearchAndFilter
        filterPanelData={[]}
        returnSearchData={returnSearchData}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("hide the clear button when there is no value in search box", () => {
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        filterPanelData={[]}
        returnSearchData={returnSearchData}
      />
    );
    expect(wrapper.find(".p-search-and-filter__clear").exists()).toBe(false);
  });

  it("shows panel on focus", () => {
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    expect(
      wrapper.find(".p-search-and-filter__panel").prop("aria-hidden")
    ).toEqual(true);
    wrapper.find(".p-search-and-filter").simulate("click");
    expect(
      wrapper.find(".p-search-and-filter__panel").prop("aria-hidden")
    ).toEqual(false);
  });

  it("shows panel on click", () => {
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    expect(
      wrapper.find(".p-search-and-filter__panel").prop("aria-hidden")
    ).toEqual(true);
    wrapper.find(".p-search-and-filter__input").simulate("click");
    expect(
      wrapper.find(".p-search-and-filter__panel").prop("aria-hidden")
    ).toEqual(false);
  });

  it("should hide chip overflow counter when none overflow", () => {
    const returnSearchData = jest.fn();
    // Jest is unaware of layout so we must mock the offsetTop and offsetHeight
    // of the chips
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 40,
    });
    Object.defineProperty(HTMLElement.prototype, "offsetTop", {
      configurable: true,
      value: 40,
    });
    const wrapper = mount(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    expect(wrapper.find(".p-search-and-filter__selected-count").length).toEqual(
      0
    );
  });

  it("show overflow chip counter when chips overflow", () => {
    // Jest is unaware of layout so we must mock the offsetTop and offsetHeight
    // of the chips
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 40,
    });
    Object.defineProperty(HTMLElement.prototype, "offsetTop", {
      configurable: true,
      value: 100,
    });
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    wrapper.find(".p-search-and-filter__input").simulate("click");
    wrapper
      .find(".p-filter-panel-section__chips .p-chip")
      .first()
      .simulate("click");
    expect(wrapper.find(".p-search-and-filter__selected-count").text()).toEqual(
      "+1"
    );
  });

  it("all chips are shown when counter is clicked", () => {
    // Jest is unaware of layout so we must mock the offsetTop and offsetHeight
    // of the chips
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 40,
    });
    Object.defineProperty(HTMLElement.prototype, "offsetTop", {
      configurable: true,
      value: 100,
    });
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    expect(
      wrapper
        .find(".p-search-and-filter__search-container")
        .prop("aria-expanded")
    ).toEqual(false);
    wrapper.find(".p-search-and-filter__input").simulate("click");
    wrapper
      .find(".p-filter-panel-section__chips .p-chip")
      .first()
      .simulate("click");
    wrapper.find(".p-search-and-filter__selected-count").simulate("click");
    expect(
      wrapper
        .find(".p-search-and-filter__search-container")
        .prop("aria-expanded")
    ).toEqual(true);
  });

  it("search prompt appears when search field has search term", () => {
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    wrapper.find(".p-search-and-filter").simulate("click");
    expect(wrapper.find(".p-search-and-filter__search-prompt").length).toEqual(
      0
    );
    wrapper
      .find(".p-search-and-filter__input")
      .simulate("change", { target: { value: "My new value" } });
    expect(wrapper.find(".p-search-and-filter__search-prompt").length).toEqual(
      1
    );
  });

  it("no search results appear for unknown search term", () => {
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    wrapper.find(".p-search-and-filter").simulate("click");
    expect(wrapper.find(".p-filter-panel-section").length).toEqual(3);
    wrapper
      .find(".p-search-and-filter__input")
      .simulate("change", { target: { value: "Unknown value" } });
    expect(wrapper.find(".p-filter-panel-section").length).toEqual(0);
  });

  it("correct number of panels appear for matching search terms", () => {
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    wrapper.find(".p-search-and-filter").simulate("click");
    wrapper
      .find(".p-search-and-filter__input")
      .simulate("change", { target: { value: "Google" } });
    expect(wrapper.find(".p-filter-panel-section").length).toEqual(1);
    wrapper
      .find(".p-search-and-filter__input")
      .simulate("change", { target: { value: "re" } });
    expect(wrapper.find(".p-filter-panel-section").length).toEqual(2);
  });

  it("Matching search terms are highlighted with strong tag", () => {
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    wrapper.find(".p-search-and-filter__input").simulate("click");
    wrapper
      .find(".p-search-and-filter__input")
      .simulate("change", { target: { value: "Google" } });
    const firstChip = wrapper.find(".p-chip").first();
    expect(firstChip.find(".p-chip__value").html()).toEqual(
      '<span class="p-chip__value"><strong>Google</strong></span>'
    );
  });

  it("Existing search data displays correctly", () => {
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
        existingSearchData={[{ lead: "Cloud", value: "Google" }]}
      />
    );
    const lead = wrapper
      .find(".p-search-and-filter__search-container .p-chip__lead")
      .text();
    const value = wrapper
      .find(".p-search-and-filter__search-container .p-chip__value")
      .text();
    expect(lead).toBe("CLOUD");
    expect(value).toBe("Google");
  });

  it("Existing search data displays correctly if two search items present", () => {
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
        existingSearchData={[
          { lead: "Cloud", value: "Google" },
          { lead: "Region", value: "eu-west-1" },
        ]}
      />
    );
    const chips = wrapper.find(
      ".p-search-and-filter__search-container .p-chip"
    );
    expect(chips.length).toBe(2);

    const chip1Value = chips.at(0).find(".p-chip__value").text();
    expect(chip1Value).toEqual("Google");

    const chip2Value = chips.at(1).find(".p-chip__value").text();
    expect(chip2Value).toEqual("eu-west-1");
  });
});
