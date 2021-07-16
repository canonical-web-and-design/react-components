import Spinner from "../Spinner";
import type { Props } from "../Spinner/Spinner";
import { IS_DEV } from "../../utils";

/**
 * @deprecated Loader component is deprecated. Use Spinner component instead.
 */
const Loader = (props: Props): JSX.Element => {
  if (IS_DEV) {
    console.warn(
      "The Loader component has been renamed to Spinner and will be removed in a future release. https://canonical-web-and-design.github.io/react-components/?path=/story/spinner--default-story"
    );
  }
  return <Spinner {...props} />;
};

export default Loader;
