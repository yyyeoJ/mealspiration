import React from 'react'
import {FaHeart} from "react-icons/fa";
const Card = (props) => {

  const image = props.data.recipe.image;
  const label = props.data.recipe.label;
  const kcal =  Math.round(props.data.recipe.calories);
  const servings = Math.round(props.data.recipe.yield);
  const protein = Math.round(props.data.recipe.totalNutrients.PROCNT.quantity);
  const carbs = Math.round(props.data.recipe.totalNutrients['CHOCDF.net'].quantity);
  const fat = Math.round(props.data.recipe.totalNutrients.FAT.quantity);
  const ingredientlines = props.data.recipe.ingredientLines;
  const url = props.data.recipe.url;



  return (
    <div className="border border-white rounded-xl flex flex-col justify-center align-center p-3">
      <img className="rounded-2xl pt-1" src={image} alt="" />
      <div className="border-b-2 text-xl">{label}</div>
      <div>{kcal} Calories ({Math.floor(kcal / servings)}Kcal / serving)</div>
      <div>Protein: {protein}g ({Math.floor(protein / servings)}g / serving)</div>
      <div>Carbs: {carbs}g ({Math.floor(carbs / servings)}g / serving)</div>
      <div>Fat: {fat}g ({Math.floor(fat / servings)}g / serving)</div>

      <div className="border-b-2">{servings} servings</div>
      <div>Ingredients:</div>
      <ul className="pb-5">
        {ingredientlines.map((ingredient)=>{
          return <li>{ingredient}</li>
        })}
      </ul>
      {/*Buttons container */}
      <div className="flex align-center items-center align-center justify-center gap-5">
        <button className="bg-blue-500 rounded-2xl w-40 p-1"><a href={url} target="_blank">Check recipe</a></button>
        <button className="bg-blue-500 rounded-2xl p-2"><FaHeart/></button>
      </div>
      

    </div>
  )
}

export default Card