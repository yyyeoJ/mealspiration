import './App.css'
import {BsSearch} from "react-icons/bs"
import { createContext, useContext, useEffect, useState } from 'react'
import Card from './components/Card';
import Filter from './components/Filter';
import testData from "./assets/testdata.json"

export const filterContext = createContext();

function App() {

  // api site  https://developer.edamam.com/edamam-docs-recipe-api

    //const [recipes,setRecipes] = useState([]);
    const recipes = testData
    const [queryArray,setQueryArray] = useState([]);
    const [inputField,setInputField] = useState("");

   
   
    const [API_URL,setAPI_URL] = useState("https://api.edamam.com/api/recipes/v2?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559&random=true");

    const searchRecipes = async (api)=>{
        let arrayString = ""
        queryArray.map((query)=>arrayString+=query)
        const res = await fetch(`${api}${arrayString}`);
        let data = await res.json();
        //setRecipes(data.hits);
    }

 

   useEffect(()=>{
        //searchRecipes(`${API_URL}&q=random`);
    },[]); 
    
    const [breakfastChecked,setBreakfastChecked] = useState(false);
    const [brunchChecked,setBrunchChecked] = useState(false);
    const [lunchChecked,setLunchChecked] = useState(false);
    const [snackChecked,setSnackChecked] = useState(false);
    const [teatimeChecked,setTeatimeChecked] = useState(false);

    const [alcoholfreeChecked, setAlcoholfreeChecked] = useState(false);
    const [dairyfreeChecked, setDairyfreeChecked] = useState(false);
    const [glutenfreeChecked, setGlutenfreeChecked] = useState(false);
    const [peanutfreeChecked, setPeanutfreeChecked] = useState(false);
    const [lowsugarChecked, setLowsugarchecked] = useState(false);

    const [veganChecked,setVeganChecked] = useState(false);
    const [vegetarianChecked,setVegetarianChecked] = useState(false);
    const [ketoChecked,setKetoChecked] = useState(false);
    const [kosherChecked,setKosherChecked] = useState(false);
    const [paleoChecked,setPaleoChecked] = useState(false);

    const [mainChecked,setMainChecked] = useState(false);
    const [sideChecked,setSideChecked] = useState(false);
    const [dessertChecked,setDessertChecked] = useState(false);
    const [drinksChecked,setDrinksChecked] = useState(false);

    


    return (


    <div className="App h-screen w-screen dark:bg-[#181818] bg-[#fcfbdc] dark:text-white text-black overflow-x-hidden">
    {/*App div*/}

        {/*Main container*/}
        <div className="transition-all duration-1000 flex flex-col items-center pt-10 pb-10">

            <h1 className="animate-appearDown font-bold font-[Unbounded] text-3xl md:text-7xl pb-12 text-center"><span className='text-[#ff4b33]'>Meal</span>Spiration</h1>
            <p className="animate-appearDown font-[Tangerine] text-2xl md:text-4xl text-center pb-16 italic">"A recipe is a story that ends with a good meal."</p>

            {/*Input container*/}
            <div className="flex flex-col gap-5 md:flex-row items-center">

                {/*Search container*/}
                <div className="relative animate-appearDown input-group flex flex-row items-center align-center justify-center">
                    <input 
                    placeholder="Search for a recipe" 
                    value={inputField}
                    className="font-[Itim] h-10 w-72 px-5 shadow shadow-black focus:outline-none text-black text-lg  rounded-2xl" type="text" 
                    onChange={(e)=>{
                        setInputField(e.target.value);
                    }}
                    onKeyDown={(e)=>{
                        if(e.key === 'Enter'){
                            if(inputField === ""){
                                searchRecipes(`${API_URL}&q=random`)
                            }else{
                                let tempString = inputField
                                tempString = tempString.replace(/\s/g, "%20")
                                searchRecipes(`${API_URL}&q=${tempString}`)
                                
                            }
                        }
                    }}
                    />
                    <button 
                    className="shadow shadow-black w-10 h-10 absolute right-0 bg-[#ff4b33] flex items-center justify-center rounded-2xl"
                    onClick={()=>{
                        if(inputField === ""){
                            searchRecipes(`${API_URL}&q=random`)
                        }else{
                            let tempString = inputField
                            tempString = tempString.replace(/\s/g, "%20")
                            searchRecipes(`${API_URL}&q=${tempString}`)
                            
                        }
                        
                    }}
                    ><BsSearch className="w-5 h-5"/></button>
                </div>
                
                {/*Filters*/}
                <div className="animate-appearDown inline gap-5">

                    <filterContext.Provider value={{setQueryArray,queryArray,breakfastChecked,setBreakfastChecked,brunchChecked,setBrunchChecked,
                                                    lunchChecked,setLunchChecked,snackChecked,setSnackChecked,teatimeChecked,setTeatimeChecked,
                                                    alcoholfreeChecked,setAlcoholfreeChecked,dairyfreeChecked,setDairyfreeChecked,glutenfreeChecked,
                                                    setGlutenfreeChecked,peanutfreeChecked,setPeanutfreeChecked,lowsugarChecked,setLowsugarchecked,
                                                    veganChecked,setVeganChecked,vegetarianChecked,setVegetarianChecked,ketoChecked,setKetoChecked,
                                                    kosherChecked,setKosherChecked,paleoChecked,setPaleoChecked,mainChecked,setMainChecked,
                                                    sideChecked,setSideChecked,dessertChecked,setDessertChecked,drinksChecked,setDrinksChecked
                                                    }}>
                        <Filter/>
                    </filterContext.Provider>

                </div>

            </div>
            
            {/*Cards container*/}
            <div className=" max-w-[80rem] pt-20 gap-7 w-full flex flex-row flex-wrap justify-center items-stretch">
                {/*<Card data={testdata}/>*/}
                {
                
                recipes.map((recipe)=>{return <Card key={recipe.recipe.uri} data={recipe}/>})
                    
                }
            </div>

        </div>

      

    </div>

  )
}

export default App
