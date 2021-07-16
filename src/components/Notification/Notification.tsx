import classNames from "classnames";
import { useEffect, useRef } from "react";
import type { HTMLProps, ReactNode } from "react";

import Button, { ButtonAppearance } from "../Button";
import { IS_DEV } from "../../utils";

import type { ValueOf } from "types";

export const NotificationSeverity = {
  CAUTION: "caution",
  INFORMATION: "information",
  NEGATIVE: "negative",
  POSITIVE: "positive",
} as const;

type NotificationAction = {
  label: string;
  onClick: () => void;
};

/**
 * The props for the Notification component.
 */
export type Props = {
  /**
   * A list of up to two actions that the notification can perform.
   */
  actions?: readonly [NotificationAction?, NotificationAction?];
  /**
   * Whether the notification should not have a border.
   */
  borderless?: boolean;
  /**
   * The notification message content.
   */
  children?: ReactNode;
  /**
   * Optional class(es) to apply to the parent notification element.
   */
  className?: string;
  /**
   * **Deprecated**. Use `onDismiss` instead.
   */
  close?: never;
  /**
   * Whether the title should display inline with the message.
   */
  inline?: boolean;
  /**
   * The function to run when dismissing/closing the notification.
   */
  onDismiss?: () => void;
  /**
   * The severity of the notification.
   */
  severity?: ValueOf<typeof NotificationSeverity>;
  /**
   * **Deprecated**. Use `title` instead.
   */
  status?: never;
  /**
   * The amount of time (in ms) until the notification is automatically dismissed.
   */
  timeout?: number;
  /**
   * A relevant timestamp for the notification, e.g. when it was created.
   */
  timestamp?: ReactNode;
  /**
   * The title of the notification.
   */
  title?: ReactNode;
  /**
   * **Deprecated**. Use `severity` instead.
   */
  type?: never;
} & HTMLProps<HTMLDivElement>;

const Notification = ({
  actions,
  borderless = false,
  children,
  className,
  close,
  inline = false,
  onDismiss,
  severity = NotificationSeverity.INFORMATION,
  status,
  timeout,
  timestamp,
  title,
  type,
  ...props
}: Props): JSX.Element => {
  const timeoutId = useRef(null);
  const hasActions = actions?.length;
  const showMeta = timestamp || hasActions;

  useEffect(() => {
    if (timeout && onDismiss) {
      timeoutId.current = setTimeout(() => onDismiss(), timeout);
    }
    return () => clearTimeout(timeoutId.current);
  }, [onDismiss, timeout]);

  if (IS_DEV && (close || status || type)) {
    console.warn(
      "The Notification component is using deprecated props. Refer to the deprecated list for details: https://canonical-web-and-design.github.io/react-components/?path=/docs/notification--information#deprecated"
    );
  }

  return (
    <div
      className={classNames(className, {
        [`p-notification--${severity}`]: !!severity,
        "p-notification": !severity,
        "is-borderless": borderless,
        "is-inline": inline,
      })}
      {...props}
    >
      <div className="p-notification__content">
        {title && (
          <h5 className="p-notification__title" data-test="notification-title">
            {title}
          </h5>
        )}
        {inline && <>&ensp;</>}
        <p className="p-notification__message">{children}</p>
        {onDismiss && (
          <button
            aria-label="Close notification"
            className="p-notification__close"
            data-test="notification-close-button"
            onClick={onDismiss}
          >
            Close
          </button>
        )}
      </div>
      {showMeta && (
        <div className="p-notification__meta" data-test="notification-meta">
          {timestamp && (
            <span
              className="p-notification__timestamp"
              data-test="notification-timestamp"
            >
              {timestamp}
            </span>
          )}
          {hasActions ? (
            <div className="p-notification__actions">
              {actions.map((action, i) => (
                <Button
                  appearance={ButtonAppearance.LINK}
                  className="p-notification__action"
                  data-test="notification-action"
                  key={`${action.label}-${i}`}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Notification;
