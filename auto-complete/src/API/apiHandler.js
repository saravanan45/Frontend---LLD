export const getRecipeSuggestions = async (query) => {
    const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`)

    const result = await response.json();
    console.log("API Result:", result);
    return result.recipes;

}