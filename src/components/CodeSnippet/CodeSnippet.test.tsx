import { mount } from "enzyme";

import CodeSnippet, { CodeSnippetBlockAppearance } from "./index";

describe("CodeSnippet ", () => {
  it("renders a code block", () => {
    const wrapper = mount(<CodeSnippet blocks={[{ code: "Test" }]} />);
    expect(wrapper.find(".p-code-snippet__block").text()).toEqual("Test");
  });

  it("renders title for a code block", () => {
    const wrapper = mount(
      <CodeSnippet blocks={[{ title: "Title", code: "Test" }]} />
    );
    expect(wrapper.find(".p-code-snippet__title").length).toBe(1);
    expect(wrapper.find(".p-code-snippet__title").text()).toEqual("Title");
  });

  it("renders multiple code blocks", () => {
    const wrapper = mount(
      <CodeSnippet
        blocks={[
          { title: "Title", code: "Test" },
          { title: "Title 2", code: "Test 2" },
        ]}
      />
    );
    expect(wrapper.find("pre").length).toBe(2);
  });

  it("renders line numbers", () => {
    const multilineCode = `Test line 1;
    Test line 2;
    Test line 3;`;

    const wrapper = mount(
      <CodeSnippet
        blocks={[
          {
            appearance: CodeSnippetBlockAppearance.NUMBERED,
            code: multilineCode,
          },
        ]}
      />
    );
    const lines = wrapper.find(
      ".p-code-snippet__block--numbered .p-code-snippet__line"
    );
    expect(lines.length).toBe(3);
    expect(lines.first().text()).toEqual("Test line 1;");
  });

  it("renders default linux prompt icon", () => {
    const wrapper = mount(
      <CodeSnippet
        blocks={[
          { appearance: CodeSnippetBlockAppearance.LINUX_PROMPT, code: "Test" },
        ]}
      />
    );
    expect(wrapper.find(".p-code-snippet__block--icon").length).toBe(1);
  });

  it("renders windows prompt icon", () => {
    const wrapper = mount(
      <CodeSnippet
        blocks={[
          {
            appearance: CodeSnippetBlockAppearance.WINDOWS_PROMPT,
            code: "Test",
          },
        ]}
      />
    );
    expect(
      wrapper.find(".p-code-snippet__block--icon.is-windows-prompt").length
    ).toBe(1);
  });

  it("renders url icon", () => {
    const wrapper = mount(
      <CodeSnippet
        blocks={[{ appearance: CodeSnippetBlockAppearance.URL, code: "Test" }]}
      />
    );
    expect(wrapper.find(".p-code-snippet__block--icon.is-url").length).toBe(1);
  });

  it("renders code block with line wrapping", () => {
    const wrapper = mount(
      <CodeSnippet blocks={[{ wrapLines: true, code: "Test" }]} />
    );
    expect(wrapper.find(".p-code-snippet__block.is-wrapped").length).toBe(1);
  });

  it("renders code block with a dropdown", () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <CodeSnippet
        blocks={[
          {
            code: "Test",
            dropdowns: [
              {
                options: [
                  { value: "js", label: "JS" },
                  { value: "css", label: "CSS" },
                  { value: "html", label: "HTML" },
                ],
                value: "html",
                onChange: onChange,
              },
            ],
          },
        ]}
      />
    );
    const dropdowns = wrapper.find(".p-code-snippet__dropdown");
    expect(dropdowns.length).toBe(1);
    expect(dropdowns.first().prop("value")).toEqual("html");
    dropdowns.first().simulate("change");
    expect(onChange).toHaveBeenCalled();
  });

  it("renders code snippets with a border when it also has custom content", () => {
    const wrapper = mount(
      <CodeSnippet
        blocks={[
          {
            code: "Test",
            content: (
              <>
                <span className="test"></span>
              </>
            ),
          },
        ]}
      />
    );
    expect(wrapper.find(".test").length).toBe(1);
    expect(wrapper.find(".p-code-snippet.is-bordered").length).toBe(1);
  });
});
