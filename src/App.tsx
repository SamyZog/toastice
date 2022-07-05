import * as React from "react";
import { RenderToasticeProps } from "./core/components/Toastice/Toastice.types";
import ToasticeContainer from "./core/components/ToasticeContainer";
import toast from "./core/utils/toast";

const Custom = ({
  close, progress, Icon, theme, type,
}: RenderToasticeProps) => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="rounded-lg p-4 bg-green-400 box-border my-2 border-solid border-green-900">
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={close}>CLOSE</button>
      {Icon && <Icon theme={theme} type={type} />}
      <h1>{progress}</h1>
      <h1>{count}</h1>
    </div>
  );
};
// Testing playground
const App = () => {
  const id = React.useRef<number | string>();

  const show = () => {
    id.current = toast("Hello World", {
      type: "error",
      position: "top-right",
      animation: "pop",
      autoClose: false,
    });
  };

  const update = () => {
    toast.update(id.current, {
      type: "warning",
      autoClose: false,
    });
  };

  const updateAgain = () => {
    toast.update(id.current, {
      type: "success",
      autoClose: 2000,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button type="button" onClick={show}>
        show
      </button>
      <button type="button" onClick={update}>update</button>
      <button type="button" onClick={updateAgain}>update again</button>
      <ToasticeContainer />
    </div>
  );
};

export default App;
