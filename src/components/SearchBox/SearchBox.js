import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";

const SearchBox = React.forwardRef(
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
    },
    ref
  ) => {
    const input = React.createRef();
    const resetInput = () => {
      onChange && onChange("");
      input.current.value = "";
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
            alt="reset"
            className="p-search-box__reset"
            disabled={disabled}
            onClick={resetInput}
            type="reset"
          >
            <i className="p-icon--close">Clear search field</i>
          </button>
        )}
        <button
          alt="search"
          className="p-search-box__button"
          disabled={disabled}
          type="submit"
        >
          <i className="p-icon--search">Search</i>
        </button>
      </form>
    );
  }
);

SearchBox.propTypes = {
  autocomplete: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * Whether the input value will be controlled via external state.
   */
  externallyControlled: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

SearchBox.displayName = "SearchBox";

export default SearchBox;
