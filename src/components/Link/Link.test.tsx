import { shallow } from "enzyme";

import Link from "./Link";

describe("Link ", () => {
  it("renders", () => {
    const wrapper = shallow(<Link href="/example">Test content</Link>);
    expect(wrapper).toMatchSnapshot();
  });

  it("can be an external link", () => {
    const wrapper = shallow(<Link external={true}>Test content</Link>);
    expect(wrapper.prop("className").includes("p-link--external")).toBe(true);
  });

  it("can be an inverted link", () => {
    const wrapper = shallow(<Link inverted={true}>Test content</Link>);
    expect(wrapper.prop("className").includes("p-link--inverted")).toBe(true);
  });

  it("can be a soft link", () => {
    const wrapper = shallow(<Link soft={true}>Test content</Link>);
    expect(wrapper.prop("className").includes("p-link--soft")).toBe(true);
  });

  it("can be a back to top link", () => {
    const wrapper = shallow(<Link top={true}>Back to top</Link>);
    expect(wrapper).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    const wrapper = shallow(
      <Link soft={true} className="extra-class">
        Test content
      </Link>
    );
    const className = wrapper.prop("className");
    expect(className.includes("p-link--soft")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });
});
