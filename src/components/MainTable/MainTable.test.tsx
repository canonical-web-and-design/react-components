import { mount, shallow } from "enzyme";

import MainTable from "./MainTable";
import type { MainTableHeader, MainTableRow } from "./MainTable";
import TableCell from "../TableCell";
import { compareJSX } from "../../testing/utils";

describe("MainTable", () => {
  let headers: MainTableHeader[];
  let rows: MainTableRow[];

  beforeEach(() => {
    headers = [
      { content: "Status" },
      { content: "Cores", className: "u-align--right" },
      { content: "RAM", className: "u-align--right" },
      { content: "Disks", className: "u-align--right" },
    ];
    rows = [
      {
        columns: [
          { content: "Ready", role: "rowheader" },
          { content: 1, className: "u-align--right" },
          { content: "1 GiB", className: "u-align--right" },
          { content: 2, className: "u-align--right" },
        ],
      },
      {
        columns: [
          { content: "Waiting", role: "rowheader" },
          { content: 1, className: "u-align--right" },
          { content: "1 GiB", className: "u-align--right" },
          { content: 2, className: "u-align--right" },
        ],
      },
      {
        columns: [
          { content: "Idle", role: "rowheader" },
          { content: 8, className: "u-align--right" },
          { content: "3.9 GiB", className: "u-align--right" },
          { content: 3, className: "u-align--right" },
        ],
      },
    ];
  });

  it("renders", () => {
    const wrapper = shallow(<MainTable headers={headers} rows={rows} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders rows with provided keys", () => {
    rows[0].key = 2;
    rows[1].key = 1;
    rows[2].key = 0; // we explicitly want to test 0 as a falsy value provided as a key

    const wrapper = shallow(<MainTable headers={headers} rows={rows} />);

    expect(wrapper.find("tbody TableRow").at(0).key()).toBe("2");
    expect(wrapper.find("tbody TableRow").at(1).key()).toBe("1");
    expect(wrapper.find("tbody TableRow").at(2).key()).toBe("0");
  });

  it("can be expanding", () => {
    rows.push({
      columns: [
        { content: "Expanding", role: "rowheader" },
        { content: 1, className: "u-align--right" },
        { content: "1.9 GiB", className: "u-align--right" },
        { content: 2, className: "u-align--right" },
      ],
      expanded: true,
      expandedContent: <div>Expand this</div>,
    });
    const wrapper = shallow(
      <MainTable expanding={true} headers={headers} rows={rows} />
    );
    expect(wrapper.find("Table").prop("expanding")).toBe(true);
    const heads = wrapper.find("TableHeader");
    // There should be an additional hidden table header to account for the
    // expanding cell
    expect(heads.length).toEqual(headers.length + 1);
    expect(heads.last().prop("aria-hidden")).toBe("true");
    const columns = wrapper.find("TableRow").last().find("TableCell");
    // There should be an additional table cell for the expanding content.
    expect(columns.length).toEqual(rows[rows.length - 1].columns.length + 1);
    compareJSX(
      columns.last(),
      <TableCell expanding={true} hidden={false}>
        <div>Expand this</div>
      </TableCell>
    );
  });

  it("can be responsive", () => {
    const wrapper = shallow(
      <MainTable headers={headers} responsive={true} rows={rows} />
    );
    expect(wrapper.find("Table").prop("responsive")).toBe(true);
  });

  it("can be paginated", () => {
    const wrapper = shallow(<MainTable paginate={2} rows={rows} />);
    expect(wrapper.find("Pagination").exists()).toBe(true);
    expect(wrapper.find("TableRow").length).toBe(2);
  });

  it("can change the page", () => {
    const wrapper = shallow(<MainTable paginate={2} rows={rows} />);
    wrapper.find("Pagination").props().paginate(2);
    wrapper.update();
    const rowItems = wrapper.find("TableRow");
    expect(rowItems.length).toEqual(1);
    expect(rowItems.at(0).find("TableCell").first().children().text()).toEqual(
      "Idle"
    );
  });

  describe("sorting", () => {
    beforeEach(() => {
      headers[0].sortKey = "status";
      headers[1].sortKey = "cores";
      headers[2].sortKey = "ram";
      rows[0].sortData = {
        status: "ready",
        cores: 2,
        ram: 1,
      };
      rows[1].sortData = {
        status: "waiting",
        cores: 1,
        ram: 1,
      };
      rows[2].sortData = {
        status: "idle",
        cores: 8,
        ram: 3.9,
      };
    });

    it("can be sortable", () => {
      const wrapper = shallow(
        <MainTable headers={headers} rows={rows} sortable={true} />
      );
      // Sortable headers should have the sort prop set.
      expect(wrapper.find("TableHeader").first().prop("sort")).toEqual("none");
      // non-sortable headers should not have the sort prop set.
      expect(wrapper.find("TableHeader").last().prop("sort")).toEqual(
        undefined
      );
    });

    it("can sort when clicking on a header", () => {
      const wrapper = shallow(
        <MainTable headers={headers} rows={rows} sortable={true} />
      );
      let rowItems = wrapper.find("tbody TableRow");
      // Check the initial status order.
      expect(
        rowItems.at(0).find("TableCell").first().children().text()
      ).toEqual("Ready");
      expect(
        rowItems.at(1).find("TableCell").first().children().text()
      ).toEqual("Waiting");
      expect(
        rowItems.at(2).find("TableCell").first().children().text()
      ).toEqual("Idle");
      wrapper.find("TableHeader").first().simulate("click");
      wrapper.update();
      rowItems = wrapper.find("tbody TableRow");
      // The status should now be ascending.
      expect(
        rowItems.at(0).find("TableCell").first().children().text()
      ).toEqual("Idle");
      expect(
        rowItems.at(1).find("TableCell").first().children().text()
      ).toEqual("Ready");
      expect(
        rowItems.at(2).find("TableCell").first().children().text()
      ).toEqual("Waiting");
      wrapper.find("TableHeader").first().simulate("click");
      wrapper.update();
      rowItems = wrapper.find("tbody TableRow");
      // The status should now be descending.
      expect(
        rowItems.at(0).find("TableCell").first().children().text()
      ).toEqual("Waiting");
      expect(
        rowItems.at(1).find("TableCell").first().children().text()
      ).toEqual("Ready");
      expect(
        rowItems.at(2).find("TableCell").first().children().text()
      ).toEqual("Idle");
      wrapper.find("TableHeader").first().simulate("click");
      wrapper.update();
      rowItems = wrapper.find("tbody TableRow");
      // The status be back to the original order.
      expect(
        rowItems.at(0).find("TableCell").first().children().text()
      ).toEqual("Ready");
      expect(
        rowItems.at(1).find("TableCell").first().children().text()
      ).toEqual("Waiting");
      expect(
        rowItems.at(2).find("TableCell").first().children().text()
      ).toEqual("Idle");
    });

    it("can set a default sort", () => {
      const wrapper = shallow(
        <MainTable
          defaultSort="status"
          defaultSortDirection="descending"
          headers={headers}
          rows={rows}
          sortable={true}
        />
      );
      expect(wrapper.find("TableHeader").first().prop("sort")).toEqual(
        "descending"
      );
    });

    it("updates sort when props change", () => {
      const wrapper = mount(
        <MainTable
          defaultSort="status"
          defaultSortDirection="descending"
          headers={headers}
          rows={rows}
          sortable={true}
        />
      );
      let heads = wrapper.find("TableHeader");
      expect(heads.first().prop("sort")).toEqual("descending");
      expect(heads.at(1).prop("sort")).toEqual("none");
      wrapper.setProps({
        defaultSort: "cores",
        defaultSortDirection: "ascending",
      });
      wrapper.update();
      heads = wrapper.find("TableHeader");
      expect(heads.first().prop("sort")).toEqual("none");
      expect(heads.at(1).prop("sort")).toEqual("ascending");
    });
  });
});
