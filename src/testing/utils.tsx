import { shallow } from "enzyme";
import type { ShallowWrapper } from "enzyme";

/**
 * Assert that some JSX from Enzyme is equal to some provided JSX.
 * @param {Object} actual - Some JSX from Enzyme.
 * @param {Object} expected - Some JSX provided in the test.
 */
export const compareJSX = (
  actual: ShallowWrapper,
  expected: JSX.Element
): void => {
  const actualOutput = actual.debug();
  // If the very first child of a component is another component then this
  // will render that components markup, but we want to shallow render it.
  // By wrapping the expected JSX in a div we stop enzyme from rendering the
  // supplied component and then we compare against the actual output.
  const expectedOutput = shallow(<div>{expected}</div>)
    .children()
    .debug();
  expect(actualOutput).toBe(expectedOutput);
};
