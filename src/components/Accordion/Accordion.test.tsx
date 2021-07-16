import { mount, shallow } from "enzyme";

import { MOCK_UUID } from "../../setupTests";
import Accordion from "./Accordion";

describe("Accordion", () => {
  it("renders", () => {
    const wrapper = shallow(
      <Accordion
        sections={[
          {
            title: "Advanced topics",
            content: "test content",
          },
          {
            title: "Networking",
            content: <>More test content</>,
          },
        ]}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("passes title heading element to AccordionSections", () => {
    const wrapper = shallow(
      <Accordion
        sections={[
          {
            title: "Advanced topics",
            content: "test content",
          },
          {
            title: "Networking",
            content: <>More test content</>,
          },
        ]}
        titleElement="h4"
      />
    );
    expect(wrapper.find("AccordionSection").at(0).prop("titleElement")).toBe(
      "h4"
    );
  });

  it("can call a function when a section is expanded", () => {
    const onExpandedChange = jest.fn();
    const wrapper = mount(
      <Accordion
        onExpandedChange={onExpandedChange}
        sections={[
          {
            title: "Advanced topics",
            content: "test content",
          },
          {
            title: "Networking",
            content: <>More test content</>,
          },
        ]}
      />
    );
    const title = wrapper.find(".p-accordion__tab").at(0);
    title.simulate("click");
    expect(onExpandedChange).toHaveBeenCalledWith(MOCK_UUID, "Advanced topics");
    // Clicking the title again should close the accordion section.
    title.simulate("click");
    expect(onExpandedChange).toHaveBeenCalledWith(null, null);
  });

  it("can set the default expanded state", () => {
    const wrapper = shallow(
      <Accordion
        expanded="networking"
        sections={[
          {
            title: "Advanced topics",
            content: "test content",
          },
          {
            title: "Networking",
            content: <>More test content</>,
          },
        ]}
      />
    );
    expect(wrapper.find("AccordionSection").at(0).prop("expanded")).toBe(
      "networking"
    );
  });

  it("can add additional classes", () => {
    const wrapper = shallow(
      <Accordion className="extra-class" sections={[]} />
    );
    const className = wrapper.prop("className");
    expect(className.includes("p-accordion")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });
});
