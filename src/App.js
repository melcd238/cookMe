import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import styles from "./App.module.scss";
import useFetchRecipes from "./hooks/useFetchRecipes";
import HomePage from "./Pages/HomePage/HomePage";
import AddRecipe from "./Pages/AddRecipe/AddRecipe";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";



//import { data } from "./data/data";
// Test avec restapi.fr/api/recipes pour tester le front sans le back 
//import { seedTestRecipes } from "./data/seedTest";

//seedTestRecipes();

function App() {
  const { recipes, loading, updateRecipe, handleClickLoadMoreRecipes,handleFilter, deleteRecipe} = useFetchRecipes();

  

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header   searchbar={ handleFilter} />
      <Routes>
        <Route path="/" element={<HomePage  recipes = {recipes}
                  loading = {loading}
                  toggleLikedRecipe = {updateRecipe}
                  handleClickLoadMoreRecipes={handleClickLoadMoreRecipes}
                  deleteRecipe={deleteRecipe}/>}/>
        <Route path="/add-recipe" element={<AddRecipe/>}/>
        <Route path="*" element={<ErrorPage/>}/>
       </Routes>      
      <Footer />
    </div>
  );
}

export default App;

