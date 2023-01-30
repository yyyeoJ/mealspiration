import React, { useContext } from 'react'
import { dishTypeContext } from '../App'

const DishTypeFilter = () => {

    const {mealTypeOpen, setMealTypeOpen,healthOpen,setHealthOpen,dietOpen,setDietOpen,dishTypeOpen,setDishTypeOpen,mainChecked,setMainChecked,sideChecked,setSideChecked,dessertChecked,setDessertChecked,drinksChecked,setDrinksChecked} = useContext(dishTypeContext);

    return (
    <div className="relative flex flex-col items-center w-56 pt-5 h-3 rounded-2xl">
    {/*Filter container*/}
    <button 
    className={dishTypeOpen ? "bg-blue-500 p-2 w-full rounded-t-2xl" : "bg-blue-500 p-2 w-full rounded-2xl"}
    onClick={()=>{setDishTypeOpen(!dishTypeOpen),setMealTypeOpen(false),setHealthOpen(false),setDietOpen(false)}}
    >Dish type</button>

    {/*filter options container */}
    <div className={dishTypeOpen ? "flex flex-col w-56 align-center bg-blue-500 rounded-b-2xl" : "hidden"}>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{setMainChecked(!mainChecked)}} checked={mainChecked} className="" id="maincourse" type="checkbox" />
            <label className="" htmlFor="maincourse" >Main course</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{setSideChecked(!sideChecked)}} checked={sideChecked}  className="" id="sidedish" type="checkbox" />
            <label className="" htmlFor="sidedish" >Side dish</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{setDessertChecked(!dessertChecked)}} checked={dessertChecked}  className="" id="dessert" type="checkbox" />
            <label className="" htmlFor="dessert" >Dessert</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{setDrinksChecked(!drinksChecked)}} checked={drinksChecked}  className="" id="drinks" type="checkbox" />
            <label className="" htmlFor="drinks" >Drinks</label>
        </div>
        
    </div>
</div>
  )
}

export default DishTypeFilter