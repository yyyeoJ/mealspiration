import React, { useContext, useState } from 'react'
import { mealTypeContext } from '../App';
import {AiOutlineCheckCircle, AiFillCheckCircle} from 'react-icons/ai'

export const MealTypeFilter = () => {

    const {queryArray,setQueryArray,mealTypeOpen, setMealTypeOpen,healthOpen,setHealthOpen,dietOpen,setDietOpen,dishTypeOpen,setDishTypeOpen, breakfastChecked,setBreakfastChecked,brunchChecked,setBrunchChecked,lunchChecked,setLunchChecked,snackChecked,setSnackChecked,teatimeChecked,setTeatimeChecked} = useContext(mealTypeContext);


    return (

    <div className="relative flex flex-col items-center w-40 pt-5 h-3 rounded-2xl font-[Itim] text-lg">
    {/*Filter container*/}
    <button 
    className={mealTypeOpen ? "bg-[#ff4b33] p-2 w-full rounded-t-2xl" : "bg-[#ff4b33] p-2 w-full rounded-2xl"}
    onClick={()=>{setMealTypeOpen(!mealTypeOpen),setHealthOpen(false),setDietOpen(false),setDishTypeOpen(false)}}
    >Meal type</button>

    {/*filter options container */}
    <div className={mealTypeOpen ? "flex flex-col w-40 align-center bg-[#ff604b] rounded-b-2xl border-t-4 border-white" : "hidden"}>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{
                if(breakfastChecked === false && !queryArray.includes("&mealType=Breakfast")){
                    setQueryArray([...queryArray,"&mealType=Breakfast"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&mealType=Breakfast");
                 setQueryArray([...tempArray])
                }
                setBreakfastChecked(!breakfastChecked)
                }}
                checked={breakfastChecked} className="appearance-none" id="breakfast" type="checkbox" />
            <label className="flex items-center" htmlFor="breakfast" >{breakfastChecked ? <><AiFillCheckCircle/><span className="pl-2">Breakfast</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Breakfast</span></>}</label>
            
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{

                if(brunchChecked === false && !queryArray.includes("&mealType=Brunch")){
                    setQueryArray([...queryArray,"&mealType=Brunch"])
                }else{
                const tempArray = queryArray.filter(query => query !== "&mealType=Brunch");
                setQueryArray([...tempArray])
                }

                setBrunchChecked(!brunchChecked)
                
                }} checked={brunchChecked}  className="appearance-none" id="brunch" type="checkbox" />
            <label className="flex items-center" htmlFor="brunch" >{brunchChecked ? <><AiFillCheckCircle/><span className="pl-2">Brunch</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Brunch</span></>}</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{

                if(lunchChecked === false && !queryArray.includes("&mealType=Lunch")){
                    setQueryArray([...queryArray,"&mealType=Lunch"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&mealType=Lunch");
                 setQueryArray([...tempArray])
                }
                
                setLunchChecked(!lunchChecked)
                }} checked={lunchChecked}  className="appearance-none" id="lunch" type="checkbox" />
            <label className="flex items-center" htmlFor="lunch" >{lunchChecked ? <><AiFillCheckCircle/><span className="pl-2">Lunch/Dinner</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Lunch/Dinner</span></>}</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{

                if(snackChecked === false && !queryArray.includes("&mealType=Snack")){
                    setQueryArray([...queryArray,"&mealType=Snack"])
                }else{
                const tempArray = queryArray.filter(query => query !== "&mealType=Snack");
                setQueryArray([...tempArray])
                }

                setSnackChecked(!snackChecked)
            }} checked={snackChecked}  className="appearance-none" id="snack" type="checkbox" />
            <label className="flex items-center" htmlFor="snack" >{snackChecked ? <><AiFillCheckCircle/><span className="pl-2">Snack</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Snack</span></>}</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{

                if(teatimeChecked === false && !queryArray.includes("&mealType=Teatime")){
                    setQueryArray([...queryArray,"&mealType=Teatime"])
                }else{
                const tempArray = queryArray.filter(query => query !== "&mealType=Teatime");
                setQueryArray([...tempArray])
                }


                setTeatimeChecked(!teatimeChecked)
            }} checked={teatimeChecked}  className="appearance-none" id="teatime" type="checkbox" />
            <label className="flex items-center" htmlFor="teatime" >{teatimeChecked ? <><AiFillCheckCircle/><span className="pl-2">Tea time</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Tea time</span></>}</label>
        </div>
        
    </div>
</div>

  )
}

export default MealTypeFilter