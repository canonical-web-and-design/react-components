import { shallow } from "enzyme";

import Label from "./Label";

describe("Label ", () => {
  it("renders", () => {
    const wrapper = shallow(<Label forId="test-id">Test content</Label>);
    expect(wrapper).toMatchSnapshot();
  });

  it("can be required", () => {
    const wrapper = shallow(<Label required={true} />);
    expect(wrapper.prop("className").includes("is-required")).toBe(true);
  });

  it("can add additional classes", () => {
    const wrapper = shallow(<Label className="extra-class" />);
    const className = wrapper.prop("className");
    expect(className.includes("p-form__label")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });
});
