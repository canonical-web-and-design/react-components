import { mount } from "enzyme";
import type { ReactNode } from "react";

import ContextualMenu from "./ContextualMenu";

describe("ContextualMenu ", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    const wrapper = mount(<ContextualMenu links={[]} />);
    expect(wrapper.find("ContextualMenu")).toMatchSnapshot();
  });

  it("can be aligned to the right", () => {
    const wrapper = mount(<ContextualMenu links={[]} position="right" />);
    expect(wrapper.find(".p-contextual-menu").exists()).toBe(true);
  });

  it("can be aligned to the left", () => {
    const wrapper = mount(<ContextualMenu links={[]} position="left" />);
    expect(wrapper.find(".p-contextual-menu--left").exists()).toBe(true);
  });

  it("can be aligned to the center", () => {
    const wrapper = mount(<ContextualMenu links={[]} position="center" />);
    expect(wrapper.find(".p-contextual-menu--center").exists()).toBe(true);
  });

  it("can have a toggle button", () => {
    const wrapper = mount(<ContextualMenu links={[]} toggleLabel="Toggle" />);
    expect(wrapper.find("button.p-contextual-menu__toggle").exists()).toBe(
      true
    );
  });

  it("can be disabled", () => {
    const wrapper = mount(
      <ContextualMenu links={[]} toggleDisabled toggleLabel="Toggle" />
    );
    expect(
      wrapper.find("button.p-contextual-menu__toggle").props().disabled
    ).toBe(true);
  });

  it("can have a toggle button with an icon", () => {
    const wrapper = mount(<ContextualMenu hasToggleIcon links={[]} />);
    expect(
      wrapper
        .find("button.p-contextual-menu__toggle .p-contextual-menu__indicator")
        .exists()
    ).toBe(true);
  });

  it("makes the icon light if the toggle is positive or negative", () => {
    const positive = mount(
      <ContextualMenu hasToggleIcon links={[]} toggleAppearance="positive" />
    );
    expect(
      positive
        .find("button.p-contextual-menu__toggle .p-contextual-menu__indicator")
        .hasClass("is-light")
    ).toBe(true);
  });

  it("can have a toggle button with an icon and text on the left", () => {
    const wrapper = mount(
      <ContextualMenu
        hasToggleIcon
        links={[]}
        toggleLabel="Toggle"
        toggleLabelFirst
      />
    );
    expect(
      wrapper.find("button.p-contextual-menu__toggle").children().at(0).text()
    ).toBe("Toggle");
  });

  it("can have a toggle button with an icon and text on the right", () => {
    const wrapper = mount(
      <ContextualMenu
        hasToggleIcon
        links={[]}
        toggleLabel="Toggle"
        toggleLabelFirst={false}
      />
    );
    expect(
      wrapper.find("button.p-contextual-menu__toggle").children().at(1).text()
    ).toBe("Toggle");
  });

  it("can have a toggle button with just text", () => {
    const wrapper = mount(<ContextualMenu links={[]} toggleLabel="Toggle" />);
    expect(
      wrapper
        .find("button.p-contextual-menu__toggle .p-contextual-menu__indicator")
        .exists()
    ).toBe(false);
    expect(
      wrapper.find("button.p-contextual-menu__toggle").children().text()
    ).toBe("Toggle");
  });

  it("can not have a toggle button", () => {
    const wrapper = mount(<ContextualMenu links={[]} />);
    expect(wrapper.find("button.p-contextual-menu__toggle").exists()).toBe(
      false
    );
  });

  it("can use the toggle button to display the menu", () => {
    const wrapper = mount(<ContextualMenu links={[]} toggleLabel="Toggle" />);
    expect(
      wrapper.find("button.p-contextual-menu__toggle").prop("aria-expanded")
    ).toBe("false");
    wrapper.find("Button.p-contextual-menu__toggle").simulate("click");
    expect(
      wrapper.find("button.p-contextual-menu__toggle").prop("aria-expanded")
    ).toBe("true");
    expect(
      wrapper.find(".p-contextual-menu__dropdown").prop("aria-hidden")
    ).toBe("false");
  });

  it("be visible without a toggle button", () => {
    const wrapper = mount(<ContextualMenu links={[]} visible />);
    expect(
      wrapper.find(".p-contextual-menu__dropdown").prop("aria-hidden")
    ).toBe("false");
  });

  it("can display links", () => {
    const wrapper = mount(
      <ContextualMenu links={[{ children: "Link1" }]} visible />
    );
    expect(
      wrapper.find("button.p-contextual-menu__link").children().text()
    ).toBe("Link1");
  });

  it("can display links in groups", () => {
    const wrapper = mount(
      <ContextualMenu links={[[{ children: "Link1" }]]} visible />
    );
    expect(
      wrapper
        .find(".p-contextual-menu__group button.p-contextual-menu__link")
        .children()
        .text()
    ).toBe("Link1");
  });

  it("can display a mix of links and groups", () => {
    const wrapper = mount(
      <ContextualMenu
        links={[[{ children: "Link1" }], { children: "Link2" }]}
        visible
      />
    );
    expect(
      wrapper
        .find(".p-contextual-menu__group button.p-contextual-menu__link")
        .children()
        .text()
    ).toBe("Link1");
    expect(
      wrapper.find("button.p-contextual-menu__link").at(1).children().text()
    ).toBe("Link2");
  });

  it("can supply content instead of links", () => {
    const wrapper = mount(
      <ContextualMenu visible>
        <span className="content">content</span>
      </ContextualMenu>
    );
    expect(wrapper.find(".content").exists()).toBe(true);
    expect(wrapper.find("button.p-contextual-menu__link").exists()).toBe(false);
  });

  it("closes the menu when clicking on an item", () => {
    const wrapper = mount(
      <ContextualMenu links={[{ onClick: jest.fn() }]} toggleLabel="Toggle" />
    );
    // Open the menu:
    wrapper.find("Button.p-contextual-menu__toggle").simulate("click");
    expect(
      wrapper.find("button.p-contextual-menu__toggle").prop("aria-expanded")
    ).toBe("true");
    // Click on an item:
    wrapper.find("Button.p-contextual-menu__link").simulate("click");
    expect(
      wrapper.find("button.p-contextual-menu__toggle").prop("aria-expanded")
    ).toBe("false");
  });

  it("can use a custom link component", () => {
    type LinkProps = {
      /** An address */
      to: string;
      children: ReactNode;
    };
    const Link = ({ children, to }: LinkProps) => <a href={to}>{children}</a>;
    const wrapper = mount(
      <ContextualMenu
        links={[{ children: "Link1", element: Link, to: "http://example.com" }]}
        visible
      />
    );
    expect(wrapper.find("Link.p-contextual-menu__link").exists()).toBe(true);
  });

  it("can pass props to the contextual menu", () => {
    const wrapper = mount(<ContextualMenu links={[]} data-test="extra-prop" />);
    expect(wrapper.prop("data-test")).toBe("extra-prop");
  });

  it("can pass props to the toggle button", () => {
    const wrapper = mount(
      <ContextualMenu
        links={[]}
        toggleLabel="Toggle"
        toggleProps={{
          appearance: "negative",
          "data-test": "extra-prop",
        }}
      />
    );
    const button = wrapper.find("Button.p-contextual-menu__toggle");
    expect(button.prop("appearance")).toBe("negative");
    expect(button.prop("data-test")).toBe("extra-prop");
  });

  it("can pass props to the contextual menu dropdown", () => {
    const wrapper = mount(
      <ContextualMenu
        links={[]}
        toggleLabel="Toggle"
        dropdownProps={{
          "data-test": "extra-prop",
        }}
      />
    );
    // Open the menu.
    wrapper.find("Button.p-contextual-menu__toggle").simulate("click");
    expect(wrapper.find("ContextualMenuDropdown").prop("data-test")).toBe(
      "extra-prop"
    );
  });
});
