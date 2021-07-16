import { shallow } from "enzyme";

import { compareJSX } from "../../testing/utils";
import Field from "./Field";

describe("Field ", () => {
  it("renders", () => {
    const wrapper = shallow(
      <Field forId="test-id" label="Test label">
        Test content
      </Field>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    const wrapper = shallow(<Field className="extra-class" />);
    const className = wrapper.prop("className");
    expect(className.includes("p-form__group")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });

  it("can display a caution message", () => {
    const wrapper = shallow(<Field caution="Are you sure?" />);
    compareJSX(
      wrapper.find(".p-form-validation__message"),
      <p className="p-form-validation__message">
        <strong>{"Caution"}:</strong> {"Are you sure?"}
      </p>
    );
    expect(wrapper.prop("className").includes("is-caution")).toBe(true);
  });

  it("can display a caution node", () => {
    const wrapper = shallow(<Field caution={<span>Are you sure?</span>} />);
    compareJSX(
      wrapper.find(".p-form-validation__message"),
      <p className="p-form-validation__message">
        <strong>{"Caution"}:</strong> <span>Are you sure?</span>
      </p>
    );
    expect(wrapper.prop("className").includes("is-caution")).toBe(true);
  });

  it("can display an error message", () => {
    const wrapper = shallow(<Field error="You can't do that" />);
    compareJSX(
      wrapper.find(".p-form-validation__message"),
      <p className="p-form-validation__message">
        <strong>{"Error"}:</strong> {"You can't do that"}
      </p>
    );
    expect(wrapper.prop("className").includes("is-error")).toBe(true);
  });

  it("can display an error node", () => {
    const wrapper = shallow(<Field error={<span>You can't do that</span>} />);
    compareJSX(
      wrapper.find(".p-form-validation__message"),
      <p className="p-form-validation__message">
        <strong>{"Error"}:</strong> <span>You can't do that</span>
      </p>
    );
    expect(wrapper.prop("className").includes("is-error")).toBe(true);
  });

  it("can display a success message", () => {
    const wrapper = shallow(<Field success="You did it!" />);
    compareJSX(
      wrapper.find(".p-form-validation__message"),
      <p className="p-form-validation__message">
        <strong>{"Success"}:</strong> {"You did it!"}
      </p>
    );
    expect(wrapper.prop("className").includes("is-success")).toBe(true);
  });

  it("can display a success node", () => {
    const wrapper = shallow(<Field success={<span>You did it!</span>} />);
    compareJSX(
      wrapper.find(".p-form-validation__message"),
      <p className="p-form-validation__message">
        <strong>{"Success"}:</strong> <span>You did it!</span>
      </p>
    );
    expect(wrapper.prop("className").includes("is-success")).toBe(true);
  });

  it("can display a help message", () => {
    const wrapper = shallow(<Field help="This is how you do it" />);
    expect(wrapper.find(".p-form-help-text").text()).toEqual(
      "This is how you do it"
    );
  });

  it("can display a help node", () => {
    const wrapper = shallow(
      <Field help={<span>This is how you do it</span>} />
    );
    compareJSX(
      wrapper.find(".p-form-help-text"),
      <p className="p-form-help-text">
        <span>This is how you do it</span>
      </p>
    );
  });

  it("can display the label before the input", () => {
    const wrapper = shallow(<Field labelFirst={true} label="Test label" />);
    // The label should not be inside the control.
    expect(wrapper.find(".p-form__control Label").length).toBe(0);
  });

  it("can display the label after the input", () => {
    const wrapper = shallow(<Field labelFirst={false} label="Test label" />);
    // The label should be inside the control.
    expect(wrapper.find(".p-form__control Label").length).toBe(1);
  });

  it("can display a label node", () => {
    const wrapper = shallow(<Field label={<span>Test label</span>} />);
    compareJSX(wrapper.find("Label").children(), <span>Test label</span>);
  });

  it("can pass a class name to the label", () => {
    const wrapper = shallow(
      <Field label={<span>Test label</span>} labelClassName="custom-label" />
    );
    expect(wrapper.find("Label").prop("className")).toBe("custom-label");
  });

  it("can be required", () => {
    const wrapper = shallow(<Field required={true} label="Test label" />);
    expect(wrapper.find("Label").prop("required")).toBe(true);
  });

  it("can be stacked", () => {
    const wrapper = shallow(<Field stacked={true} label="Test label" />);
    // The Label should be inside a col-4.
    const labelCol = wrapper.find("Label").parent();
    expect(labelCol.is("Col")).toBe(true);
    expect(labelCol.prop("size")).toEqual(4);
    // The control should be inside a col-8.
    const inputCol = wrapper.find(".p-form__control").parent();
    expect(inputCol.is("Col")).toBe(true);
    expect(inputCol.prop("size")).toEqual(8);
    expect(wrapper.prop("className").includes("row")).toBe(true);
  });
});
