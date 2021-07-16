import { shallow } from "enzyme";

import Form from "./Form";

describe("Form ", () => {
  it("renders", () => {
    const wrapper = shallow(<Form>Test content</Form>);
    expect(wrapper).toMatchSnapshot();
  });

  it("can be inline", () => {
    const wrapper = shallow(<Form inline={true} />);
    expect(wrapper.prop("className").includes("p-form--inline")).toBe(true);
  });

  it("can be stacked", () => {
    const wrapper = shallow(<Form stacked={true} />);
    expect(wrapper.prop("className").includes("p-form--stacked")).toBe(true);
  });

  it("can add additional classes", () => {
    const wrapper = shallow(<Form stacked={true} className="extra-class" />);
    const className = wrapper.prop("className");
    expect(className.includes("p-form")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });
});
