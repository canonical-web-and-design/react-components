import { shallow } from "enzyme";

import Modal from "./Modal";

describe("Modal ", () => {
  it("renders", () => {
    const wrapper = shallow(
      <Modal close={jest.fn()} title="Confirm delete">
        Are you sure?
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("displays buttons that have been supplied", () => {
    const wrapper = shallow(
      <Modal
        buttonRow={[
          <button key={1}>Button 1</button>,
          <button key={2}>Button 2</button>,
        ]}
      >
        Button tester
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("displays any content in the button row", () => {
    const wrapper = shallow(
      <Modal buttonRow={<div>I am not a button</div>}>Button tester</Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("if no buttons are provided it does not render the button wrapper", () => {
    const wrapper = shallow(
      <Modal close={jest.fn()} title="Confirm delete">
        Are you sure?
      </Modal>
    );
    expect(wrapper.find(".p-modal__button-row")).toEqual({});
  });

  it("does not display a header if a title is not provided", () => {
    const wrapper = shallow(<Modal>Bare bones.</Modal>);
    expect(wrapper.find(".p-modal__header")).toEqual({});
  });

  it("does not display a close button if no close handler is provided", () => {
    const wrapper = shallow(<Modal title="some title">Bare bones.</Modal>);
    expect(wrapper.find(".p-modal__close")).toEqual({});
  });
});
