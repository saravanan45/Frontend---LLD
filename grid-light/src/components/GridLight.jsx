import useGridLightHook from "../hooks/useGridLightHook";

const GridLight = () => {
  let { grids, selectedGrids, handleGridSelection, isDisabled } = useGridLightHook();

  return (
    <div className="grid-container">
      {grids.length
        ? grids.map((gridCount) => {
            return (
              <div
                className={`grid ${selectedGrids.includes(gridCount) ? "selected-grid" : "unselected-grid"}`}
                key={gridCount}
                tabIndex="0"
                role="button"
                aria-label={`grid-box-${gridCount}`}
                onClick={() => handleGridSelection(gridCount)}
                disabled={isDisabled}
              />
            );
          })
        : null}
    </div>
  );
};

export default GridLight;
