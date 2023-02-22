import styles from './AddRecipe.module.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { ApiContext } from '../../Context/ApiContext';
import {Link} from 'react-router-dom';





function AddRecipe () {
    const BASE_URL = useContext(ApiContext)
   const defaultValues = {
         title: '',
         image: '',
   }
   const recipeSchema = yup.object().shape({
        title: yup.string().required('Le titre de la recette doit être renseigné').min(3, 'Le titre doit contenir au moins 3 caractères').max(30, 'Le titre doit contenir au maximum 50 caractères'),
        image: yup.string().required('L\'image est obligatoire').url('L\'url de l\'image n\'est pas valide'),
    });

   const { register, handleSubmit, reset, clearErrors, setError, formState: { errors, isSubmitting } } = useForm({
        defaultValues,
        resolver: yupResolver(recipeSchema),
    });
   
    async function submit(value) {
       try {
        clearErrors();
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
                    <label htmlFor="image">Photo de la recette</label>
                    <input {...register("image")} type="text" name="image" id="image" className={styles.inputForm} placeholder="Copier le lien d'une photo"/>
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