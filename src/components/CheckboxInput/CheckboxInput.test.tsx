import { mount } from "enzyme";

import CheckboxInput from "./CheckboxInput";

describe("CheckboxInput ", () => {
  it("renders a checkbox", () => {
    const wrapper = mount(
      <CheckboxInput label="Test checkbox"></CheckboxInput>
    );
    expect(wrapper.find("input.p-checkbox__input").length).toBe(1);
  });
});
