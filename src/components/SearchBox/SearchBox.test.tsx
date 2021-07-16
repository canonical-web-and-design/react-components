import { shallow, mount } from "enzyme";

import SearchBox from "./SearchBox";

describe("SearchBox ", () => {
  it("renders", () => {
    const wrapper = shallow(<SearchBox />);
    expect(wrapper).toMatchSnapshot();
  });

  it("shows the clear button when there is a value", () => {
    const wrapper = shallow(<SearchBox value="admin" />);
    expect(wrapper.find(".p-search-box__reset").exists()).toBe(true);
  });

  it("can externally control the value", () => {
    const wrapper = shallow(
      <SearchBox externallyControlled onChange={jest.fn()} value="admin" />
    );
    let input = wrapper.find(".p-search-box__input");
    expect(input.prop("defaultValue")).toBe(undefined);
    expect(input.prop("value")).toBe("admin");
    wrapper.setProps({ value: "new-admin" });
    input = wrapper.find(".p-search-box__input");
    expect(input.prop("value")).toBe("new-admin");
  });

  it("can be found using the component name", () => {
    const WrappingComponent = () => (
      <div>
        <SearchBox />
      </div>
    );
    const wrapper = mount(<WrappingComponent />);
    expect(wrapper.find("SearchBox").exists()).toBe(true);
  });
});
