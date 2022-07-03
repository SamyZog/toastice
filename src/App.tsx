import * as React from "react";
import ToasticeContainer from "./core/components/ToasticeContainer";
import toast from "./core/utils/toast";

const App = () => {
  const show = () => {
    toast("Hello World", {
      position: "bottom-center",
      autoClose: false,
    });
  };

  return (
    <>
      <div className="h-24 bg-slate-900" />
      <div className="h-24 bg-slate-600" />
      <div className="h-24 bg-slate-300" />
      <div className="flex justify-center items-center h-screen">
        <button type="button" onClick={show}>
          show
        </button>
        <button type="button">update</button>
        <ToasticeContainer limit={false} />
      </div>
    </>
  );
};

export default App;
