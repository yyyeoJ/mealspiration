import React, { useContext, useState } from 'react'
import { dietContext } from '../App';

export const DietFilter = () => {

    const {queryArray,setQueryArray,mealTypeOpen, setMealTypeOpen,healthOpen,setHealthOpen,dietOpen,setDietOpen,dishTypeOpen,setDishTypeOpen,veganChecked,setVeganChecked,vegetarianChecked,setVegetarianChecked,ketoChecked,setKetoChecked,kosherChecked,setKosherChecked,paleoChecked,setPaleoChecked} = useContext(dietContext);

    return (

    <div className="relative flex flex-col items-center w-56 pt-5 h-3 rounded-2xl">
    {/*Filter container*/}
    <button 
    className={dietOpen ? "bg-blue-500 p-2 w-full rounded-t-2xl" : "bg-blue-500 p-2 w-full rounded-2xl"}
    onClick={()=>{setDietOpen(!dietOpen),setMealTypeOpen(false),setHealthOpen(false),setDishTypeOpen(false)}}
    >Diet</button>

    {/*filter options container */}
    <div className={dietOpen ? "flex flex-col w-56 align-center bg-blue-500 rounded-b-2xl" : "hidden"}>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{
                if(veganChecked === false && !queryArray.includes("&health=vegan")){
                    setQueryArray([...queryArray,"&health=vegan"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&health=vegan");
                 setQueryArray([...tempArray])
                }
                setVeganChecked(!veganChecked)
                }} checked={veganChecked} className="" id="vegan" type="checkbox" />
            <label className="" htmlFor="vegan" >Vegan</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{
                if(vegetarianChecked === false && !queryArray.includes("&health=vegetarian")){
                    setQueryArray([...queryArray,"&health=vegetarian"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&health=vegetarian");
                 setQueryArray([...tempArray])
                }
                setVegetarianChecked(!vegetarianChecked)
                }} checked={vegetarianChecked}  className="" id="vegetarian" type="checkbox" />
            <label className="" htmlFor="vegetarian" >Vegetarian</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{
                if(ketoChecked === false && !queryArray.includes("&health=keto-friendly")){
                    setQueryArray([...queryArray,"&health=keto-friendly"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&health=keto-friendly");
                 setQueryArray([...tempArray])
                }
                setKetoChecked(!ketoChecked)
                }} checked={ketoChecked}  className="" id="keto" type="checkbox" />
            <label className="" htmlFor="keto" >Keto</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{
                if(kosherChecked === false && !queryArray.includes("&health=kosher")){
                    setQueryArray([...queryArray,"&health=kosher"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&health=kosher");
                 setQueryArray([...tempArray])
                }
                setKosherChecked(!kosherChecked)
                }} checked={kosherChecked}  className="" id="kosher" type="checkbox" />
            <label className="" htmlFor="kosher" >Kosher</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{
                if(paleoChecked === false && !queryArray.includes("&health=paleo")){
                    setQueryArray([...queryArray,"&health=paleo"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&health=paleo");
                 setQueryArray([...tempArray])
                }
                setPaleoChecked(!paleoChecked)
                }} checked={paleoChecked}  className="" id="paleo" type="checkbox" />
            <label className="" htmlFor="paleo" >Paleo</label>
        </div>
        
    </div>
</div>

  )
}

export default DietFilter