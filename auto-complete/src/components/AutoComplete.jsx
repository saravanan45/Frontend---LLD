import AutoCompleteSuggestions from "./AutoCompleteSuggestions.jsx";
import useAutoCompleteHook from "./useAutoCompleteHook.jsx";

const AutoComplete = () => {
  const {
    searchValue,
    handleSearchChange,
    recipes,
    handleInputKeyDown,
    handleSuggestionKeyDown,
    isLoading,
    handleRecipeSelect,
  } = useAutoCompleteHook();
  return (
    <>
      <div>AutoComplete Component</div>
      <input
        id={"recipe-list"}
        type="text"
        placeholder="Type to search..."
        value={searchValue}
        onChange={handleSearchChange}
        style={{ width: "300px", padding: "8px", fontSize: "16px" }}
        onKeyDown={handleInputKeyDown}
      />
      <AutoCompleteSuggestions
        searchValue={searchValue}
        recipes={recipes}
        handleSuggestionKeyDown={handleSuggestionKeyDown}
        isLoading={isLoading}
        handleRecipeSelect={handleRecipeSelect}
      />
    </>
  );
};

export default AutoComplete;
