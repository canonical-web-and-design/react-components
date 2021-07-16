import CodeSnippet, { CodeSnippetBlockAppearance } from "../CodeSnippet";
import { IS_DEV } from "../../utils";

export type Props = {
  children: string;
  className?: string;
  inline?: boolean;
  copyable?: boolean;
  numbered?: boolean;
};

/**
 * @deprecated Code component is deprecated. Use CodeSnippet component or inline `<code>` instead.
 */
const Code = ({
  children,
  className,
  inline,
  copyable,
  numbered,
  ...props
}: Props): JSX.Element => {
  if (IS_DEV) {
    console.warn(
      "Code component is deprecated. Use CodeSnippet component or inline `<code>` instead."
    );
  }
  if (inline) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  } else {
    let appearance = null;

    if (numbered) {
      appearance = CodeSnippetBlockAppearance.NUMBERED;
    } else if (copyable) {
      appearance = CodeSnippetBlockAppearance.LINUX_PROMPT;
    }
    return (
      <CodeSnippet
        blocks={[
          {
            appearance,
            code: children,
          },
        ]}
      />
    );
  }
};

export default Code;
