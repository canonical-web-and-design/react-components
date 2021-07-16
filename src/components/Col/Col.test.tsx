import { shallow } from "enzyme";

import Col from "./Col";

describe("Col ", () => {
  it("renders", () => {
    const wrapper = shallow(<Col size={3}>Test content</Col>);
    expect(wrapper).toMatchSnapshot();
  });

  it("can set a size for small screens", () => {
    const wrapper = shallow(
      <Col size={3} small={1}>
        Test content
      </Col>
    );
    expect(wrapper.prop("className").includes("col-small-1")).toBe(true);
  });

  it("can set a size for medium screens", () => {
    const wrapper = shallow(
      <Col size={3} medium={1}>
        Test content
      </Col>
    );
    expect(wrapper.prop("className").includes("col-medium-1")).toBe(true);
  });

  it("can set a size for large screens", () => {
    const wrapper = shallow(
      <Col size={3} large={1}>
        Test content
      </Col>
    );
    expect(wrapper.prop("className").includes("col-large-1")).toBe(true);
  });

  it("can set empty cols for small screens", () => {
    const wrapper = shallow(
      <Col size={3} emptySmall={1}>
        Test content
      </Col>
    );
    expect(wrapper.prop("className").includes("col-start-small-1")).toBe(true);
  });

  it("can set empty cols for medium screens", () => {
    const wrapper = shallow(
      <Col size={3} emptyMedium={1}>
        Test content
      </Col>
    );
    expect(wrapper.prop("className").includes("col-start-medium-1")).toBe(true);
  });

  it("can set empty cols for large screens", () => {
    const wrapper = shallow(
      <Col size={3} emptyLarge={1}>
        Test content
      </Col>
    );
    expect(wrapper.prop("className").includes("col-start-large-1")).toBe(true);
  });

  it("can add additional classes", () => {
    const wrapper = shallow(<Col size={3} className="extra-class"></Col>);
    const className = wrapper.prop("className");
    expect(className.includes("col-3")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });
});
