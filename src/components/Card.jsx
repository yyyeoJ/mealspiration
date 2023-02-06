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
    <div className="animate-appearUp dark:bg-[#282828] bg-[#ffffff] shadow-2xl shadow-black rounded-2xl flex flex-col justify-center align-center w-[17rem] md:w-[18rem] h-full gap-2 pb-2 font-[Itim]">
      <img className="shadow-black w-full rounded-t-2xl" src={image} alt="" />
      <div className="pb-2 px-2 border-b-2 text-lg md:text-2xl">{label}</div>
      <div className="px-2 text-lg md:text-2xl"><span className='text-[#ff4b33]'>{kcal}</span> Kcal (<span className='text-[#ff4b33]'>{Math.floor(kcal / servings)}</span> / serving)</div>
      <div className="px-2 text-md md:text-xl"><span className='text-[#ff4b33]'>{servings}</span> servings</div>
      <div className="px-2 text-md md:text-xl">Protein: <span className='text-[#ff4b33]'>{protein}</span>g (<span className='text-[#ff4b33]'>{Math.floor(protein / servings)}</span> / serving)</div>
      <div className="px-2 text-md md:text-xl">Carbs: <span className='text-[#ff4b33]'>{carbs}</span>g (<span className='text-[#ff4b33]'>{Math.floor(carbs / servings)}</span> / serving)</div>
      <div className="px-2 text-md md:text-xl border-b-2 pb-2">Fat: <span className='text-[#ff4b33]'>{fat}</span>g (<span className='text-[#ff4b33]'>{Math.floor(fat / servings)}</span> / serving)</div>

     <span className='text-[#ff4b33]'></span>
      <button 
      className="relative top-2 left-2 self-start bg-[#ff4b33] rounded-2xl px-3 py-1 w-15 text-md md:text-lg md:w-auto"
      onClick={()=>{
        setIngredientsOpen(!ingredientsOpen)}}
      >Ingredients</button>
      {ingredientsOpen && <ul className="list-disc list-inside border-b border-white">{ingredientlines.map((ingredient)=>{return <li className="px-2 pt-2">{ingredient}</li>})}</ul>}


      {/*Buttons container */}
      <div className="flex align-start items-start align-start justify-start gap-5 pt-5">
        <button className="relative left-2 bg-[#ff4b33] rounded-2xl p-1 w-15 text-md md:text-lg md:w-40"><a href={url} target="_blank">Check recipe</a></button>
        <button className="bg-[#ff4b33] rounded-2xl p-2 hidden"><FaHeart/></button>
      </div>

    </div>
  )
}

export default Card