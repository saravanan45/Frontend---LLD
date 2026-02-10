import { useState, useEffect, useRef } from "react";

const useGridLightHook = () => {
  const m = 3;
  const n = 3;
  const [grids, setGrids] = useState(
    Array.from({ length: m * n }, (_, i) => i + 1),
  );
  const [selectedGrids, setSelectedGrids] = useState([]);
  const [revert, setRevert] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const intervalId = useRef();

  useEffect(() => {
    if (!revert || intervalId.current) return;

    if (revert) {
      const triggerUpdate = () => {
        intervalId.current = setInterval(() => {
          setSelectedGrids((prev) => {
            const newPrev = [...prev];
            newPrev.pop();
            return newPrev;
          });
        }, 400);
      };
      triggerUpdate();
    }

    return () => {
        clearInterval(intervalId.current)
        intervalId.current = null;
    };
  }, [revert]);

  useEffect(() => {
    if (revert && selectedGrids.length === 0) {
      const cleanupFunction = () => {
        setRevert(false);
        setIsDisabled(false);
      };
      cleanupFunction();
    }
  }, [selectedGrids, revert]);

  const handleGridSelection = (id) => {
    if(isDisabled) return;

    if (!selectedGrids.includes(id)) {
      const newSelectedGrids = [...selectedGrids, id];

      if (newSelectedGrids.length === m * n) {
        setIsDisabled(true);
        setRevert(true);
      }
      setSelectedGrids(newSelectedGrids);
    }
  };

  return {
    grids,
    handleGridSelection,
    selectedGrids,
    isDisabled,
  };
};

export default useGridLightHook;
