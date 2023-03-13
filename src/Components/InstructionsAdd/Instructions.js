import styles from './Instructions.module.scss';
import  {useState, forwardRef, useImperativeHandle} from 'react'


const InstructionSteps = forwardRef((props, ref) => {
    const [steps, setSteps] = useState([]);
  
    const handleAddStep = () => {
      const newStep = { etape: steps.length + 1, content: '' };
      setSteps([...steps, newStep]);
    };
  
    const handleDeleteStep = (index) => {
      const newSteps = [...steps];
      newSteps.splice(index, 1);
      setSteps(newSteps);
      // Update step numbers
    };
  
    const handleStepChange = (index, field, value) => {
      const newSteps = [...steps];
      newSteps[index][field] = value;
      setSteps(newSteps);
    };

    useImperativeHandle(ref, () => ({
        getSelectedInstructions() {
            return steps;
        }
    }));
   
    return (
      <div>
        <label htmlFor="instructions">Instructions</label>
        {steps.map((step, index) => (
          <div key={index}>
            <input
              type="text"
              name={`instructions[${index}].etape`}
              id={`instructions[${index}].etape`}
              className={styles.inputForm}
              placeholder={`Étape ${index + 1}`}
              value={step.etape}
              onChange={(event) => handleStepChange(index, 'etape', event.target.value)}
            />
            <input
              type="text"
              name={`instructions[${index}].content`}
              id={`instructions[${index}].content`}
              className={styles.inputForm}
              placeholder="Contenu de l'étape"
              value={step.content}
              onChange={(event) => handleStepChange(index, 'content', event.target.value)}
            />
            <button type="button" onClick={() => handleDeleteStep(index)}className={styles.btnAdd} >
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddStep} className={styles.btnAdd}>
          Ajouter une étape
        </button>
      </div>
    );
  });

export default InstructionSteps;


