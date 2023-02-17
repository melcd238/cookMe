import { data } from "./data"

export async function seedTestRecipes (){
    await fetch('https://restapi.fr/api/recipes', {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(data)
    })
}