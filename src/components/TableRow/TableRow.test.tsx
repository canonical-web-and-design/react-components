import { shallow } from "enzyme";

import TableRow from "./TableRow";

describe("TableRow", () => {
  it("renders", () => {
    const wrapper = shallow(
      <TableRow>
        <td></td>
      </TableRow>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
