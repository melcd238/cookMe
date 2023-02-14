import styles from './Content.module.scss';
import Recipe from './Recipe';

function Content (){
    return (
        <div className="flex-fill container">
            <h1 className='mb-20 mt-20'>Découvrez nos nouvelles recettes</h1>

            <div className={`card p-20 ${styles.contentCard}`}>
            <div className={styles.grid}>
                <Recipe />
                <Recipe />
                <Recipe />
                <Recipe />
                <Recipe />
                <Recipe />
            </div>

            </div>
        </div>
    )
}

export default Content