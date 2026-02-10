const getHighlightedText = (text, highlight) => {
  if (!highlight) return text;

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} style={{ fontWeight: "bold" }}>
        {part}
      </span>
    ) : (
      part
    ),
  );
};

const AutoCompleteSuggestions = ({
  recipes,
  searchValue,
  handleSuggestionKeyDown,
  isLoading,
  handleRecipeSelect,
}) => {
  return (
    <>
      {recipes.length ? (
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            margin: "8px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            width: "300px",
          }}
          tabIndex={0}
          id="recipe-suggestions-list"
          onKeyDown={(e) => handleSuggestionKeyDown(e)}
        >
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              style={{ color: "black", padding: "8px" }}
              tabIndex={0}
              onClick={() => handleRecipeSelect(recipe.id)}
            >
              {getHighlightedText(recipe.name, searchValue)}
            </li>
          ))}
        </ul>
      ) : null}
      {isLoading && <div>Loading...</div>}
    </>
    // <datalist id={listId}>
    //     {recipes.length ? recipes.map((recipe) => (
    //         <option key={recipe.id} value={recipe.name}>
    //         </option>
    //     )) : null}
    // </datalist>
  );
};

export default AutoCompleteSuggestions;
