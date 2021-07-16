import { mount, shallow } from "enzyme";
import merge from "deepmerge";

import Tooltip, { adjustForWindow } from "./Tooltip";

describe("<Tooltip />", () => {
  const body = document.querySelector("body");
  const app = document.createElement("div");
  app.setAttribute("id", "app");
  body.appendChild(app);

  // snapshot tests
  it("renders and matches the snapshot", () => {
    const component = shallow(<Tooltip message="text">Child</Tooltip>);
    expect(component).toMatchSnapshot();
  });

  // unit tests
  it("does not show tooltip message by default", () => {
    const component = mount(<Tooltip message="text">Child</Tooltip>);
    expect(component.exists("[data-test='tooltip-portal']")).toEqual(false);
  });

  it("renders tooltip message when focused", () => {
    const component = mount(<Tooltip message="text">Child</Tooltip>);
    component.simulate("focus");
    expect(component.find("[data-test='tooltip-portal']").text()).toEqual(
      "text"
    );
  });

  it("gives the correct class name to the tooltip", () => {
    const component = mount(
      <Tooltip message="text" position="right">
        Child
      </Tooltip>
    );
    component.simulate("focus");
    expect(component.exists(".p-tooltip--right")).toEqual(true);
  });

  it("updates the tooltip to fit on the screen", () => {
    const wrapper = mount(
      <Tooltip
        message="text that is too long to fit on the screen"
        position="right"
      >
        Child
      </Tooltip>
    );
    global.innerWidth = 20;
    wrapper.simulate("mouseover");
    expect(wrapper.find("[data-test='tooltip-portal']").prop("className")).toBe(
      "p-tooltip--btm-left is-detached"
    );
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
      expect(adjustForWindow("btm-left", generateFits())).toBe("btm-left");
      expect(adjustForWindow("btm-center", generateFits())).toBe("btm-center");
      expect(adjustForWindow("btm-right", generateFits())).toBe("btm-right");
      expect(adjustForWindow("right", generateFits())).toBe("right");
      expect(adjustForWindow("top-right", generateFits())).toBe("top-right");
      expect(adjustForWindow("top-center", generateFits())).toBe("top-center");
      expect(adjustForWindow("top-left", generateFits())).toBe("top-left");
    });

    it("handles left that doesn't fit left", () => {
      expect(
        adjustForWindow(
          "left",
          generateFits({
            fromLeft: { fitsLeft: false },
          })
        )
      ).toBe("top-right");
    });

    it("handles left that doesn't fit left and top", () => {
      expect(
        adjustForWindow(
          "left",
          generateFits({
            fromTop: { fitsAbove: false },
            fromLeft: { fitsLeft: false },
          })
        )
      ).toBe("btm-right");
    });

    it("handles btm-left that doesn't fit right from right edge", () => {
      expect(
        adjustForWindow(
          "btm-left",
          generateFits({
            fromRight: { fitsRight: false },
          })
        )
      ).toBe("btm-left");
    });

    it("handles btm-left that doesn't fit right from left edge", () => {
      expect(
        adjustForWindow(
          "btm-left",
          generateFits({
            fromLeft: { fitsRight: false },
            fromRight: { fitsRight: false },
          })
        )
      ).toBe("btm-right");
    });

    it("handles btm-left that doesn't fit bottom", () => {
      expect(
        adjustForWindow(
          "btm-left",
          generateFits({
            fromBottom: { fitsBelow: false },
          })
        )
      ).toBe("top-left");
    });

    it("handles btm-left that doesn't fit right and bottom", () => {
      expect(
        adjustForWindow(
          "btm-left",
          generateFits({
            fromBottom: { fitsBelow: false },
            fromLeft: { fitsRight: false },
          })
        )
      ).toBe("top-right");
    });

    it("handles btm-right that doesn't fit left from left edge", () => {
      expect(
        adjustForWindow(
          "btm-right",
          generateFits({
            fromLeft: { fitsLeft: false },
          })
        )
      ).toBe("btm-right");
    });

    it("handles btm-right that doesn't fit left from left edge", () => {
      expect(
        adjustForWindow(
          "btm-right",
          generateFits({
            fromLeft: { fitsLeft: false },
            fromRight: { fitsLeft: false },
          })
        )
      ).toBe("btm-left");
    });

    it("handles btm-right that doesn't fit bottom", () => {
      expect(
        adjustForWindow(
          "btm-right",
          generateFits({
            fromBottom: { fitsBelow: false },
          })
        )
      ).toBe("top-right");
    });

    it("handles btm-right that doesn't fit left and bottom", () => {
      expect(
        adjustForWindow(
          "btm-right",
          generateFits({
            fromBottom: { fitsBelow: false },
            fromRight: { fitsLeft: false },
          })
        )
      ).toBe("top-left");
    });

    it("handles right that doesn't fit right", () => {
      expect(
        adjustForWindow(
          "right",
          generateFits({
            fromRight: { fitsRight: false },
          })
        )
      ).toBe("top-left");
    });

    it("handles right that doesn't fit right and top", () => {
      expect(
        adjustForWindow(
          "right",
          generateFits({
            fromTop: { fitsAbove: false },
            fromRight: { fitsRight: false },
          })
        )
      ).toBe("btm-left");
    });

    it("handles top-left that doesn't fit right from right edge", () => {
      expect(
        adjustForWindow(
          "top-left",
          generateFits({
            fromRight: { fitsRight: false },
          })
        )
      ).toBe("top-left");
    });

    it("handles top-left that doesn't fit right from left edge", () => {
      expect(
        adjustForWindow(
          "top-left",
          generateFits({
            fromLeft: { fitsRight: false },
            fromRight: { fitsRight: false },
          })
        )
      ).toBe("top-right");
    });

    it("handles top-left that doesn't fit top", () => {
      expect(
        adjustForWindow(
          "top-left",
          generateFits({
            fromTop: { fitsAbove: false },
          })
        )
      ).toBe("btm-left");
    });

    it("handles top-left that doesn't fit right and top", () => {
      expect(
        adjustForWindow(
          "top-left",
          generateFits({
            fromTop: { fitsAbove: false },
            fromLeft: { fitsRight: false },
          })
        )
      ).toBe("btm-right");
    });

    it("handles top-right that doesn't fit left from left edge", () => {
      expect(
        adjustForWindow(
          "top-right",
          generateFits({
            fromLeft: { fitsLeft: false },
          })
        )
      ).toBe("top-right");
    });

    it("handles top-right that doesn't fit left from right edge", () => {
      expect(
        adjustForWindow(
          "top-right",
          generateFits({
            fromLeft: { fitsLeft: false },
            fromRight: { fitsLeft: false },
          })
        )
      ).toBe("top-left");
    });

    it("handles top-right that doesn't fit top", () => {
      expect(
        adjustForWindow(
          "top-right",
          generateFits({
            fromTop: { fitsAbove: false },
          })
        )
      ).toBe("btm-right");
    });

    it("handles top-right that doesn't fit left and top", () => {
      expect(
        adjustForWindow(
          "top-right",
          generateFits({
            fromTop: { fitsAbove: false },
            fromRight: { fitsLeft: false },
          })
        )
      ).toBe("btm-left");
    });

    it("handles top-right that doesn't fit left or right", () => {
      expect(
        adjustForWindow(
          "top-right",
          generateFits({
            fromLeft: { fitsLeft: false, fitsRight: false },
            fromRight: { fitsLeft: false, fitsRight: false },
          })
        )
      ).toBe("top-center");
    });

    it("handles top-left that doesn't fit left or right", () => {
      expect(
        adjustForWindow(
          "top-left",
          generateFits({
            fromLeft: { fitsLeft: false, fitsRight: false },
            fromRight: { fitsLeft: false, fitsRight: false },
          })
        )
      ).toBe("top-center");
    });

    it("handles top-center that doesn't fit left or right", () => {
      expect(
        adjustForWindow(
          "top-center",
          generateFits({
            fromCenter: { fitsCentered: { fitsLeft: false, fitsRight: false } },
          })
        )
      ).toBe("top-center");
      // top-center
    });

    it("handles top-center that doesn't fit left", () => {
      expect(
        adjustForWindow(
          "top-center",
          generateFits({
            fromCenter: { fitsCentered: { fitsLeft: false } },
          })
        )
      ).toBe("top-left");
    });

    it("handles top-center that doesn't fit right", () => {
      expect(
        adjustForWindow(
          "top-center",
          generateFits({
            fromCenter: { fitsCentered: { fitsRight: false } },
          })
        )
      ).toBe("top-right");
    });

    it("handles btm-right that doesn't fit left or right", () => {
      expect(
        adjustForWindow(
          "btm-right",
          generateFits({
            fromLeft: { fitsLeft: false, fitsRight: false },
            fromRight: { fitsLeft: false, fitsRight: false },
          })
        )
      ).toBe("btm-center");
    });

    it("handles btm-left that doesn't fit left or right", () => {
      expect(
        adjustForWindow(
          "btm-left",
          generateFits({
            fromLeft: { fitsLeft: false, fitsRight: false },
            fromRight: { fitsLeft: false, fitsRight: false },
          })
        )
      ).toBe("btm-center");
    });

    it("handles btm-center that doesn't fit left or right", () => {
      expect(
        adjustForWindow(
          "btm-center",
          generateFits({
            fromCenter: { fitsCentered: { fitsLeft: false, fitsRight: false } },
          })
        )
      ).toBe("btm-center");
    });

    it("handles btm-center that doesn't fit left", () => {
      expect(
        adjustForWindow(
          "btm-center",
          generateFits({
            fromCenter: { fitsCentered: { fitsLeft: false } },
          })
        )
      ).toBe("btm-left");
    });

    it("handles btm-center that doesn't fit right", () => {
      expect(
        adjustForWindow(
          "btm-center",
          generateFits({
            fromCenter: { fitsCentered: { fitsRight: false } },
          })
        )
      ).toBe("btm-right");
    });
  });
});
