import classNames from "classnames";
import type { HTMLAttributes, ReactNode } from "react";
import { isValidElement } from "react";

import type { Headings } from "../../types";

export type ListItem =
  | ReactNode
  | ({
      content: ReactNode;
    } & HTMLAttributes<HTMLLIElement>);

export type SteppedListItem = {
  content: ReactNode;
  title: ReactNode;
  titleElement?: Headings;
} & HTMLAttributes<HTMLLIElement>;

export type BaseProps = {
  /**
   * Optional class(es) to pass to the wrapping element.
   */
  className?: string;
  /**
   * The list's items.
   */
  items: ListItem[];
};

export type DefaultListProps = BaseProps & {
  detailed?: false;
  divided?: boolean;
  inline?: false;
  isDark?: false;
  middot?: false;
  split?: boolean;
  stepped?: false;
  stretch?: false;
  ticked?: boolean;
};

export type BaseInlineProps = BaseProps & {
  detailed?: false;
  divided?: false;
  isDark?: boolean;
  split?: false;
  stepped?: false;
  ticked?: false;
};

export type InlineListProps = BaseInlineProps & {
  inline: true;
  middot?: boolean;
  stretch?: boolean;
};

export type MiddotListProps = BaseInlineProps & {
  inline?: boolean;
  middot: true;
  stretch?: false;
};

export type StretchListProps = BaseInlineProps & {
  inline?: boolean;
  middot?: false;
  stretch: true;
};

export type SteppedListProps = Exclude<BaseProps, "items"> & {
  detailed?: boolean;
  divided?: false;
  inline?: false;
  isDark?: false;
  items: SteppedListItem[];
  middot?: false;
  split?: false;
  stepped: true;
  stretch?: false;
  ticked?: false;
} & HTMLAttributes<HTMLOListElement>;

export type Props =
  | ((DefaultListProps | InlineListProps | MiddotListProps | StretchListProps) &
      HTMLAttributes<HTMLUListElement>)
  | SteppedListProps;

const generateItems = (
  items: ListItem[],
  ticked: boolean,
  inline: boolean,
  stepped: boolean
) =>
  items.map((item, i) => {
    let body: ReactNode;
    let title: ReactNode;
    let className: string;
    let content: ReactNode;
    let TitleComponent: Headings = "h3";
    let liProps: HTMLAttributes<HTMLLIElement>;
    if (
      isValidElement(item) ||
      typeof item === "string" ||
      typeof item === "number"
    ) {
      content = item;
    } else if (item && typeof item === "object" && "content" in item) {
      if ("titleElement" in item) {
        ({
          title,
          className,
          content,
          titleElement: TitleComponent = "h3",
          ...liProps
        } = item);
      } else {
        ({ title, className, content, ...liProps } = item);
      }
    }
    if (stepped) {
      body = (
        <>
          <TitleComponent className="p-stepped-list__title">
            {title}
          </TitleComponent>
          <p className="p-stepped-list__content">{content}</p>
        </>
      );
    } else {
      body = content;
    }
    return (
      <li
        className={classNames(className, {
          "p-list__item": !inline && !stepped,
          "p-inline-list__item": inline,
          "p-stepped-list__item": stepped,
          "is-ticked": ticked,
        })}
        key={i}
        {...liProps}
      >
        {body}
      </li>
    );
  });

const List = ({
  className,
  detailed,
  divided,
  inline,
  isDark,
  items,
  middot,
  stretch,
  split,
  stepped,
  ticked,
  ...props
}: Props): JSX.Element => {
  const Component = stepped ? "ol" : "ul";
  return (
    <Component
      className={classNames(className, {
        "p-list": !divided && !inline && !middot && !stretch && !stepped,
        "p-list--divided": divided,
        "p-inline-list": inline,
        "p-inline-list--middot": middot,
        "p-inline-list--stretch": stretch,
        "p-stepped-list": stepped && !detailed,
        "p-stepped-list--detailed": stepped && detailed,
        "is-dark": isDark,
        "is-split": split,
      })}
      {...props}
    >
      {generateItems(items, ticked, inline || middot || stretch, stepped)}
    </Component>
  );
};

export default List;
