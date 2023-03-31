import { FC } from "react";
import { ToastContainer } from "react-toastify";

const ToastContainers: FC = (): JSX.Element => {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        enableMultiContainer
        containerId={"ToastSuccess"}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        enableMultiContainer
        containerId={"ToastAlert"}
      />
    </>
  );
};

export default ToastContainers;
