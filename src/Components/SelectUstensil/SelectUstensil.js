import styles from "./SelectUstensil.module.scss";
import  {useState, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react'
import Select from 'react-select'
import { useContext } from 'react';
import { ApiContext } from '../../Context/ApiContext';
import authHeader from '../../Services/authHeaders';


const SelectUstensil = forwardRef((props, ref) =>{
    const [ustensils, setUstensils] = useState([]);
    const [selectedUstensils , setSectedUstensils] = useState([]);
   // const [showInput, setShowinput]= useState(false);
   // const [newUstensil, setNewUstensil] = useState('');
    const BASE_URL = useContext(ApiContext);


   /* const addUstensils = useCallback(async (newUstensil) => {
        const headers = authHeader();
        try {
          const response = await fetch(`${BASE_URL}/ustensils/createustensil`, {
            method: 'POST',
            headers:{
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newUstensil }),
          });
          if (response.ok) {
            const data = await response.json();
            setUstensils((x) => (Array.isArray(data) ? [...x, ...data] : [data]));
          } else {
            console.log('oups error');
          }
        } catch (error) {
          console.log('oups error dans le catch ');
        }
      }, [BASE_URL]);*/

    useEffect(()=>{
        async function fetchUstensils (){
            try {
                const response = await fetch(`${BASE_URL}/ustensils/getallustensils`, { headers: authHeader() }); 
                if(response.ok){
                    const data = await response.json();
                    setUstensils((x) => (Array.isArray(data) ? [...x, ...data] : [data]));
                }else{
                    console.log('oups error')
                }
            } catch (error) {
                console.log('oups error dans le catch ')
            }
        }
        fetchUstensils()
    },[BASE_URL]);


    const options = ustensils.map((ustensil) => ({
        value: ustensil.name,
        label: ustensil.name,
    }));

    function handleSelectChange(selectedOptions) {
        const selectUst = selectedOptions.map((option) => option.value);
        setSectedUstensils({ selectUst});
    }
    useImperativeHandle(ref, () => ({
        getSelectedUstensils() {
            return selectedUstensils;
        }
    }));
   /* function handleShowInput(){
        setShowinput(!showInput)
    }
    function handleAddUstensil(e){
        e.stopPropagation()
        const newOption = { value: newUstensil, label: newUstensil };
         setSectedUstensils(oldOptions => [...oldOptions, newOption]);
        setNewUstensil('');
        setShowinput(false);
        addUstensils(newUstensil)
    }*/

    return (
        <div className={styles.selectUstensil}>
            <label htmlFor="ustensils">Ustensiles</label>
            <Select
                isMulti
                name="ustensils"
                options={options}
                label={selectedUstensils}
                onChange={handleSelectChange}
            />
           {/*  <button onClick={handleShowInput} className={styles.addUstensil}>Votre ustensile ne fait pas parti de la liste? Ajoutez le : </button>
            {showInput && <div className={styles.addUstensil}>
                <input type="text" value={newUstensil} onChange={(e)=>setNewUstensil(e.target.value)} className={styles.inputForm} placeholder="Ajouter un ustensile à la liste"/>
                <button onClick={handleAddUstensil}>Ajouter</button>
            </div>} */}
            
        </div>
    )

})

export default SelectUstensil


