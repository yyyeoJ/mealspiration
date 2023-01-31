import React, { useState } from 'react'
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

  const [ingredientsOpen,setIngredientsOpen] = useState(false);

  return (
    <div className="bg-gray-700  shadow-2xl shadow-black rounded-2xl flex flex-col justify-center align-center w-96 h-full gap-2 pb-2">
      <img className="w-full rounded-t-2xl" src={image} alt="" />
      <div className="pb-2 px-2 border-b-2 text-xl">{label}</div>
      <div className="px-2">{kcal} Calories ({Math.floor(kcal / servings)}Kcal / serving)</div>
      <div className="px-2">Protein: {protein}g ({Math.floor(protein / servings)}g / serving)</div>
      <div className="px-2">Carbs: {carbs}g ({Math.floor(carbs / servings)}g / serving)</div>
      <div className="px-2">Fat: {fat}g ({Math.floor(fat / servings)}g / serving)</div>

      <div className="border-b-2 px-2 pb-2">{servings} servings</div>
     
      <button 
      className="relative top-2 left-2 self-start bg-blue-500 rounded-2xl px-3 py-1 w-auto"
      onClick={()=>{
        setIngredientsOpen(!ingredientsOpen)}}
      >Ingredients</button>
      {ingredientsOpen && ingredientlines.map((ingredient)=>{return <div className="px-2 pt-2">{ingredient}</div>})}


      {/*Buttons container */}
      <div className="flex align-start items-start align-start justify-start gap-5 pt-5">
        <button className="relative left-2 bg-blue-500 rounded-2xl w-40 p-1"><a href={url} target="_blank">Check recipe</a></button>
        <button className="bg-blue-500 rounded-2xl p-2"><FaHeart/></button>
      </div>

    </div>
  )
}

export default Card