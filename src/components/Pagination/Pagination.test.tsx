import { shallow } from "enzyme";

import Pagination from "./Pagination";

describe("<Pagination />", () => {
  // snapshot tests
  it("renders and matches the snapshot", () => {
    const component = shallow(
      <Pagination
        itemsPerPage={10}
        totalItems={50}
        paginate={jest.fn()}
        currentPage={1}
      />
    );

    expect(component).toMatchSnapshot();
  });

  // unit tests
  it("renders no pagination with only a single page", () => {
    const component = shallow(
      <Pagination
        itemsPerPage={10}
        totalItems={5}
        paginate={jest.fn()}
        currentPage={1}
      />
    );

    expect(component.find("nav").exists()).toBe(false);
  });

  it("renders a simple paginator with back and forward arrows if only five pages or less", () => {
    const component = shallow(
      <Pagination
        itemsPerPage={10}
        totalItems={50}
        paginate={jest.fn()}
        currentPage={1}
      />
    );

    expect(component.find("PaginationItemSeparator").exists()).toBe(false);
    expect(component.find("PaginationButton").length).toEqual(2);
    expect(component.find("PaginationItem").length).toEqual(5);
  });

  it("renders a complex paginator with truncation if more than five pages", () => {
    const component = shallow(
      <Pagination
        itemsPerPage={10}
        totalItems={1000}
        paginate={jest.fn()}
        currentPage={5}
      />
    );

    expect(component.find("PaginationItemSeparator").length).toEqual(2);
    expect(component.find("PaginationButton").length).toEqual(2);
    expect(component.find("PaginationItem").length).toEqual(5);
  });

  it("does not render a truncation separator if currentPage is contiguous at start", () => {
    const component = shallow(
      <Pagination
        itemsPerPage={10}
        totalItems={1000}
        paginate={jest.fn()}
        currentPage={2}
      />
    );

    expect(component.find("PaginationItemSeparator").length).toEqual(1);
    expect(component.find("PaginationButton").length).toEqual(2);
    expect(component.find("PaginationItem").length).toEqual(5);
  });

  it("does not render a truncation separator if currentPage is contiguous at end", () => {
    const component = shallow(
      <Pagination
        itemsPerPage={10}
        totalItems={1000}
        paginate={jest.fn()}
        currentPage={98}
      />
    );

    expect(component.find("PaginationItemSeparator").length).toEqual(1);
    expect(component.find("PaginationButton").length).toEqual(2);
    expect(component.find("PaginationItem").length).toEqual(5);
  });
});
