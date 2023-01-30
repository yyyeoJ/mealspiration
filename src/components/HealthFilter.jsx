import React, { useContext } from 'react'
import { healthContext } from '../App'

const HealthFilter = () => {

    const {mealTypeOpen, setMealTypeOpen,healthOpen,setHealthOpen,dietOpen,setDietOpen,dishTypeOpen,setDishTypeOpen,alcoholfreeChecked,setAlcoholfreeChecked,dairyfreeChecked,setDairyfreeChecked,glutenfreeChecked,setGlutenfreeChecked,peanutfreeChecked,setPeanutfreeChecked,lowsugarChecked,setLowsugarchecked} = useContext(healthContext);

    return (
    <div className="relative flex flex-col items-center w-56 pt-5 h-3 rounded-2xl">
    {/*Filter container*/}
    <button 
    className={healthOpen ? "bg-blue-500 p-2 w-full rounded-t-2xl" : "bg-blue-500 p-2 w-full rounded-2xl"}
    onClick={()=>{setHealthOpen(!healthOpen),setMealTypeOpen(false),setDietOpen(false),setDishTypeOpen(false)}}
    >Health concerns</button>

    {/*filter options container */}
    <div className={healthOpen ? "flex flex-col w-56 align-center bg-blue-500 rounded-b-2xl" : "hidden"}>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{setAlcoholfreeChecked(!alcoholfreeChecked)}} checked={alcoholfreeChecked} className="" id="alcoholfree" type="checkbox" />
            <label className="" htmlFor="alcoholfree" >Alcohol-free</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{setDairyfreeChecked(!dairyfreeChecked)}} checked={dairyfreeChecked}  className="" id="dairyfree" type="checkbox" />
            <label className="" htmlFor="dairyfree" >Dairy-free</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{setGlutenfreeChecked(!glutenfreeChecked)}} checked={glutenfreeChecked}  className="" id="glutenfree" type="checkbox" />
            <label className="" htmlFor="glutenfree" >Gluten-free</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{setPeanutfreeChecked(!peanutfreeChecked)}} checked={peanutfreeChecked}  className="" id="peanutfree" type="checkbox" />
            <label className="" htmlFor="peanutfree" >Peanut-free</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-16 pb-2">
            <input onChange={()=>{setLowsugarchecked(!lowsugarChecked)}} checked={lowsugarChecked}  className="" id="lowsugar" type="checkbox" />
            <label className="" htmlFor="lowsugar" >Low sugar</label>
        </div>
        
    </div>
</div>
  )
}

export default HealthFilter