import { shallow } from "enzyme";
import type { ReactNode } from "react";

import Button from "./Button";

describe("Button ", () => {
  it("renders", () => {
    const wrapper = shallow(<Button>Test content</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as a link", () => {
    const wrapper = shallow(<Button element="a">Test content</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it("can handle button click events", () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Button onClick={onClick} />);
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });

  it("can handle anchor click events", () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Button element="a" onClick={onClick} />);
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });

  it("correctly disables a button", () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Button disabled={true} onClick={onClick} />);
    expect(wrapper.prop("disabled")).toBe(true);
    expect(wrapper.prop("className").includes("is-disabled")).toBe(false);
    expect(wrapper.prop("aria-disabled")).toBe(undefined);
    const preventDefault = jest.fn();
    wrapper.simulate("click", { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("correctly disables a link", () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <Button element="a" disabled={true} onClick={onClick} />
    );
    expect(wrapper.prop("className").includes("is-disabled")).toBe(true);
    expect(wrapper.prop("aria-disabled")).toBe(true);
    expect(wrapper.prop("disabled")).toBe(undefined);
    const preventDefault = jest.fn();
    wrapper.simulate("click", { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("correctly handle icons", () => {
    const wrapper = shallow(<Button hasIcon={true} />);
    expect(wrapper.prop("className").includes("has-icon")).toBe(true);
  });

  it("can be inline", () => {
    const wrapper = shallow(<Button inline={true} />);
    expect(wrapper.prop("className").includes("is-inline")).toBe(true);
  });

  it("can be dense", () => {
    const wrapper = shallow(<Button dense />);
    expect(wrapper.prop("className").includes("is-dense")).toBe(true);
  });

  it("can be small", () => {
    const wrapper = shallow(<Button small />);
    expect(wrapper.prop("className").includes("is-small")).toBe(true);
  });

  it("can add additional classes", () => {
    const wrapper = shallow(<Button className="extra-class" />);
    const className = wrapper.prop("className");
    expect(className.includes("p-button--neutral")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });

  it("puts additional classes at the end", () => {
    const wrapper = shallow(<Button className="extra-class" dense />);
    expect(wrapper.prop("className")).toEqual(
      "p-button--neutral is-dense extra-class"
    );
  });

  it("handles base button props", () => {
    const wrapper = shallow(<Button type="button" />);
    wrapper.simulate("click");
    expect(wrapper.prop("type")).toBe("button");
  });

  it("handles alternate element props", () => {
    const wrapper = shallow(<Button element="a" href="http://example.com" />);
    wrapper.simulate("click");
    expect(wrapper.prop("href")).toBe("http://example.com");
  });

  it("handles supplied component props", () => {
    type LinkProps = {
      /** An address */
      to: string;
      children: ReactNode;
    };
    const Link = ({ children, to }: LinkProps) => <a href={to}>{children}</a>;
    const wrapper = shallow(<Button element={Link} to="http://example.com" />);
    wrapper.simulate("click");
    expect(wrapper.prop("to")).toBe("http://example.com");
  });
});
