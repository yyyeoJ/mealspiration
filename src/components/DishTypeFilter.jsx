import React, { useContext } from 'react'
import { dishTypeContext } from '../App'
import {AiOutlineCheckCircle, AiFillCheckCircle} from 'react-icons/ai'

const DishTypeFilter = () => {

    const {queryArray,setQueryArray,mealTypeOpen, setMealTypeOpen,healthOpen,setHealthOpen,dietOpen,setDietOpen,dishTypeOpen,setDishTypeOpen,mainChecked,setMainChecked,sideChecked,setSideChecked,dessertChecked,setDessertChecked,drinksChecked,setDrinksChecked} = useContext(dishTypeContext);

    return (
    <div className="relative flex flex-col items-center w-40 pt-5 h-3 rounded-2xl font-[Itim] text-lg">
    {/*Filter container*/}
    <button 
    className={dishTypeOpen ? "bg-[#ff4b33] p-2 w-full rounded-t-2xl" : "bg-[#ff4b33] p-2 w-full rounded-2xl"}
    onClick={()=>{setDishTypeOpen(!dishTypeOpen),setMealTypeOpen(false),setHealthOpen(false),setDietOpen(false)}}
    >Dish type</button>

    {/*filter options container */}
    <div className={dishTypeOpen ? "flex flex-col w-40 align-center bg-[#ff604b] rounded-b-2xl border-t-4 border-white" : "hidden"}>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{
                if(mainChecked === false && !queryArray.includes("&dishType=Main%20course")){
                    setQueryArray([...queryArray,"&dishType=Main%20course"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&dishType=Main%20course");
                 setQueryArray([...tempArray])
                }
                setMainChecked(!mainChecked)
                }} checked={mainChecked} className="appearance-none" id="maincourse" type="checkbox" />
            <label className="flex items-center" htmlFor="maincourse" >{mainChecked ? <><AiFillCheckCircle/><span className="pl-2">Main course</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Main course</span></>}</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{
                if(sideChecked === false && !queryArray.includes("&dishType=Side%20dish")){
                    setQueryArray([...queryArray,"&dishType=Side%20dish"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&dishType=Side%20dish");
                 setQueryArray([...tempArray])
                }
                setSideChecked(!sideChecked)
                }} checked={sideChecked}  className="appearance-none" id="sidedish" type="checkbox" />
            <label className="flex items-center" htmlFor="sidedish" >{sideChecked ? <><AiFillCheckCircle/><span className="pl-2">Side dish</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Side dish</span></>}</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{
                if(dessertChecked === false && !queryArray.includes("&dishType=Desserts")){
                    setQueryArray([...queryArray,"&dishType=Desserts"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&dishType=Desserts");
                 setQueryArray([...tempArray])
                }
                setDessertChecked(!dessertChecked)
                }} checked={dessertChecked}  className="appearance-none" id="dessert" type="checkbox" />
            <label className="flex items-center" htmlFor="dessert" >{dessertChecked ? <><AiFillCheckCircle/><span className="pl-2">Dessert</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Dessert</span></>}</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{
                if(drinksChecked === false && !queryArray.includes("&dishType=Drinks")){
                    setQueryArray([...queryArray,"&dishType=Drinks"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&dishType=Drinks");
                 setQueryArray([...tempArray])
                }
                setDrinksChecked(!drinksChecked)
            }} checked={drinksChecked}  className="appearance-none" id="drinks" type="checkbox" />
            <label className="flex items-center" htmlFor="drinks" >{drinksChecked ? <><AiFillCheckCircle/><span className="pl-2">Drinks</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Drinks</span></>}</label>
        </div>
        
    </div>
</div>
  )
}

export default DishTypeFilter