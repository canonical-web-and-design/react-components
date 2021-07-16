import { shallow, mount } from "enzyme";

import FilterPanelSection from "./FilterPanelSection";

const sampleData = {
  id: 1,
  heading: "Regions",
  chips: [{ value: "us-east1" }, { value: "us-east2" }, { value: "us-east3" }],
};

describe("Filter panel section", () => {
  it("renders", () => {
    const wrapper = shallow(
      <FilterPanelSection
        searchData={[]}
        searchTerm=""
        toggleSelected={jest.fn()}
        data={sampleData}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("shows correct data passed as prop", () => {
    const wrapper = mount(
      <FilterPanelSection
        searchData={[]}
        searchTerm=""
        toggleSelected={jest.fn()}
        data={sampleData}
      />
    );
    expect(wrapper.find(".p-filter-panel-section").length).toEqual(1);
    const section = wrapper.find(".p-filter-panel-section");
    const chips = wrapper.find(".p-chip");
    expect(chips.length).toEqual(3);
    expect(section.find(".p-filter-panel-section__heading").text()).toEqual(
      "Regions"
    );
    const firstChip = section.find(".p-chip").at(0);
    expect(firstChip.text()).toEqual("us-east1");
  });

  it("should hide chip overflow counter when none overflow", () => {
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
      <FilterPanelSection
        searchData={[]}
        searchTerm=""
        toggleSelected={jest.fn()}
        data={sampleData}
      />
    );
    expect(wrapper.find(".p-filter-panel-section__counter").length).toEqual(0);
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
    const wrapper = mount(
      <FilterPanelSection
        searchData={[]}
        searchTerm=""
        toggleSelected={jest.fn()}
        data={sampleData}
      />
    );
    expect(wrapper.find(".p-filter-panel-section__counter").text()).toEqual(
      "+3"
    );
  });

  it("all chips are shown when counter is clicked", () => {
    const wrapper = mount(
      <FilterPanelSection
        searchData={[]}
        searchTerm=""
        toggleSelected={jest.fn()}
        data={sampleData}
        sectionHidden={false}
      />
    );
    expect(wrapper.find("[aria-expanded=false]").length).toEqual(1);
    wrapper.find(".p-filter-panel-section__counter").simulate("click");
    expect(wrapper.find("[aria-expanded=true]").length).toEqual(1);
  });
});
