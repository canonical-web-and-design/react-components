import { mount, shallow } from "enzyme";

import Select from "./Select";

describe("Select ", () => {
  it("renders", () => {
    const wrapper = shallow(
      <Select
        id="test-id"
        options={[
          { value: "", disabled: true, label: "Select an option" },
          { value: "1", label: "Cosmic Cuttlefish" },
          { value: "2", label: "Bionic Beaver" },
          { value: "3", label: "Xenial Xerus" },
        ]}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onChange prop", () => {
    const onChangeMock = jest.fn();
    const event = {
      event: "test-event",
    };
    const component = shallow(<Select options={[]} onChange={onChangeMock} />);
    component.find("select").simulate("change", event);
    expect(onChangeMock).toBeCalledWith(event);
  });

  it("can add additional classes", () => {
    const wrapper = shallow(<Select className="extra-class" options={[]} />);
    const className = wrapper.find("select").prop("className");
    expect(className.includes("p-form-validation__input")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });

  it("can take focus on first render", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const wrapper = mount(<Select options={[]} takeFocus />, {
      attachTo: container,
    });
    expect(wrapper.find("select").getDOMNode()).toBe(document.activeElement);
  });
});
