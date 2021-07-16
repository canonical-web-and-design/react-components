import classNames from "classnames";
import type { HTMLProps, FormEvent } from "react";
import { forwardRef, createRef } from "react";

import Icon from "../Icon";

export type Props = {
  /**
   * Whether autocomplete should be enabled for the search input.
   */
  autocomplete?: "on" | "off";
  /**
   * Optional classes to pass to the form element.
   */
  className?: string;
  /**
   * Whether the input and buttons should be disabled.
   */
  disabled?: boolean;
  /**
   * Whether the input value will be controlled via external state.
   */
  externallyControlled?: boolean;
  /**
   * A function that will be called when the input value changes.
   */
  onChange?: (inputValue: string) => void;
  /**
   * A function that will be called when the form is submitted.
   */
  onSubmit?: (evt: FormEvent) => void;
  /**
   * A search input placeholder message.
   */
  placeholder?: string;
  /**
   * The value of the search input when the state is externally controlled.
   */
  value?: string;
} & HTMLProps<HTMLFormElement>;

const SearchBox = forwardRef<HTMLFormElement, Props>(
  (
    {
      autocomplete = "on",
      className,
      disabled,
      externallyControlled,
      onChange,
      onSubmit,
      placeholder = "Search",
      value,
      ...props
    }: Props,
    ref
  ) => {
    const input = createRef<HTMLInputElement | null>();
    const resetInput = () => {
      onChange && onChange("");
      if (input.current) {
        input.current.value = "";
      }
    };
    const submit = (e) => {
      e.preventDefault();
      onSubmit && onSubmit(e);
    };
    return (
      <form
        className={classNames("p-search-box", className)}
        onSubmit={submit}
        {...props}
        ref={ref}
      >
        <label className="u-off-screen" htmlFor="search">
          {placeholder || "Search"}
        </label>
        <input
          autoComplete={autocomplete}
          className="p-search-box__input"
          disabled={disabled}
          id="search"
          name="search"
          onChange={(evt) => onChange(evt.target.value)}
          placeholder={placeholder}
          ref={input}
          type="search"
          defaultValue={externallyControlled ? undefined : value}
          value={externallyControlled ? value : undefined}
        />
        {value && (
          <button
            className="p-search-box__reset"
            disabled={disabled}
            onClick={resetInput}
            type="reset"
          >
            <Icon name="close">Clear search field</Icon>
          </button>
        )}
        <button
          className="p-search-box__button"
          disabled={disabled}
          type="submit"
        >
          <Icon name="search">Search</Icon>
        </button>
      </form>
    );
  }
);

SearchBox.displayName = "SearchBox";

export default SearchBox;
