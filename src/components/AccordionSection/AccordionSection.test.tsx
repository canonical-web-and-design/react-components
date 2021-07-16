import { shallow } from "enzyme";

import { MOCK_UUID } from "../../setupTests";
import AccordionSection from "./AccordionSection";

describe("AccordionSection ", () => {
  it("renders", () => {
    const wrapper = shallow(
      <AccordionSection
        content={<span>Test</span>}
        expanded="abcd-1234"
        setExpanded={jest.fn()}
        title="Test section"
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("renders headings for titles", () => {
    const wrapper = shallow(
      <AccordionSection
        content={<span>Test</span>}
        expanded="abcd-1234"
        setExpanded={jest.fn()}
        title="Test section"
        titleElement="h4"
      />
    );

    expect(wrapper.find("h4.p-accordion__heading")).toHaveLength(1);
    expect(wrapper.find("h4").first().prop("aria-level")).toBeNull();
    expect(wrapper).toMatchSnapshot();
  });

  it("can handle click events on the title", () => {
    const onTitleClick = jest.fn();
    let expanded = null;
    const wrapper = shallow(
      <AccordionSection
        content={<span>Test</span>}
        expanded={expanded}
        onTitleClick={onTitleClick}
        setExpanded={(id) => {
          expanded = id;
        }}
        title="Test section"
      />
    );
    wrapper.find(".p-accordion__tab").at(0).simulate("click");

    expect(onTitleClick.mock.calls[0]).toEqual([true, MOCK_UUID]);
    wrapper.setProps({ expanded });
    // Clicking the title again should close the accordion section.
    wrapper.find(".p-accordion__tab").at(0).simulate("click");

    expect(onTitleClick.mock.calls[1]).toEqual([false, MOCK_UUID]);
  });

  it("can use a key for expanded state", () => {
    const onTitleClick = jest.fn();
    let expanded = null;
    const wrapper = shallow(
      <AccordionSection
        content={<span>Test</span>}
        expanded={expanded}
        sectionKey="first-key"
        onTitleClick={onTitleClick}
        setExpanded={(id) => {
          expanded = id;
        }}
        title="Test section"
      />
    );
    wrapper.find(".p-accordion__tab").at(0).simulate("click");

    expect(onTitleClick.mock.calls[0]).toEqual([true, "first-key"]);
  });

  it("can use a key for expanded state", () => {
    const onTitleClick = jest.fn();
    let expanded = null;
    const wrapper = shallow(
      <AccordionSection
        content={<span>Test</span>}
        expanded={expanded}
        sectionKey="first-key"
        onTitleClick={onTitleClick}
        setExpanded={(id) => {
          expanded = id;
        }}
        title="Test section"
      />
    );
    wrapper.find(".p-accordion__tab").at(0).simulate("click");

    expect(onTitleClick.mock.calls[0]).toEqual([true, "first-key"]);
  });
});
