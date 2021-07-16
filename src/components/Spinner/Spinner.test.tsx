import { shallow } from "enzyme";

import Spinner from "./Spinner";

describe("<Spinner />", () => {
  // snapshot tests
  it("renders and matches the snapshot", () => {
    const component = shallow(<Spinner />);

    expect(component).toMatchSnapshot();
  });

  it("renders and matches the snapshot with text", () => {
    const component = shallow(<Spinner text="foo" />);

    expect(component).toMatchSnapshot();
  });

  // unit tests
  it("renders a spinner icon", () => {
    const component = shallow(<Spinner />);

    expect(
      component.find("i").first().hasClass("p-icon--spinner")
    ).toBeTruthy();
  });

  it("renders text correctly if given text prop", () => {
    const text = "Loading...";
    const component = shallow(<Spinner text={text} />);

    expect(component.find("span").first().text()).toContain(text);
  });

  it("renders a light spinner if given isLight prop", () => {
    const component = shallow(<Spinner isLight />);

    expect(component.find("i").first().hasClass("is-light")).toEqual(true);
  });
});
