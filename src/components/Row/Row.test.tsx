import { shallow } from "enzyme";

import Row from "./Row";

describe("Row ", () => {
  it("renders", () => {
    const wrapper = shallow(<Row>Test content</Row>);
    expect(wrapper).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    const wrapper = shallow(<Row className="extra-class">Test content</Row>);
    const className = wrapper.prop("className");
    expect(className.includes("row")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });
});
