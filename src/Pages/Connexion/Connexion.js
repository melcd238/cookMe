import styles from "./Connexion.module.scss";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { ApiContext } from '../../Context/ApiContext';



function Connexion() {
    const BASE_URL = useContext(ApiContext)

    const defaultValues = {
        email: '',
        password: '',
    };

    const connexionSchema = yup.object().shape({
        email: yup.string()
            .required('L\'email est obligatoire')
            .email('L\'email n\'est pas valide'),
        password: yup.string()
            .required('Le mot de passe est obligatoire')
            .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        });

    const { register, handleSubmit, reset, clearErrors, setError, formState: { errors, isSubmitting } } = useForm({
            defaultValues,
            resolver: yupResolver(connexionSchema),
    });

    async function submit(value) {
        try {
                clearErrors();
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value),
            });
            if(response.ok) {
                reset(defaultValues);
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data));
                // alert a modifier pour afficher un message plus joli
                alert('Connexion réussie');
                // redirection vers la page home
                window.location.href = '/home';
            } else {
                setError('generic', { type: 'generic', message: 'Une erreur est survenue' });
            }
        }catch {
            setError('generic', { type: 'generic', message: 'Une erreur est survenue' });
        }
    }

    return(
        <div className="flex-fill container">
            
             <blockquote className="mt-100 d-flex flex-column justify-content-center align-items-center">
                 <p>« La nourriture est notre terrain d'entente, une expérience universelle. »</p>
                 <cite>James Beard</cite>
             </blockquote>


            <div className="mt-40 d-flex flex-column justify-content-center align-items-center">
                <form className={styles.form} onSubmit={handleSubmit(submit)}>
                    <div className="d-flex flex-column gap-10">
                        <label htmlFor="email">Email</label>
                        <input {...register('email')} type="email" name="email" id="email" />
                         { errors.email && <span className={styles.error}>{errors.email.message}</span>}
                    </div>
                    <div className="d-flex flex-column gap-10">
                        <label htmlFor="password">Mot de passe</label>
                        <input {...register("password")} type="password" name="password" id="password" />
                         { errors.password && <span className={styles.error}>{errors.password.message}</span>}
                    </div>
                        {errors.generic && <p className={styles.error}>{errors.generic.message}</p>}
                    <div className="d-flex gap-20">
                        <button disabled={isSubmitting} type="submit">Se connecter</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Connexion;