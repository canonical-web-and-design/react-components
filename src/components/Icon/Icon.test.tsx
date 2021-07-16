import { shallow } from "enzyme";

import Icon, { ICONS } from "./Icon";

describe("Icon", () => {
  it("renders", () => {
    const wrapper = shallow(<Icon name={ICONS.success} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("sets correct class name based on given name", () => {
    const wrapper = shallow(<Icon name="test" />);
    expect(wrapper.prop("className").includes("p-icon--test")).toBe(true);
  });

  it("can be given a custom class name", () => {
    const wrapper = shallow(<Icon className="custom-class" name="test" />);
    expect(wrapper.prop("className")).toBe("custom-class p-icon--test");
  });

  it("can be given standard HTML props", () => {
    const style = { width: "200px" };
    const wrapper = shallow(<Icon name="test" style={style} />);
    expect(wrapper.prop("style")).toBe(style);
  });
});
