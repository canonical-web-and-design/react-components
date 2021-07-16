import type { ChangeEventHandler, HTMLProps } from "react";

export type DropdownOptionProps = {
  /**
   * The label of the dropdown option.
   */
  label: string;
} & HTMLProps<HTMLOptionElement>;

export type CodeSnippetDropdownProps = {
  /**
   * Function for handling the select value changing.
   */
  onChange: ChangeEventHandler<HTMLSelectElement>;
  /**
   * Options to pass to the select.
   */
  options: DropdownOptionProps[];
} & HTMLProps<HTMLSelectElement>;

export default function CodeSnippetDropdown({
  options,
  onChange,
  ...props
}: CodeSnippetDropdownProps): JSX.Element {
  return (
    <select className="p-code-snippet__dropdown" onChange={onChange} {...props}>
      {options.map(({ label, value, ...props }) => (
        <option value={value} key={value + "" || label} {...props}>
          {label}
        </option>
      ))}
    </select>
  );
}
