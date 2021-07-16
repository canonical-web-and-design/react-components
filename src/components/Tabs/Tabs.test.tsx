import { shallow } from "enzyme";

import Tabs from "./Tabs";

describe("Tabs", () => {
  it("renders", () => {
    const wrapper = shallow(
      <Tabs
        links={[
          {
            active: true,
            href: "/path1",
            label: "label1",
          },
          {
            active: false,
            href: "/path2",
            label: "label2",
          },
        ]}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("sets an active item correctly", () => {
    const wrapper = shallow(
      <Tabs
        links={[
          {
            active: true,
            label: "label1",
          },
          {
            active: false,
            label: "label2",
          },
        ]}
      />
    );
    expect(wrapper.find("[aria-selected=true]").length).toBe(1);
  });

  it("can set classNames correctly", () => {
    const wrapper = shallow(
      <Tabs
        className="nav-class"
        listClassName="list-class"
        links={[
          {
            className: "link-class",
            label: "label1",
            listItemClassName: "list-item-class",
          },
        ]}
      />
    );
    expect(wrapper.find("nav").props().className.includes("nav-class")).toBe(
      true
    );
    expect(wrapper.find("ul").props().className.includes("list-class")).toBe(
      true
    );
    expect(
      wrapper.find("li").props().className.includes("list-item-class")
    ).toBe(true);
    expect(wrapper.find("a").props().className.includes("link-class")).toBe(
      true
    );
  });

  it("can use custom elements as links", () => {
    const wrapper = shallow(
      <Tabs
        links={[
          {
            component: "div",
            label: "label1",
            to: "/path",
          },
        ]}
      />
    );
    expect(wrapper.find("a[data-test='tab-link-label1']").exists()).toBe(false);
    expect(wrapper.find("div[data-test='tab-link-label1']").exists()).toBe(
      true
    );
  });

  it("can use custom components as links", () => {
    const TestLink = ({ children, ...props }) => (
      <span {...props}>{children}</span>
    );
    const wrapper = shallow(
      <Tabs
        links={[
          {
            component: TestLink,
            label: "label1",
            to: "/path",
          },
        ]}
      />
    );
    expect(wrapper.find("a[data-test='tab-link-label1']").exists()).toBe(false);
    expect(wrapper.find("TestLink[data-test='tab-link-label1']").exists()).toBe(
      true
    );
  });
});
