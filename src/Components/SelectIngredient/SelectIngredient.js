import  {useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import Select from 'react-select'
import { useContext } from 'react';
import { ApiContext } from '../../Context/ApiContext';
import authHeader from '../../Services/authHeaders';
import styles from "./SelectIngredient.module.scss";



const SelectIngredient = forwardRef((props, ref) =>{
     const [ingredients, setIngredients] = useState([])
     const [selectedIngredients , setSectedIngredients] = useState([])
     const [showInput, setShowinput]= useState(false)
     const [newIngredient, setNewIngredient] = useState('')
     const BASE_URL = useContext(ApiContext)

   useEffect(()=>{
    async function fetchIngredients (){
        try {
           const response = await fetch(`${BASE_URL}/ingredients/getallingredients?page=1&limit=20`, { headers: authHeader() }); 
           if(response.ok){
               const data = await response.json();
               setIngredients((x) => (Array.isArray(data) ? [...x, ...data] : [data]));
           }else{
            console.log('oups error')
           }
        } catch (error) {
            console.log('oups error dans le catch ')
        }
    }
    fetchIngredients()
   },[BASE_URL]);

    const options = ingredients.map((ingredient) => ({
        value: ingredient.name,
        label: ingredient.name,
        }));

    function handleSelectChange(selectedOptions) {
        const selectIng = selectedOptions.map((option) => option.value);
        console.log(selectIng);
        setSectedIngredients({ selectIng});
    }
    useImperativeHandle(ref, () => ({
        getSelectedIngredients() {
          return selectedIngredients;
        }
      }));
    function handleShowInput(){
        setShowinput(!showInput)
    }
    function handleAddIngredient(e){
         e.stopPropagation()
         setSectedIngredients((oldIngredients) => [...oldIngredients,...newIngredient]);
         setNewIngredient('');
         setShowinput(false);
         console.log(newIngredient)
         console.log(selectedIngredients)
    }
     
   return (
    <div>
      <label htmlFor="ingredients">Ingrédients</label>
      <Select
        options={options}
        isMulti
        name="ingredients"
        label={selectedIngredients} 
        onChange={handleSelectChange}
      />
      <button onClick={handleShowInput} className={styles.btnAddIng}>Votre ingredient ne fait pas parti de la liste ? Ajoutez le :</button>
        {showInput && ( <>
        <input type="text" name="newIngredient" id="newIngredient" className={styles.inputForm} placeholder="Ajouter un ingrédient à la liste" onChange={(e) => setNewIngredient(e.target.value)}/>
                       <button onClick={(e)=>handleAddIngredient(e)} className={styles.btnAddIng}>Ajouter</button> </>)}
    </div>
  );   
});


export default SelectIngredient