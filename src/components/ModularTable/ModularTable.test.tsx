import { shallow } from "enzyme";

import ModularTable from "./ModularTable";

describe("ModularTable", () => {
  let columns, data;

  beforeEach(() => {
    columns = [
      { Header: "Status" },
      { Header: "Cores", className: "u-align--right" },
      { Header: "RAM", className: "u-align--right" },
      { Header: "Disks", className: "u-align--right" },
    ];
    data = [
      {
        status: "Ready",
        cores: 1,
        ram: "1 GiB",
        disks: 2,
      },
      {
        status: "Waiting",
        cores: 1,
        ram: "1 GiB",
        disks: 2,
      },
      {
        status: "Idle",
        cores: 8,
        ram: "3.9 GiB",
        disks: 3,
      },
    ];
  });

  it("renders all rows and columns", () => {
    const wrapper = shallow(<ModularTable columns={columns} data={data} />);

    const rowItems = wrapper.find("tbody TableRow");
    expect(rowItems.length).toEqual(3);
    expect(rowItems.at(0).find("TableCell").length).toEqual(4);
  });

  it("renders no rows when data is empty", () => {
    const wrapper = shallow(<ModularTable columns={columns} data={[]} />);

    const rowItems = wrapper.find("tbody TableRow");
    expect(rowItems.length).toEqual(0);
  });

  it("renders empty message when data is empty", () => {
    const wrapper = shallow(
      <ModularTable columns={columns} data={[]} emptyMsg="Nothing here" />
    );

    const rowItems = wrapper.find("tbody TableRow");
    expect(rowItems.length).toEqual(1);
    expect(rowItems.at(0).find("TableCell").first().children().text()).toEqual(
      "Nothing here"
    );
  });

  it("renders a row with footer content", () => {
    const wrapper = shallow(
      <ModularTable columns={columns} data={data} footer="This is a footer" />
    );

    const rowItems = wrapper.find("tbody TableRow");
    expect(rowItems.length).toEqual(4);
    expect(rowItems.last().find("TableCell").first().children().text()).toEqual(
      "This is a footer"
    );
  });
});
