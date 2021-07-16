import { shallow } from "enzyme";

import { compareJSX } from "../../testing/utils";
import List from "./List";

describe("List ", () => {
  let items: string[];

  beforeEach(() => {
    items = ["test", "items", "here"];
  });

  it("renders", () => {
    const wrapper = shallow(<List items={items} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("can define items as JSX", () => {
    const wrapper = shallow(
      <List items={[<div>test</div>, <span>items</span>]} />
    );
    const item = wrapper.find(".p-list__item").first();
    compareJSX(item.children(), <div>test</div>);
  });

  it("can define items as objects", () => {
    const wrapper = shallow(
      <List items={[{ content: "test", className: "item-class" }]} />
    );
    const item = wrapper.find(".p-list__item").first();
    expect(item.prop("className").includes("item-class")).toBe(true);
  });

  it("can be divided", () => {
    const wrapper = shallow(<List divided={true} items={items} />);
    expect(wrapper.prop("className").includes("p-list--divided")).toBe(true);
  });

  it("can be inline", () => {
    const wrapper = shallow(<List inline={true} items={items} />);
    expect(wrapper.prop("className").includes("p-inline-list")).toBe(true);
    expect(wrapper.find(".p-inline-list__item").exists()).toBe(true);
  });

  it("can be inline middot", () => {
    const wrapper = shallow(<List middot={true} items={items} />);
    expect(wrapper.prop("className").includes("p-inline-list--middot")).toBe(
      true
    );
    expect(wrapper.find(".p-inline-list__item").exists()).toBe(true);
  });

  it("can be inline stretch", () => {
    const wrapper = shallow(<List stretch={true} items={items} />);
    expect(wrapper.prop("className").includes("p-inline-list--stretch")).toBe(
      true
    );
    expect(wrapper.find(".p-inline-list__item").exists()).toBe(true);
    expect(wrapper.prop("className").includes("p-list")).toBe(false);
  });

  it("can be split", () => {
    const wrapper = shallow(<List split={true} items={items} />);
    expect(wrapper.prop("className").includes("is-split")).toBe(true);
  });

  it("can be ticked", () => {
    const wrapper = shallow(<List ticked={true} items={items} />);
    expect(
      wrapper
        .find(".p-list__item")
        .first()
        .prop("className")
        .includes("is-ticked")
    ).toBe(true);
  });

  it("can be stepped", () => {
    const wrapper = shallow(
      <List
        stepped={true}
        items={[
          {
            title: "Test title",
            content: "test",
            className: "item-class",
            titleElement: "h1",
          },
        ]}
      />
    );
    expect(wrapper.prop("className").includes("p-stepped-list")).toBe(true);
    compareJSX(
      wrapper.find(".p-stepped-list__item").first(),
      <li className="item-class p-stepped-list__item">
        <h1 className="p-stepped-list__title">Test title</h1>
        <p className="p-stepped-list__content">test</p>
      </li>
    );
  });

  it("can be detailed stepped", () => {
    const wrapper = shallow(
      <List
        detailed={true}
        stepped={true}
        items={[
          {
            title: "Test title",
            content: "test",
            className: "item-class",
            titleElement: "h1",
          },
        ]}
      />
    );
    expect(wrapper.prop("className").includes("p-stepped-list--detailed")).toBe(
      true
    );
    expect(wrapper.find(".p-stepped-list__item").exists()).toBe(true);
  });

  it("can add additional classes", () => {
    const wrapper = shallow(<List className="extra-class" items={items} />);
    const className = wrapper.prop("className");
    expect(className.includes("p-list")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });
});
