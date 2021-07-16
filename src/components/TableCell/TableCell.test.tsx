import { shallow } from "enzyme";

import TableCell from "./TableCell";

describe("TableCell", () => {
  it("renders", () => {
    const wrapper = shallow(<TableCell>Test content</TableCell>);
    expect(wrapper).toMatchSnapshot();
  });

  it("can set a role", () => {
    const wrapper = shallow(<TableCell role="rowheader" />);
    expect(wrapper.prop("role")).toEqual("rowheader");
  });

  it("can be hidden", () => {
    const wrapper = shallow(<TableCell hidden={true} />);
    expect(wrapper.prop("aria-hidden")).toBe(true);
  });

  it("can be expanding", () => {
    const wrapper = shallow(<TableCell expanding={true} />);
    expect(wrapper.prop("className").includes("p-table__expanding-panel")).toBe(
      true
    );
  });

  it("can have overflow", () => {
    const wrapper = shallow(<TableCell hasOverflow={true} />);
    expect(wrapper.prop("className").includes("has-overflow")).toBe(true);
  });

  it("can add additional classes", () => {
    const wrapper = shallow(
      <TableCell expanding={true} className="extra-class" />
    );
    const className = wrapper.prop("className");
    expect(className.includes("p-table__expanding-panel")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });
});
