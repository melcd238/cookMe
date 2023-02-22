import styles from "./Register.module.scss";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { ApiContext } from '../../Context/ApiContext';




function Register() {
    const BASE_URL = useContext(ApiContext)
    const defaultValues = {
        name: '',
        email: '',
        password: '',
    };

    const registerSchema = yup.object().shape({
        name: yup.string()
            .required('Le prénom est obligatoire')
            .min(3, 'Le prénom doit contenir au moins 3 caractères')
            .max(30, 'Le prénom doit contenir au maximum 30 caractères'),
        email: yup.string()
            .required('L\'email est obligatoire')
            .email('L\'email n\'est pas valide'),
        password: yup.string()
            .required('Le mot de passe est obligatoire')
            .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        });

    const { register, handleSubmit, reset, clearErrors, setError, formState: { errors, isSubmitting } } = useForm({
            defaultValues,
            resolver: yupResolver(registerSchema),
    });  
    
    async function submit(value) {
        try {
             clearErrors();
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value),
            });
            if(response.ok) {
                reset(defaultValues);
                // alert a modifier pour afficher un message plus joli
                alert('Inscription réussie');
                // redirection vers la page de connexion
                window.location.href = '/connexion';
            } else {
                setError('generic', { type: 'generic', message: 'Une erreur est survenue' });
            }
        }catch {
            setError('generic', { type: 'generic', message: 'Une erreur est survenue' });
        }
    }


    return (
        <div className="flex-fill container">
            
            <blockquote className="mt-100 d-flex flex-column justify-content-center align-items-center">
           <p>« La cuisine, c'est l'envers du décor de la vie. C'est la seule chose qui donne goût à la vie. »</p>
            <cite>Auguste Escoffier</cite>
            </blockquote>

  

            <div className={`${styles.formContainer}"mt-40 d-flex justify-content-center align-items-center`}>
                <form className={styles.form} onSubmit={handleSubmit(submit)}>

                    <div className="d-flex flex-column gap-10">
                        <label htmlFor="name">Prénom</label>
                        <input {...register('name')} type="text" name="name" id="name" />
                       {errors.name && <span className={styles.error}>{errors.name.message}</span>} 
                    </div>

                    <div className="d-flex flex-column gap-10">
                        <label htmlFor="email">Email</label>
                        <input {...register("email")} type="email" name="email" id="email" />
                        { errors.email && <span className={styles.error}>{errors.email.message}</span>}
                    </div>
                    <div className="d-flex flex-column gap-10">
                        <label htmlFor="password">Mot de passe</label>
                        <input {...register("password")} type="password" name="password" id="password" />
                        { errors.password && <span className={styles.error}>{errors.password.message}</span>}
                    </div>
                    {errors.generic && <p className={styles.error}>{errors.generic.message}</p>}
                    <div className="d-flex gap-20">
                        <button  disabled={isSubmitting} type="submit">S'inscrire</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Register;



