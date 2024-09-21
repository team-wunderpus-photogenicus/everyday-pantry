import React from 'react'; 
/* recipes =  
[
    {
        "recipeName1": {
          "ingredients": ["ingredient1", "ingredient2"],
          "instructions": "some instructions"
        },
        "recipeName2": {
          "ingredients": ["ingredient1", "ingredient3"],
          "instructions": "some instructions"
        }
      }
    ]
*/ 
const IngredientList = ({recipes}) => { 
    //cache = {'apple': 1, 'pear': 3, 'onion': 3}
    //cache for ingredientCount
    const cache ={}; 

    //for each recipe inside of the recipes, 
    //loop over each recipe[ingredients] as element 
    //element -> recipe[ingredient][0]
    //if the ingredient has shown in cache, +1 
    //if not, add it in the cache
    recipes.forEach((element) =>{
        for (let i=0; i< element.length; i++){
            if (!cache[element[i]]){
                cache[element[i]] =1; 
            }else{
                cache[element[i]] +=1; 
            }
        }
    })
}


//print out cache[key] by decensing order, only get 10 
    //step1: sort the object cache[key] 
    let sortable = [];
    for (let key in cache){
        sortable.push([key, cache[key]]) //[['apple',5], ['onion',3], ['banana', 1]]
    }
    sortable.sort(function(a,b){
        sortedObj= b[1] - a[1]
        const topIngredient = sortedObj.slice(0,10)
        return topIngredient; // ["apple", 4000], ["onion", 100], ["garlic", 28]]
    })

    return(
        <div> 
            <h2> Top 10 Ingredients </h2>
            <ul>
                {Object.keys(topIngredient)}
            </ul>
    )
} 
