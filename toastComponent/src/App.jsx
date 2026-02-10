
import "./App.css";

import useToastHook from "./hook/useToastHook";

function App() {
  const [ToastComponent, triggerToast] = useToastHook();
  return (
    <>
      <div>
        <h1>Toast Component</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => triggerToast(3000, "success")}>
            Show Success Toast
          </button>
          <button onClick={() => triggerToast(3000, "error")}>
            Show Error Toast
          </button>
          <button onClick={() => triggerToast(3000, "warning")}>
            Show Warning Toast
          </button>
        </div>
        <ToastComponent />
      </div>
    </>
  );
}

export default App;
