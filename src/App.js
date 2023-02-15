import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Content from "./Components/Content/Content";
import styles from "./App.module.scss";
import { data } from "./data/data";
import { useState } from "react";

function App() {
  const [recipes, setRecipes] = useState(data);
  

  const handleFilter = (val) => {
    const filteredRecipes = data.filter((recipe) => {
      return recipe.title.toLowerCase().startsWith(val.toLowerCase().trim());
    });
    setRecipes(filteredRecipes);
  };

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header   searchbar={ handleFilter} />
      <Content  recipes = {recipes}/>
      <Footer />
    </div>
  );
}

export default App;
