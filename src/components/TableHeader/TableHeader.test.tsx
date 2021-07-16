import { shallow } from "enzyme";

import TableHeader from "./TableHeader";

describe("TableHeader", () => {
  it("renders", () => {
    const wrapper = shallow(
      <TableHeader>
        <tr></tr>
      </TableHeader>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("can set a sort", () => {
    const wrapper = shallow(
      <TableHeader sort="ascending">
        <tr></tr>
      </TableHeader>
    );
    expect(wrapper.prop("aria-sort")).toEqual("ascending");
  });
});
