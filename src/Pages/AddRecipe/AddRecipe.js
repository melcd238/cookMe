import styles from './AddRecipe.module.scss';
import * as yup from 'yup';
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { ApiContext } from '../../Context/ApiContext';
import {Link} from 'react-router-dom';
import SelectIngredient from '../../Components/SelectIngredient/SelectIngredient';
import SelectUstensil from '../../Components/SelectUstensil/SelectUstensil';
import { useRef } from 'react';





function AddRecipe () {
    const BASE_URL = useContext(ApiContext)
    const ingredientRef = useRef();
    const ustensilRef = useRef();
   const defaultValues = {
         title: '',
         liked : false,
         ingredients: [],
         instructions: [],
         timePreparation: '',
         categorie: "",
         ustensils: [],
         anecdote: '',
         image: '',
   }
   const recipeSchema = yup.object().shape({
        title: yup.string().required('Le titre de la recette doit être renseigné').min(3, 'Le titre doit contenir au moins 3 caractères').max(30, 'Le titre doit contenir au maximum 50 caractères'),
        liked: yup.boolean().required('Le champ liked est obligatoire'),
        ingredients: yup.array().required('Le champ ingredients est obligatoire'),
        instructions: yup.array().required('Le champ instructions est obligatoire'),
        timePreparation: yup.string().required('Le champ timePreparation est obligatoire'),
        categorie: yup.string().required('Le champ categorie est obligatoire'),
        ustensils: yup.array().required('Le champ ustensils est obligatoire'),
        anecdote: yup.string().required('Le champ anecdote est obligatoire'),
        imageUrl: yup.string().required('L\'image est obligatoire').url('L\'url de l\'image n\'est pas valide'),
    });

   const { register, handleSubmit, reset, clearErrors, setError, formState: { errors, isSubmitting } } = useForm({
        defaultValues,
        resolver: yupResolver(recipeSchema),
    });
   
    async function submit(value) {
       try {
        clearErrors();
        const selectedIngredients = ingredientRef.current.getSelectedIngredients();
        value.ingredients = selectedIngredients.selectIng;
         const response = await fetch(`${BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value),
            });
            if (response.ok) {
                reset(defaultValues);
                // alert a modifier pour afficher un message plus joli
                alert('Recette ajoutée avec succès');
                // redirection vers la page d'accueil
                window.location.href = '/home';
            } else {
                setError('generic', { type: 'generic', message: 'Une erreur est survenue' });
            }
       } catch (error) {
              setError('generic', { type: 'generic', message: 'Une erreur est survenue' });
       }
    }



    return (
      
        <div className={`${styles.cardForm} flex-fill`}>
            <form onSubmit={handleSubmit(submit)} className={`${styles.recipeForm} d-flex flex-column card p20`}>
            <h1 className={styles.formTitle}>Ajouter une recette</h1>
                <Link to="/home"><span className={`material-symbols-outlined ${styles.arrowComeBack}`}>arrow_back</span> </Link>
                <div>
                    <label htmlFor="title">Titre de la recette</label>
                    <input {...register('title')} type="text" name="title" id="title" className={styles.inputForm}/>
                   { errors.title && <span className={styles.error}>{errors.title.message}</span>}
                </div>
                <div>
                    <label htmlFor="liked">Like</label>
                    <input {...register('liked')} type="checkbox" name="liked" id="liked" className={styles.inputForm}/>
                </div>
                  <>
                  <SelectIngredient {...register('ingredients')} ref={ingredientRef}/>
                {errors.ingredients && <span className={styles.error}>{errors.ingredients.message}</span>}
                  </>
                <div>
                    <label htmlFor="instructions">Instructions</label>
                    <input {...register('instructions')} type="text" name="instructions" id="instructions" className={styles.inputForm} placeholder="Ajouter des instructions"/>
                </div>
                <div>
                    <label htmlFor="timePreparation">Temps de préparation</label>
                    <input {...register('timePreparation')} type="text" name="timePreparation" id="timePreparation" className={styles.inputForm} placeholder="Ajouter le temps de préparation, par exemple: 25min"/>
                    {errors.timePreparation && <span className={styles.error}>{errors.timePreparation.message}</span>}
                </div>
                <div>
                    <label htmlFor="categorie">Catégorie</label>
                        <select {...register('categorie')} name="categorie" id="categorie" className={styles.inputForm}>
                            <option value="" disabled defaultValue>Sélectionnez une catégorie: Entrée, Plat ou Dessert</option>
                            <option value="Entrée">Entrée</option>
                            <option value="Plat">Plat</option>
                            <option value="Dessert">Dessert</option>
                        </select>
                    {errors.categorie && <span className={styles.error}>{errors.categorie.message}</span>}
                </div>
                <div>
                    <SelectUstensil {...register('ustensils')} ref={ustensilRef}/>
                </div>
                <div>
                    <label htmlFor="anecdote">Anecdote</label>
                    <input {...register('anecdote')} type="text" name="anecdote" id="anecdote" className={styles.inputForm} placeholder="Ajouter une anecdote"/>
                    {errors.anecdote && <span className={styles.error}>{errors.anecdote.message}</span>}
                </div>
                <div>
                    <label htmlFor="image">Photo de la recette</label>
                    <input {...register("imageUrl")} type="text" name="image" id="image" className={styles.inputForm} placeholder="Copier le lien d'une photo"/>
                    {errors.image && <span className={styles.error}>{errors.image.message}</span>}
                </div>
                {errors.generic && <p className={styles.error}>{errors.generic.message}</p>}
                <div className={styles.btnContainer}>
                    <button disabled={isSubmitting} className={styles.btnForm}>Sauvegarder</button>
                </div>
            </form>
        </div>
        
    )

}
export default AddRecipe;