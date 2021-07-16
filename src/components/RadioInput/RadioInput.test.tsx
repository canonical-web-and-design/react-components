import { mount } from "enzyme";

import RadioInput from "./RadioInput";

describe("RadioInput ", () => {
  it("renders a radio input", () => {
    const wrapper = mount(
      <RadioInput label="Test radio" name="Radio test"></RadioInput>
    );
    expect(wrapper.find("input.p-radio__input").length).toBe(1);
  });
});
