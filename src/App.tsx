import * as React from "react";
import ToasticeContainer from "./core/components/ToasticeContainer";
import toast from "./core/utils/toast";

// Testing playground
const App = () => {
  const id = React.useRef<number | string>();

  const show = () => {
    id.current = toast("Hello World", {
      type: "error",
      position: "bottom-center",
      autoClose: 2000,
      delay: 1000,
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
      <ToasticeContainer limit={false} />
    </div>
  );
};

export default App;
