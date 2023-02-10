import React, { useState } from 'react'
import {FaHeart,FaRegHeart} from "react-icons/fa";
import {BsFillCircleFill, BsFillTriangleFill} from "react-icons/bs"
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


    <div className="animate-appearUp dark:bg-[#282828] bg-[#ffffff] shadow-2xl shadow-black rounded-2xl flex flex-col justify-center align-center w-[20rem] md:w-[18rem] h-full gap-2 pb-2 font-[Itim]">
      
      <img className="shadow-black w-full rounded-t-2xl" src={image} alt="" />
      <div className="pb-2 px-2 text-lg md:text-2xl text-center border-b-2 border-black dark:border-white">{label}</div>
      <div className="px-2 text-sm md:text-md text-center"><span className="md:text-xl text-lg">{servings}</span> servings</div>
      <div className="px-2 text-lg md:text-xl text-center border-b-2 border-black dark:border-white pb-2"><span className="md:text-4xl text-3xl">{Math.floor(kcal / servings)}</span>Kcal</div>
      <div className="px-2 text-lg md:text-xl pl-10 text-left relative"><BsFillCircleFill className="inline text-[#39a275] mr-2 text-lg"/>Protein: <span className="text-right absolute right-16"><span className="md:text-2xl text-xl">{Math.floor(protein / servings)}</span>g</span> </div>
      <div className="px-2 text-lg md:text-xl pl-10 text-left relative"><BsFillCircleFill className="inline  mr-2 text-lg text-[#fecf6a]"/>Carbs: <span className="md:text-2xl text-xl text-right absolute right-16"><span className="md:text-2xl text-xl">{Math.floor(carbs / servings)}</span>g</span></div>
      <div className="px-2 text-lg md:text-xl pl-10 text-left relative border-b-2 border-black dark:border-white pb-3" ><BsFillCircleFill className="inline  text-[#ff4b33] mr-2 text-lg"/>Fat: <span className="md:text-2xl text-xl text-right absolute right-16"><span className="md:text-2xl text-xl">{Math.floor(fat / servings)}</span>g</span></div>

      {/*Ingredients */}
      <div className="relative font-[Itim] text-lg w-full overflow-hidden border-b-2 border-black dark:border-white pb-2">
        <input className=" peer absolute top-0 inset-x-0 w-full h-10 opacity-0 z-10" type="checkbox" />
        <div className="h-10 w-full pl-12 flex items-center peer-checked:pl-5 transition-all duration-500">
            <h1>Ingredients</h1>
        </div>

        <div className="absolute top-3 right-16 dark:text-white text-black transition-all
                        duration-500 rotate-0 peer-checked:rotate-180"><BsFillTriangleFill/></div>

        {/*Content*/}
        <div className=" text-black dark:text-white transition-all duration-500 max-h-0 peer-checked:max-h-[100rem]">
            <ul className="list-disc list-inside">{ingredientlines.map((ingredient)=>{return <li key={Math.random()} className="px-5 pt-1">{ingredient}</li>})}</ul>
        </div>

      </div>



      {/*Buttons container */}
      <div className="flex align-start items-center align-center justify-center gap-5 pt-5 pb-2">
        <button className="relative left-2 bg-[#ff4b33] rounded-2xl p-1 w-36 h-12 md:h-10 text-md md:text-lg md:w-40"><a href={url} target="_blank">Check recipe</a></button>
        <button className="bg-[#c0bfbf] dark:bg-white rounded-2xl p-2 w-16 flex justify-center h-12 md:h-10 items-center text-lg"><FaRegHeart className="text-black dark:text-[#a4a4a4]"/></button>
      </div>

    </div>
  )
}

export default Card