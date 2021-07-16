import { shallow } from "enzyme";

import Slider from "./Slider";

describe("Slider", () => {
  it("can render without an additional number input", () => {
    const wrapper = shallow(
      <Slider
        max={10}
        min={0}
        onChange={jest.fn()}
        showInput={false}
        value={5}
      />
    );
    expect(wrapper.find("input[type='number']").exists()).toBe(false);
  });

  it("can render with an additional number input", () => {
    const wrapper = shallow(
      <Slider max={10} min={0} onChange={jest.fn()} showInput value={5} />
    );
    expect(wrapper.find("input[type='number']").exists()).toBe(true);
  });
});
