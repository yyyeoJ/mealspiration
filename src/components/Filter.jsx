import React, { useContext } from 'react'
import { filterContext } from '../App'
import {BsFillTriangleFill} from 'react-icons/bs'
import {AiOutlineCheckCircle, AiFillCheckCircle} from 'react-icons/ai'



const Filter = () => {

    

    const {queryArray,setQueryArray,breakfastChecked,setBreakfastChecked,brunchChecked,setBrunchChecked,
        lunchChecked,setLunchChecked,snackChecked,setSnackChecked,teatimeChecked,setTeatimeChecked,
        alcoholfreeChecked,setAlcoholfreeChecked,dairyfreeChecked,setDairyfreeChecked,glutenfreeChecked,
        setGlutenfreeChecked,peanutfreeChecked,setPeanutfreeChecked,lowsugarChecked,setLowsugarchecked,
        veganChecked,setVeganChecked,vegetarianChecked,setVegetarianChecked,ketoChecked,setKetoChecked,
        kosherChecked,setKosherChecked,paleoChecked,setPaleoChecked,mainChecked,setMainChecked,
        sideChecked,setSideChecked,dessertChecked,setDessertChecked,drinksChecked,setDrinksChecked
    } = useContext(filterContext);

    

  return (
    
    <div className=" shadow shadow-black relative rounded-2xl font-[Itim] text-lg w-52 overflow-hidden">
        <input className=" peer absolute top-0 inset-x-0 w-full h-10 opacity-0 z-10" type="checkbox" />
        <div className="bg-[#ff4b33] h-10 w-full pl-5 flex items-center">
            <h1>Filter</h1>
        </div>

        <div className="absolute top-3 right-3 dark:text-white text-black transition-transform 
                        duration-500 rotate-0 peer-checked:rotate-180"><BsFillTriangleFill/></div>
        
        {/*Content*/}
        <div className=" text-black bg-white overflow-y-scroll transition-all duration-500 max-h-0 peer-checked:max-h-52">
            
            <div className='text-center border-black border-b-2'>Meal Type</div>
             
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
                <label className="cursor-pointer flex items-center" htmlFor="breakfast" >{breakfastChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Breakfast</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Breakfast</span></>}</label>
                
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
                <label className="cursor-pointer flex items-center" htmlFor="brunch" >{brunchChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Brunch</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Brunch</span></>}</label>
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
                <label className="cursor-pointer flex items-center" htmlFor="lunch" >{lunchChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Lunch/Dinner</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Lunch/Dinner</span></>}</label>
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
                <label className="cursor-pointer flex items-center" htmlFor="snack" >{snackChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Snack</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Snack</span></>}</label>
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
                <label className="cursor-pointer flex items-center" htmlFor="teatime" >{teatimeChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Tea time</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Tea time</span></>}</label>
            </div>

            <div className='text-center border-black border-b-2 border-t-2'>Health Concerns</div>

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
                <label className="flex items-center cursor-pointer" htmlFor="alcoholfree" >{alcoholfreeChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Alcohol-free</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Alcohol-free</span></>}</label>
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
                <label className="flex items-center cursor-pointer" htmlFor="dairyfree" >{dairyfreeChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Dairy-fre</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Dairy-fre</span></>}</label>
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
                <label className="flex items-center cursor-pointer" htmlFor="glutenfree" >{glutenfreeChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Gluten-free</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Gluten-free</span></>}</label>
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
                <label className="flex items-center cursor-pointer" htmlFor="peanutfree" >{peanutfreeChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Peanut-free</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Peanut-free</span></>}</label>
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
                <label className="flex items-center cursor-pointer" htmlFor="lowsugar" >{lowsugarChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Low sugar</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Low sugar</span></>}</label>
            </div>


            <div className='text-center border-black border-b-2 border-t-2'>Diets</div>

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
                <label className="flex items-center cursor-pointer" htmlFor="vegan" >{veganChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Vegan</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Vegan</span></>}</label>
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
                <label className="flex items-center cursor-pointer" htmlFor="vegetarian" >{vegetarianChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Vegetarian</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Vegetarian</span></>}</label>
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
                <label className="flex items-center cursor-pointer" htmlFor="keto" >{ketoChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Keto</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Keto</span></>}</label>
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
                <label className="flex items-center cursor-pointer" htmlFor="kosher" >{kosherChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Kosher</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Kosher</span></>}</label>
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
                <label className="flex items-center cursor-pointer" htmlFor="paleo" >{paleoChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Paleo</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Paleo</span></>}</label>
            </div>


            <div className='text-center border-black border-b-2 border-t-2'>Dish type</div>

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
                <label className="flex items-center cursor-pointer" htmlFor="maincourse" >{mainChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Main course</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Main course</span></>}</label>
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
                <label className="flex items-center cursor-pointer" htmlFor="sidedish" >{sideChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Side dish</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Side dish</span></>}</label>
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
                <label className="flex items-center cursor-pointer" htmlFor="dessert" >{dessertChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Dessert</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Dessert</span></>}</label>
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
                <label className="flex items-center cursor-pointer" htmlFor="drinks" >{drinksChecked ? <><AiFillCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Drinks</span></> : <><AiOutlineCheckCircle className='text-[#ff4b33]'/><span className="pl-2">Drinks</span></>}</label>
            </div>

        </div>

    </div>

  )
}

export default Filter