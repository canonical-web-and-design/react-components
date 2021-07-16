import { shallow } from "enzyme";

import ArticlePagination from "./ArticlePagination";

describe("ArticlePagination ", () => {
  it("renders", () => {
    const wrapper = shallow(
      <ArticlePagination
        nextLabel="Consectetur adipisicing elit"
        nextURL="#next"
        previousLabel="Lorem ipsum dolor sit amet"
        previousURL="#previous"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    const wrapper = shallow(<ArticlePagination className="extra-class" />);
    const className = wrapper.prop("className");
    expect(className.includes("p-article-pagination")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });
});
