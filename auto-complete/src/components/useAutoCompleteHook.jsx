import { useState, useEffect, useMemo, useCallback } from "react";

import { debounce } from "lodash";

import { getRecipeSuggestions } from "../API/apiHandler.js";

const useAutoCompleteHook = () => {
  const [searchValue, setSearchValue] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [activeItemIndex, setActiveItemIndex] = useState(-1);

  const searchRecipes = useCallback(async (query) => {
    try {
      setIsLoading(true);
      const recipes = await getRecipeSuggestions(query);
      setRecipes(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useMemo(
    () => debounce(searchRecipes, 300),
    [searchRecipes],
  );

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      const suggestionList = document.getElementById("recipe-suggestions-list");
      if (suggestionList.children.length) {
        suggestionList.children[0].focus();
        setActiveItemIndex(0);
      }
    }
    
  };

  const handleSuggestionKeyDown = (e) => {
    const suggestionList = document.getElementById("recipe-suggestions-list");
    if (e.key === "ArrowDown") {
        if (suggestionList.children.length) {
        const newActiveIndex = (activeItemIndex + 1) % suggestionList.children.length;
        suggestionList.children[newActiveIndex].focus();
        setActiveItemIndex(newActiveIndex);
      }
    } else if (e.key === "ArrowUp") {
      if (suggestionList.children.length) {
          const newActiveIndex = (activeItemIndex - 1 + suggestionList.children.length) % suggestionList.children.length;
        suggestionList.children[newActiveIndex].focus();
        console.log("New Active Index:", newActiveIndex);
        setActiveItemIndex(newActiveIndex);
      }
    } else if (e.key === "Escape") {
        const inputField = document.getElementById("recipe-list");
        inputField.focus();
        setActiveItemIndex(-1);
    }
  };

  const handleRecipeSelect = (recipeId) => {
    const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);
    if (selectedRecipe) {
      setSearchValue(selectedRecipe.name);
      setRecipes([]);
    }
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return {
    searchValue,
    handleSearchChange,
    recipes,
    handleInputKeyDown,
    handleSuggestionKeyDown,
    isLoading,
    handleRecipeSelect
  };
};

export default useAutoCompleteHook;
