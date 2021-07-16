import { mount, shallow } from "enzyme";

import Notification, { NotificationSeverity } from "./Notification";

describe("Notification", () => {
  beforeEach(() => {
    jest.useFakeTimers("modern");
  });

  it("renders", () => {
    const wrapper = shallow(
      <Notification
        severity={NotificationSeverity.INFORMATION}
        title="Permissions changed"
      >
        Anyone with access can view your invited users.
      </Notification>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    const wrapper = shallow(<Notification className="extra-class" />);
    const className = wrapper.prop("className");
    expect(className.includes("extra-class")).toBe(true);
  });

  it("can be given a title", () => {
    const wrapper = shallow(<Notification />);
    expect(wrapper.find("[data-test='notification-title']").exists()).toBe(
      false
    );

    wrapper.setProps({ title: "Title" });
    expect(wrapper.find("[data-test='notification-title']").exists()).toBe(
      true
    );
  });

  it("can be made inline", () => {
    const wrapper = shallow(<Notification />);
    expect(wrapper.prop("className").includes("is-inline")).toBe(false);

    wrapper.setProps({ inline: true });
    expect(wrapper.prop("className").includes("is-inline")).toBe(true);
  });

  it("can have a borderless appearance", () => {
    const wrapper = shallow(<Notification />);
    expect(wrapper.prop("className").includes("is-borderless")).toBe(false);

    wrapper.setProps({ borderless: true });
    expect(wrapper.prop("className").includes("is-borderless")).toBe(true);
  });

  it("can be made dismissible", () => {
    const onDismiss = jest.fn();
    const wrapper = shallow(<Notification />);
    expect(
      wrapper.find("[data-test='notification-close-button']").exists()
    ).toBe(false);

    wrapper.setProps({ onDismiss });
    expect(
      wrapper.find("[data-test='notification-close-button']").exists()
    ).toBe(true);

    wrapper.find("[data-test='notification-close-button']").simulate("click");
    expect(onDismiss).toHaveBeenCalled();
  });

  it("can be given a timestamp", () => {
    const wrapper = shallow(<Notification />);
    expect(wrapper.find("[data-test='notification-meta']").exists()).toBe(
      false
    );
    expect(wrapper.find("[data-test='notification-timestamp']").exists()).toBe(
      false
    );

    wrapper.setProps({ timestamp: "1h ago" });
    expect(wrapper.find("[data-test='notification-meta']").exists()).toBe(true);
    expect(wrapper.find("[data-test='notification-timestamp']").exists()).toBe(
      true
    );
  });

  it("can be given actions", () => {
    const onActionClick = jest.fn();
    const wrapper = shallow(<Notification />);
    expect(wrapper.find("[data-test='notification-meta']").exists()).toBe(
      false
    );
    expect(wrapper.find("[data-test='notification-action']").exists()).toBe(
      false
    );

    wrapper.setProps({
      actions: [{ label: "Action", onClick: onActionClick }],
    });
    expect(wrapper.find("[data-test='notification-meta']").exists()).toBe(true);
    expect(wrapper.find("[data-test='notification-action']").exists()).toBe(
      true
    );

    wrapper.find("[data-test='notification-action']").simulate("click");
    expect(onActionClick).toHaveBeenCalled();
  });

  it("can automatically dismiss the notification after a given timeout period", () => {
    const onDismiss = jest.fn();
    const timeout = 1000;
    mount(<Notification onDismiss={onDismiss} timeout={timeout} />);
    expect(onDismiss).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout + 1);
    expect(onDismiss).toHaveBeenCalled();
  });
});
