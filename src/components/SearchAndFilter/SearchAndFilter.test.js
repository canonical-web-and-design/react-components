import { shallow, mount } from "enzyme";
import React from "react";

import SearchAndFilter from "./SearchAndFilter";

describe("Search and filter", () => {
  it("renders", () => {
    const wrapper = shallow(<SearchAndFilter />);
    expect(wrapper).toMatchSnapshot();
  });

  it("hide the clear button when there is no value in search box", () => {
    const wrapper = mount(<SearchAndFilter />);
    expect(wrapper.find(".p-search-box__reset").exists()).toBe(false);
  });

  it("onChange handler called", () => {
    const mockOnChange = jest.fn();
    const wrapper = mount(
      <SearchAndFilter externallyControlled onChange={mockOnChange} />
    );
    wrapper.find(".p-search-box__input").simulate("change");
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("shows panel on focus", () => {
    const mockOnChange = jest.fn();
    const wrapper = mount(
      <SearchAndFilter externallyControlled onChange={mockOnChange} />
    );
    expect(
      wrapper.find(".search-and-filter__panel").prop("data-visible")
    ).toEqual(false);
    wrapper.find(".p-search-box__input").simulate("focus");
    expect(
      wrapper.find(".search-and-filter__panel").prop("data-visible")
    ).toEqual(true);
  });
});
