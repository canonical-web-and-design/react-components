import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import ActionButton, {
  LOADER_MIN_DURATION,
  SUCCESS_DURATION,
} from "./ActionButton";

describe("ActionButton", () => {
  jest.useFakeTimers("modern");

  it("matches loading snapshot", () => {
    const wrapper = mount(<ActionButton loading>Click me</ActionButton>);
    expect(wrapper).toMatchSnapshot();
  });

  it("matches success snapshot", () => {
    const wrapper = mount(<ActionButton loading>Click me</ActionButton>);
    act(() => {
      wrapper.setProps({ loading: false, success: true });
      jest.advanceTimersByTime(LOADER_MIN_DURATION + 1);
      wrapper.update();
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("shows a loader icon for the correct amount of time", () => {
    const wrapper = mount(<ActionButton loading>Click me</ActionButton>);

    act(() => {
      wrapper.setProps({ loading: false, success: true });
      jest.advanceTimersByTime(LOADER_MIN_DURATION);
      wrapper.update();
    });
    expect(wrapper.find(".p-icon--spinner").exists()).toBe(true);

    act(() => {
      jest.advanceTimersByTime(1);
      wrapper.update();
    });
    expect(wrapper.find(".p-icon--spinner").exists()).toBe(false);
  });

  it("shows a loader icon for the correct amount of time", () => {
    const wrapper = mount(<ActionButton loading>Click me</ActionButton>);

    act(() => {
      wrapper.setProps({ loading: false, success: true });
      jest.advanceTimersByTime(LOADER_MIN_DURATION + 1);
      wrapper.update();
    });
    expect(wrapper.find(".p-icon--success").exists()).toBe(true);

    act(() => {
      jest.advanceTimersByTime(SUCCESS_DURATION + 1);
      wrapper.update();
    });
    expect(wrapper.find(".p-icon--success").exists()).toBe(false);
  });
});
