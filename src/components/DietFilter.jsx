import React, { useContext, useState } from 'react'
import { dietContext } from '../App';
import {AiOutlineCheckCircle, AiFillCheckCircle} from 'react-icons/ai'

export const DietFilter = () => {

    const {queryArray,setQueryArray,mealTypeOpen, setMealTypeOpen,healthOpen,setHealthOpen,dietOpen,setDietOpen,dishTypeOpen,setDishTypeOpen,veganChecked,setVeganChecked,vegetarianChecked,setVegetarianChecked,ketoChecked,setKetoChecked,kosherChecked,setKosherChecked,paleoChecked,setPaleoChecked} = useContext(dietContext);

    return (

    <div className="relative flex flex-col items-center w-40 pt-5 h-3 rounded-2xl font-[Itim] text-lg">
    {/*Filter container*/}
    <button 
    className={dietOpen ? "bg-[#ff4b33] p-2 w-full rounded-t-2xl" : "bg-[#ff4b33] p-2 w-full rounded-2xl"}
    onClick={()=>{setDietOpen(!dietOpen),setMealTypeOpen(false),setHealthOpen(false),setDishTypeOpen(false)}}
    >Diet</button>

    {/*filter options container */}
    <div className={dietOpen ? "flex flex-col w-40 align-center bg-[#ff604b] rounded-b-2xl border-t-4 border-white" : "hidden"}>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{
                if(veganChecked === false && !queryArray.includes("&health=vegan")){
                    setQueryArray([...queryArray,"&health=vegan"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&health=vegan");
                 setQueryArray([...tempArray])
                }
                setVeganChecked(!veganChecked)
                }} checked={veganChecked} className="appearance-none" id="vegan" type="checkbox" />
            <label className="flex items-center" htmlFor="vegan" >{veganChecked ? <><AiFillCheckCircle/><span className="pl-2">Vegan</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Vegan</span></>}</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{
                if(vegetarianChecked === false && !queryArray.includes("&health=vegetarian")){
                    setQueryArray([...queryArray,"&health=vegetarian"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&health=vegetarian");
                 setQueryArray([...tempArray])
                }
                setVegetarianChecked(!vegetarianChecked)
                }} checked={vegetarianChecked}  className="appearance-none" id="vegetarian" type="checkbox" />
            <label className="flex items-center" htmlFor="vegetarian" >{vegetarianChecked ? <><AiFillCheckCircle/><span className="pl-2">Vegetarian</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Vegetarian</span></>}</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{
                if(ketoChecked === false && !queryArray.includes("&health=keto-friendly")){
                    setQueryArray([...queryArray,"&health=keto-friendly"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&health=keto-friendly");
                 setQueryArray([...tempArray])
                }
                setKetoChecked(!ketoChecked)
                }} checked={ketoChecked}  className="appearance-none" id="keto" type="checkbox" />
            <label className="flex items-center" htmlFor="keto" >{ketoChecked ? <><AiFillCheckCircle/><span className="pl-2">Keto</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Keto</span></>}</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{
                if(kosherChecked === false && !queryArray.includes("&health=kosher")){
                    setQueryArray([...queryArray,"&health=kosher"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&health=kosher");
                 setQueryArray([...tempArray])
                }
                setKosherChecked(!kosherChecked)
                }} checked={kosherChecked}  className="appearance-none" id="kosher" type="checkbox" />
            <label className="flex items-center" htmlFor="kosher" >{kosherChecked ? <><AiFillCheckCircle/><span className="pl-2">Kosher</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Kosher</span></>}</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{
                if(paleoChecked === false && !queryArray.includes("&health=paleo")){
                    setQueryArray([...queryArray,"&health=paleo"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&health=paleo");
                 setQueryArray([...tempArray])
                }
                setPaleoChecked(!paleoChecked)
                }} checked={paleoChecked}  className="appearance-none" id="paleo" type="checkbox" />
            <label className="flex items-center" htmlFor="paleo" >{paleoChecked ? <><AiFillCheckCircle/><span className="pl-2">Paleo</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Paleo</span></>}</label>
        </div>
        
    </div>
</div>

  )
}

export default DietFilter