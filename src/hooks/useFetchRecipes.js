import { useState, useEffect } from "react";
import { useContext, useRef } from "react";
import { ApiContext } from "../Context/ApiContext";
import authHeader from "../Services/authHeaders";

export default function useFetchRecipes() {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(null);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
  const timeout = useRef(null);
 

  const BASE_URL = useContext(ApiContext);


  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(`${BASE_URL}/recipes/allrecipes?page=${page}&limit=8&search=${debouncedSearchValue}`, { headers: authHeader() });
        if (response.ok) {
          const data = await response.json();
          setRecipes((recipes) => [...recipes, ...data.recipes]);
         setHasMore(data.hasMore);
        } else {
          console.log("oups error");
        }
      } catch (error) {
        console.log("oups error");
      } finally {
        setLoading(false);
      }
    }
   
    
      fetchRecipes();
  }, [BASE_URL, page, debouncedSearchValue]);

  useEffect(() => {
    setPage(1);
    setRecipes([]);
  }, [debouncedSearchValue]);


  function updateRecipe(updatedRecipe) {
    setRecipes((recipes) => recipes.map((recipe) => (recipe._id === updatedRecipe._id ? updatedRecipe : recipe)));
  }

  function updateBookmarks(updatedRecipe) {
    setRecipes((recipes) => recipes.map((recipe) => (recipe._id === updatedRecipe._id ? updatedRecipe : recipe)));
  }

  function handleClickLoadMoreRecipes() {
    setPage(page + 1);
  }
  function handleFilter(val) {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setDebouncedSearchValue(val);
    }, 500);
  }

  function deleteRecipe (id){
    // supprimer une recette
    console.log(id)
    const newrecipes = recipes.filter((recipe) => recipe._id !== id)
   setRecipes(newrecipes)
  }
  
  const displayedRecipes = debouncedSearchValue ? recipes.filter((recipe) => recipe.title.toLowerCase().startsWith(debouncedSearchValue.toLowerCase().trim()))  : recipes;

  return {  displayedRecipes, recipes, hasMore, loading, updateRecipe, handleClickLoadMoreRecipes, handleFilter, deleteRecipe, updateBookmarks };
}
