import React, {useEffect, useState} from 'react'
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import styles from "./App.module.scss";
import useFetchRecipes from "./hooks/useFetchRecipes";
import HomePage from "./Pages/HomePage/HomePage";
import AddRecipe from "./Pages/AddRecipe/AddRecipe";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import RecipeDetail from "./Pages/RecipeDetail/RecipeDetail";
import Accueil from "./Pages/Accueil/Accueil";
import Connexion from "./Pages/Connexion/Connexion";
import Register from "./Pages/Register/Register";
import BookMark from './Pages/BookMark/BookMark';




function App() {
  const {displayedRecipes,  hasMore, loading, updateRecipe, handleClickLoadMoreRecipes,handleFilter, deleteRecipe, updateBookmarks} = useFetchRecipes();
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);



  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
    
      <Header   searchbar={ handleFilter} user={currentUser} displayedRecipes={displayedRecipes} />
      <Routes>
        <Route path="/" element={<Accueil/>}/>
        <Route path="/connexion" element={<Connexion/>}/>
        <Route path="/register" element={<Register/>}/>
        {currentUser &&   <Route path="/home" element={<HomePage  displayedRecipes={displayedRecipes}
                  hasMore = {hasMore}
                  loading = {loading}
                  toggleLikedRecipe = {updateRecipe}
                  handleClickLoadMoreRecipes={handleClickLoadMoreRecipes}
                  deleteRecipe={deleteRecipe}
                  updateBookmarks={updateBookmarks}/>}/> }
        {currentUser && <Route path="/add-recipe" element={<AddRecipe/>}/> }
        {currentUser && <Route path="/recipe/:id" element={<RecipeDetail/> }/> }
        {currentUser && <Route path="/bookmarks" element={<BookMark/> }/> }
        <Route path="*" element={<ErrorPage/>}/>
       </Routes>      
      <Footer />
   
    </div>
  );
}

export default App;

