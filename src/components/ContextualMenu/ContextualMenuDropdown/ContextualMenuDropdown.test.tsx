import { mount } from "enzyme";
import merge from "deepmerge";

import ContextualMenuDropdown, {
  adjustForWindow,
} from "./ContextualMenuDropdown";

jest.useFakeTimers("modern");

describe("ContextualMenuDropdown ", () => {
  it("renders", () => {
    const wrapper = mount(<ContextualMenuDropdown links={["Link1"]} />);
    expect(wrapper.find("ContextualMenuDropdown")).toMatchSnapshot();
  });

  describe("adjustForWindow", () => {
    const generateFits = (overrides = {}) => {
      const fits = {
        fromTop: { fitsAbove: true, fitsBelow: true },
        fromBottom: { fitsAbove: true, fitsBelow: true },
        fromLeft: { fitsLeft: true, fitsRight: true },
        fromRight: { fitsLeft: true, fitsRight: true },
        fromCenter: {
          fitsLeft: true,
          fitsRight: true,
          fitsAbove: true,
          fitsBelow: true,
          fitsCentered: {
            fitsLeft: true,
            fitsRight: true,
            fitsAbove: true,
            fitsBelow: true,
          },
        },
      };
      return merge(fits, overrides);
    };

    it("doesn't change if it fits", () => {
      expect(adjustForWindow("left", generateFits())).toBe("left");
      expect(adjustForWindow("right", generateFits())).toBe("right");
    });

    it("handles left that doesn't fit left", () => {
      expect(
        adjustForWindow(
          "left",
          generateFits({
            fromLeft: { fitsRight: false },
          })
        )
      ).toBe("right");
    });

    it("handles right that doesn't fit right", () => {
      expect(
        adjustForWindow(
          "right",
          generateFits({
            fromRight: { fitsLeft: false },
          })
        )
      ).toBe("left");
    });

    it("handles center that doesn't fit left or right", () => {
      expect(
        adjustForWindow(
          "center",
          generateFits({
            fromCenter: { fitsCentered: { fitsLeft: false, fitsRight: false } },
            fromLeft: { fitsRight: false },
            fromRight: { fitsLeft: false },
          })
        )
      ).toBe("center");
    });

    it("handles center that doesn't fit left", () => {
      expect(
        adjustForWindow(
          "center",
          generateFits({
            fromCenter: { fitsCentered: { fitsLeft: false } },
            fromRight: { fitsLeft: false },
          })
        )
      ).toBe("left");
    });

    it("handles center that doesn't fit right", () => {
      expect(
        adjustForWindow(
          "center",
          generateFits({
            fromCenter: { fitsCentered: { fitsRight: false } },
            fromLeft: { fitsRight: false },
          })
        )
      ).toBe("right");
    });
  });
});
