import { shallow } from "enzyme";

import SummaryButton from "./SummaryButton";

describe("<SummaryButton />", () => {
  // snapshot tests
  it("renders and matches the snapshot", () => {
    const component = shallow(
      <SummaryButton
        summary="Showing some items"
        label="Show more"
        onClick={() => false}
      />
    );

    expect(component).toMatchSnapshot();
  });

  // unit tests
  it("renders a spinner icon", () => {
    const component = shallow(
      <SummaryButton label="Show more" onClick={() => false} isLoading />
    );

    expect(component.find("ActionButton").first().prop("loading")).toBeTruthy();
  });

  it("can handle click events", () => {
    const onClick = jest.fn();
    const component = shallow(
      <SummaryButton label="Show more" onClick={onClick} />
    );

    component.find("ActionButton").first().simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});
