import React, { useContext, useState } from 'react'
import { mealTypeContext } from '../App';

export const MealTypeFilter = () => {

    const {mealTypeOpen, setMealTypeOpen,healthOpen,setHealthOpen,dietOpen,setDietOpen,dishTypeOpen,setDishTypeOpen, breakfastChecked,setBreakfastChecked,brunchChecked,setBrunchChecked,lunchChecked,setLunchChecked,snackChecked,setSnackChecked,teatimeChecked,setTeatimeChecked} = useContext(mealTypeContext);

    return (

    <div className="relative flex flex-col items-center w-56 pt-5 h-3 rounded-2xl">
    {/*Filter container*/}
    <button 
    className={mealTypeOpen ? "bg-blue-500 p-2 w-full rounded-t-2xl" : "bg-blue-500 p-2 w-full rounded-2xl"}
    onClick={()=>{setMealTypeOpen(!mealTypeOpen),setHealthOpen(false),setDietOpen(false),setDishTypeOpen(false)}}
    >Meal type</button>

    {/*filter options container */}
    <div className={mealTypeOpen ? "flex flex-col w-56 align-center bg-blue-500 rounded-b-2xl" : "hidden"}>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{setBreakfastChecked(!breakfastChecked)}} checked={breakfastChecked} className="" id="breakfast" type="checkbox" />
            <label className="" htmlFor="breakfast" >Breakfast</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{setBrunchChecked(!brunchChecked)}} checked={brunchChecked}  className="" id="brunch" type="checkbox" />
            <label className="" htmlFor="brunch" >Brunch</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{setLunchChecked(!lunchChecked)}} checked={lunchChecked}  className="" id="lunch" type="checkbox" />
            <label className="" htmlFor="lunch" >Lunch / Dinner</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{setSnackChecked(!snackChecked)}} checked={snackChecked}  className="" id="snack" type="checkbox" />
            <label className="" htmlFor="snack" >Snack</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{setTeatimeChecked(!teatimeChecked)}} checked={teatimeChecked}  className="" id="teatime" type="checkbox" />
            <label className="" htmlFor="teatime" >Teatime</label>
        </div>
        
    </div>
</div>

  )
}

export default MealTypeFilter