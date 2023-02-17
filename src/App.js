import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import styles from "./App.module.scss";
import useFetchRecipes from "./hooks/useFetchRecipes";
import HomePage from "./Pages/HomePage/HomePage";

//import { data } from "./data/data";
// Test avec restapi.fr/api/recipes pour tester le front sans le back 
//import { seedTestRecipes } from "./data/seedTest";

//seedTestRecipes();

function App() {
  console.log("render App")
  const { recipes, loading, updateRecipe, handleClickLoadMoreRecipes,handleFilter, deleteRecipe} = useFetchRecipes();

  

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header   searchbar={ handleFilter} />
       <HomePage  recipes = {recipes}
                  loading = {loading} 
                  toggleLikedRecipe = {updateRecipe} 
                  handleClickLoadMoreRecipes={handleClickLoadMoreRecipes}
                  deleteRecipe={deleteRecipe}/>
      <Footer />
    </div>
  );
}

export default App;
