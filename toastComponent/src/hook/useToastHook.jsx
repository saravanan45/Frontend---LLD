import { useState, useCallback, useRef } from "react";

const useToastHook = () => {
  const timers = useRef({});

  const [toastArray, setToastArray] = useState([]);

  const triggerToast = useCallback((duration = 10000, type) => {
    const id = Math.random().toString(36).substring(2, 9);
    timers[id] = setTimeout(() => {
      setToastArray((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== id),
      );
    }, duration);
    setToastArray(prev => [...prev, { type, duration, id }]);
  }, []);

  const ToastComponent = () => {
    return (
      <>
        {toastArray.map((toast, index) => (
          <div
            key={index}
            className={`toast ${toast.type}`}
            style={{
              position: "fixed",
              top: `${20 + index * 98}px`,
              right: "20px",
              
            }}
          >
            {toast.type.toUpperCase()} Toast
          </div>
        ))}
      </>
    );
  };
  return [ToastComponent, triggerToast];
};

export default useToastHook;
