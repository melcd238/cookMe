import styles from "./Accueil.module.scss";
import photoAcc from "../../assets/images/recetteAccueil.jpg"
import { Link } from "react-router-dom";



function Accueil() {
  return (
    <div className="flex-fill container">
        <div className="mt-100 d-flex flex-column justify-content-center align-items-center">
          <h1>CookMe</h1>
          <h2 className={styles.title2}>Vos recettes préférées au même endroit</h2>
        </div>

        <div className="mt-40 d-flex flex-column justify-content-center align-items-center">
            <p className={styles.paraAcc}>
            Vous cherchez un moyen pratique et sûr de stocker toutes vos recettes, 
            y compris les recettes de grand-mère que vous ne voulez jamais perdre ? Avec CookMe, c'est facile !
            </p>
            <div className={styles.imgAcc}>
                <img src={photoAcc} alt="recette de grand mère" />
            </div>
           <section  className={styles.paraAcc}>
            <p>
            Notre application de recettes en ligne vous permet de stocker toutes vos recettes sur une base de
             données sécurisée. Ajoutez des photos, des instructions, des ingrédients et
             même des anecdotes pour chaque recette, pour rendre l'expérience encore plus personnelle. 
            </p>
            <p>
            CookMe est conçu pour être simple et facile à utiliser, et vos recettes ne sont visibles que par vous-même. Cela signifie que vous pouvez stocker
             toutes vos recettes sans avoir à vous soucier de la confidentialité. 
            </p>
            <p>
            Alors, n'attendez plus et inscrivez-vous dès maintenant sur CookMe. Stockez toutes vos recettes en un seul endroit pratique et sûr, y compris
            les recettes de grand-mère que vous chérissez tant, et commencez à organiser votre cuisine avec style !  
            </p>
            </section>

            <div className="d-flex gap-20">
              <Link to="/register"> <button>Inscription</button> </Link>
              <Link to="/connexion"><button>Connexion</button> </Link>  
             </div>
          
        </div>

    </div>
  );
}

export default Accueil;