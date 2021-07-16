import { nanoid } from "nanoid";
import { ReactElement, ReactNode, useRef, useEffect } from "react";

export type Props = {
  /**
   * Buttons to display underneath the main modal content.
   */
  buttonRow?: ReactNode | null;
  /**
   * The content of the modal.
   */
  children: ReactNode;
  /**
   * Function to handle closing the modal.
   */
  close?: () => void | null;
  /**
   * The title of the modal.
   */
  title?: ReactNode | null;
};

export const Modal = ({
  buttonRow,
  children,
  close,
  title,
}: Props): ReactElement => {
  const descriptionId = useRef(nanoid());
  const titleId = useRef(nanoid());

  // This useEffect sets up listeners so the panel will close if user clicks
  // anywhere else on the page or hits the escape key
  useEffect(() => {
    const keyDown = (e) => {
      if (e.code === "Escape") {
        // Close panel if Esc keydown detected
        if (close) {
          close();
        }
      }
    };

    // Add listener on document to capture keydown events
    document.addEventListener("keydown", keyDown);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, [close]);

  return (
    <div className="p-modal" onClick={close}>
      <section
        className="p-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId.current}
        aria-describedby={descriptionId.current}
        onClick={(evt) => evt.stopPropagation()}
      >
        {!!title && (
          <header className="p-modal__header">
            <h2 className="p-modal__title" id={titleId.current}>
              {title}
            </h2>
            {!!close && (
              <button
                className="p-modal__close"
                aria-label="Close active modal"
                onClick={close}
              >
                Close
              </button>
            )}
          </header>
        )}
        <div id={descriptionId.current}>{children}</div>
        {!!buttonRow && (
          <footer className="p-modal__footer">{buttonRow}</footer>
        )}
      </section>
    </div>
  );
};

export default Modal;
