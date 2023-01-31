import React, { useContext } from 'react'
import { healthContext } from '../App'
import {AiOutlineCheckCircle, AiFillCheckCircle} from 'react-icons/ai'

const HealthFilter = () => {

    const {queryArray,setQueryArray,mealTypeOpen, setMealTypeOpen,healthOpen,setHealthOpen,dietOpen,setDietOpen,dishTypeOpen,setDishTypeOpen,alcoholfreeChecked,setAlcoholfreeChecked,dairyfreeChecked,setDairyfreeChecked,glutenfreeChecked,setGlutenfreeChecked,peanutfreeChecked,setPeanutfreeChecked,lowsugarChecked,setLowsugarchecked} = useContext(healthContext);

    return (
    <div className="relative flex flex-col items-center w-40 pt-5 h-3 rounded-2xl font-[Itim] text-lg">
    {/*Filter container*/}
    <button 
    className={healthOpen ? "bg-[#ff4b33] p-2 w-full rounded-t-2xl" : "bg-[#ff4b33] p-2 w-full rounded-2xl"}
    onClick={()=>{setHealthOpen(!healthOpen),setMealTypeOpen(false),setDietOpen(false),setDishTypeOpen(false)}}
    >Health concerns</button>

    {/*filter options container */}
    <div className={healthOpen ? "flex flex-col w-40 align-center bg-[#ff604b] rounded-b-2xl border-t-4 border-white" : "hidden"}>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{
                
                if(alcoholfreeChecked === false && !queryArray.includes("&health=alcohol-free")){
                    setQueryArray([...queryArray,"&health=alcohol-free"])
                }else{
                 const tempArray = queryArray.filter(query => query !== "&health=alcohol-free");
                 setQueryArray([...tempArray])
                }

                setAlcoholfreeChecked(!alcoholfreeChecked)
            }} checked={alcoholfreeChecked} className="appearance-none" id="alcoholfree" type="checkbox" />
            <label className="flex items-center" htmlFor="alcoholfree" >{alcoholfreeChecked ? <><AiFillCheckCircle/><span className="pl-2">Alcohol-free</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Alcohol-free</span></>}</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{

                if(dairyfreeChecked === false && !queryArray.includes("&health=dairy-free")){
                    setQueryArray([...queryArray,"&health=dairy-free"])
                }else{
                const tempArray = queryArray.filter(query => query !== "&health=dairy-free");
                setQueryArray([...tempArray])
                }


                setDairyfreeChecked(!dairyfreeChecked)
                }} checked={dairyfreeChecked}  className="appearance-none" id="dairyfree" type="checkbox" />
            <label className="flex items-center" htmlFor="dairyfree" >{dairyfreeChecked ? <><AiFillCheckCircle/><span className="pl-2">Dairy-fre</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Dairy-fre</span></>}</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{

                if(glutenfreeChecked === false && !queryArray.includes("&health=gluten-free")){
                    setQueryArray([...queryArray,"&health=gluten-free"])
                }else{
                const tempArray = queryArray.filter(query => query !== "&health=gluten-free");
                setQueryArray([...tempArray])
                }

                setGlutenfreeChecked(!glutenfreeChecked)
                }} checked={glutenfreeChecked}  className="appearance-none" id="glutenfree" type="checkbox" />
            <label className="flex items-center" htmlFor="glutenfree" >{glutenfreeChecked ? <><AiFillCheckCircle/><span className="pl-2">Gluten-free</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Gluten-free</span></>}</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{
                if(peanutfreeChecked === false && !queryArray.includes("&health=peanut-free")){
                    setQueryArray([...queryArray,"&health=peanut-free"])
                }else{
                    const tempArray = queryArray.filter(query => query !== "&health=peanut-free");
                    setQueryArray([...tempArray])
                }
                setPeanutfreeChecked(!peanutfreeChecked)
                }} checked={peanutfreeChecked}  className="appearance-none" id="peanutfree" type="checkbox" />
            <label className="flex items-center" htmlFor="peanutfree" >{peanutfreeChecked ? <><AiFillCheckCircle/><span className="pl-2">Peanut-free</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Peanut-free</span></>}</label>
        </div>
        {/*filter option*/}
        <div className="flex flex-row ml-5 pb-2">
            <input onChange={()=>{

                if(lowsugarChecked === false && !queryArray.includes("&health=sugar-conscious")){
                    setQueryArray([...queryArray,"&health=sugar-conscious"])
                }else{
                const tempArray = queryArray.filter(query => query !== "&health=sugar-conscious");
                setQueryArray([...tempArray])
                }
                setLowsugarchecked(!lowsugarChecked)
                }} checked={lowsugarChecked}  className="appearance-none" id="lowsugar" type="checkbox" />
            <label className="flex items-center" htmlFor="lowsugar" >{lowsugarChecked ? <><AiFillCheckCircle/><span className="pl-2">Low sugar</span></> : <><AiOutlineCheckCircle/><span className="pl-2">Low sugar</span></>}</label>
        </div>
        
    </div>
</div>
  )
}

export default HealthFilter