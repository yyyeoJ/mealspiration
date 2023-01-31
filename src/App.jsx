import './App.css'
import {BsSearch} from "react-icons/bs"
import { createContext, useContext, useEffect, useState } from 'react'
import Card from './components/Card';
import MealTypeFilter from './components/MealTypeFilter';
import HealthFilter from './components/HealthFilter';
import DietFilter from './components/DietFilter';
import DishTypeFilter from './components/DishTypeFilter';

export const mealTypeContext = createContext();
export const healthContext = createContext();
export const dietContext = createContext();
export const dishTypeContext = createContext();

function App() {

  // api site  https://developer.edamam.com/edamam-docs-recipe-api#/

    const [recipes,setRecipes] = useState([]);
    const [queryArray,setQueryArray] = useState([]);
    const [inputField,setInputField] = useState("");
/*
    const recipes = [
        {
            "recipe": {
                "label": "Glazed Chocolate Chip Scones with Rosemary and Cara Cara Orange",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/21d/21df1de3283170f805a22f83bfcda5b3.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=3b52872e0059e20ef7ab7274bcfea00b935b33541d240a3bcccbc3094c3e3f9b",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/21d/21df1de3283170f805a22f83bfcda5b3-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=9d4be6e9f679b2d487beaccb537787b1862123572361dbc76da1c64903815762",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/21d/21df1de3283170f805a22f83bfcda5b3-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=5e6af625651140fed882c83585f65933d36d65d1beaf090e9fcc00c4a5ab7c50",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/21d/21df1de3283170f805a22f83bfcda5b3.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=91ce591be91066715252a9a871f93ee276a2230d9a7bfb203edd130acb8c06e7",
                        "width": 300,
                        "height": 300
                    }
                },
                "url": "http://www.foodista.com/recipe/F4NN7YS6/glazed-chocolate-chip-scones-with-rosemary-and-cara-cara-orange",
                "yield": 14,
                "dietLabels": [
                    "Low-Sodium"
                ],
                "healthLabels": [
                    "Low Potassium",
                    "Kidney-Friendly",
                    "Vegetarian",
                    "Pescatarian",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Pork-Free",
                    "Red-Meat-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "Kosher"
                ],
                "ingredientLines": [
                    "For the scones:",
                    "2 cups flour",
                    "2 teaspoons baking powder",
                    "3 tablespoons sugar",
                    "pinch of kosher salt",
                    "½ teaspoon orange zest from a Cara Cara orange",
                    "1 tablespoon minced fresh rosemary",
                    "5 tablespoons butter, cut into tiny pieces",
                    "1 cup heavy cream",
                    "2 tablespoons fresh juice from a Cara Cara orange",
                    "1 cup semisweet chocolate chips",
                    "For the glaze:",
                    "1 cup powdered sugar",
                    "3 tablespoons orange juice",
                    "1 tablespoon milk"
                ],
                "calories": 3731.0339999970142,
                "mealType": [
                    "teatime"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 3731.0339999970147,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 200.707219999998,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 122.72521099999975,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 2.32738,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 57.980064999999634,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 8.20352199999959,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 476.24014999923975,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 458.2860499992504,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 17.954099999989296,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 263.20704999926573,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 249.0819999993674,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 39.66346999999092,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 480.21,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 976.1841199407547,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 981.7998124998473,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 286.25303385404595,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 1265.1252708310908,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 9.795141171873999,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 5.294603385416328,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 1600.402999999813,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 1480.5369999998795,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 38.378599999404535,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 0.5211969999989615,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 0.6233489999994916,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 4.273653999995782,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 0.27953199999945727,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 122.74299999965001,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 122.74299999965001,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 0.6165999999999999,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 2.9259999999999997,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 4.841899999999001,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 23.115499999999212,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 257.4251467698098,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/533d5e7015d3928ff8e97c1c2866f0a6?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Cook the Book: Chicken and Leek Pasties",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/aa8/aa8802fb8a61c253d0e98c36c2768e72.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=346b9ebb2a9a65e156baf46c764d7b744c0afaff1d84c219e08184e7f9b9428d",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/aa8/aa8802fb8a61c253d0e98c36c2768e72-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=830ed8bd90dc9e3640771b8c5482fc5375055911423a1e0d34ede49bbc4763ab",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/aa8/aa8802fb8a61c253d0e98c36c2768e72-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=8985d5cdf2a08d8771e8187a6cf9f1374070e8ce6e2b36b626216e63676a145e",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/aa8/aa8802fb8a61c253d0e98c36c2768e72.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=346b9ebb2a9a65e156baf46c764d7b744c0afaff1d84c219e08184e7f9b9428d",
                        "width": 300,
                        "height": 300
                    }
                },
                "url": "http://www.seriouseats.com/recipes/2011/04/chicken-and-leek-pasties-recipe.html",
                "yield": 4,
                "dietLabels": [],
                "healthLabels": [
                    "Sugar-Conscious",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Pork-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "Sulfite-Free",
                    "Immuno-Supportive"
                ],
                "ingredientLines": [
                    "For the rough puff pastry:",
                    "2 cups all-purpose flour",
                    "A pinch of sea salt",
                    "2/3 cup chilled unsalted butter, cut into small cubes",
                    "For the filling:",
                    "2 tablespoons unsalted butter",
                    "2 to 3 leeks (about 1 pound), trimmed and finely sliced",
                    "1 teaspoon coarsely chopped fresh thyme leaves",
                    "2/3 cup heavy cream",
                    "1 teaspoon English mustard",
                    "Sea salt and freshly ground black pepper",
                    "About 12 ounces boned chicken thigh and breast meat (or leftover cooked chicken), cut into thick slices",
                    "1 tablespoon canola or olive oil (if using fresh chicken)",
                    "To finish:",
                    "1 egg, lightly beaten with 1 teaspoon milk, for glazing"
                ],
                "calories": 3505.6020218058657,
                "mealType": [
                    "lunch/dinner"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 3505.6020218058657,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 241.81150047470257,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 139.38295025892796,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 6.758934360416665,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 75.06567758599176,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 12.39631947421687,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 227.52706376735142,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 215.77601656196737,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 11.75104720538404,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 13.226125037832007,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 113.29977234626026,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 978.0823948249999,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 3369.2043000055432,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 397.3231800848131,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 213.3502241231566,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 2187.946508023074,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 24.478201990251826,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 21.58083348781436,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 1317.8204452443604,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 2126.0760990006625,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 26.197477136000003,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 2.4294122607199844,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 2.320426997434419,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 32.44561876285373,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 2.645968744244699,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 898.8329493004544,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 243.83294930045437,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 385,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 8.696256765916667,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 5.006860944166667,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 11.32699906228701,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 132.73584679682227,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 603.2973187920295,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/a7e79227c6d51eb21457480d16b4bd89?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Mexican Sausage Omelet",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/e56/e569f5e78627d10bf163e3d52ece5542.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=164b5cee3988069f2b2f991792e6945254fe13d154878458c9c8243e90682884",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/e56/e569f5e78627d10bf163e3d52ece5542-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f1a9700b1fe8c28dce911ae9b9b7cce873dba9454343a5da650e089990aa5410",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/e56/e569f5e78627d10bf163e3d52ece5542-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=cd95e87e0c10f18e06f0a96284af855e9f8432dc41533df01dad5b9ff4990a10",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/e56/e569f5e78627d10bf163e3d52ece5542.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=164b5cee3988069f2b2f991792e6945254fe13d154878458c9c8243e90682884",
                        "width": 300,
                        "height": 300
                    }
                },
                "url": "https://www.allrecipes.com/recipe/262680/mexican-sausage-omelet/",
                "yield": 3,
                "dietLabels": [
                    "Low-Carb"
                ],
                "healthLabels": [
                    "Sugar-Conscious",
                    "Gluten-Free",
                    "Wheat-Free",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "Sulfite-Free"
                ],
                "ingredientLines": [
                    "3/4 pound pork sausage",
                    "1 teaspoon cayenne pepper",
                    "1/2 teaspoon red pepper flakes",
                    "1/2 teaspoon Mexican chili powder",
                    "1/2 teaspoon smoked paprika",
                    "1/2 red bell pepper, cut into matchsticks",
                    "1/2 yellow bell pepper, cut into matchsticks",
                    "1/2 medium onion, chopped",
                    "1 jalapeno pepper, seeded and minced",
                    "6 eggs, divided",
                    "3 dashes half-and-half, divided",
                    "3 tablespoons butter, divided",
                    "1/2 cup freshly grated mozzarella cheese, or to taste, divided"
                ],
                "calories": 2150.0323264241924,
                "mealType": [
                    "lunch/dinner"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 2150.0323264241924,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 176.77733217275744,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 76.40545735130219,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 1.8380642202749997,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 61.28689099645284,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 22.98441278443941,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 26.430462614068176,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 21.545598030729227,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 4.884864583338945,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 11.505645114062544,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 116.02985753506556,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 1405.8287442497522,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 3859.05100766641,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 969.6929796993052,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 139.94849051661686,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 2044.296598591161,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 9.72918704716738,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 13.952880549996781,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 1581.5858265743946,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 1255.0251215912754,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 268.8435083333334,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 0.9810661657747812,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 2.19376948375757,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 20.76318822865951,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 1.663868850074897,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 208.61957304998992,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 208.61957304998992,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 6.453179852997788,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 11.21518238499866,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 10.093164647331736,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 16.967295833345773,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 663.713375750628,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/e7ed06594cdd1928191310f60b34075a?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Fried Shallots and Fried Shallot Oil From 'Simple Thai Food'",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/ff1/ff178059765e49d263630dbe4a919f42.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e5bea77a5dcdae9296d847460d2c39b1e78995bbfdd362b02808ecf53b1828b4",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/ff1/ff178059765e49d263630dbe4a919f42-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=908699a0e43bb3c697eb25a5be88ec7b782ea26ecd3364da694aa3fbd7b8d7ec",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/ff1/ff178059765e49d263630dbe4a919f42-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=1d1b29dda61276d10a8a334aef269193873e55e7e2f4531949d35515ee32d0d8",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/ff1/ff178059765e49d263630dbe4a919f42.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e5bea77a5dcdae9296d847460d2c39b1e78995bbfdd362b02808ecf53b1828b4",
                        "width": 300,
                        "height": 300
                    },
                    "LARGE": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/ff1/ff178059765e49d263630dbe4a919f42-l.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=8b35c2991ac2afe3fcba2e2e5c8de97b36a182f8e22bef0b14ba7881efd2b0ee",
                        "width": 600,
                        "height": 600
                    }
                },
                "url": "http://www.seriouseats.com/recipes/2014/05/fried-shallots-and-fried-shallot-oil-from-simple-thai-food.html",
                "yield": 1,
                "dietLabels": [
                    "Low-Sodium"
                ],
                "healthLabels": [
                    "Vegan",
                    "Vegetarian",
                    "Pescatarian",
                    "Mediterranean",
                    "Dairy-Free",
                    "Gluten-Free",
                    "Wheat-Free",
                    "Egg-Free",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Pork-Free",
                    "Red-Meat-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "Sulfite-Free",
                    "Kosher"
                ],
                "ingredientLines": [
                    "4 shallots, about 1 ounce each, thinly sliced lengthwise",
                    "3/4 cup vegetable oil"
                ],
                "calories": 222.214902063,
                "mealType": [
                    "lunch/dinner"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 222.214902063,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 17.1095041964,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 1.12446682503925,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 0.13046450542125,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 12.25943376074725,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 2.9472391036934993,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 16.764773995200002,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 13.571483710400003,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 3.1932902848000007,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 7.853498294180001,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 2.4947580350000003,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 0,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 11.974838568000003,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 36.922418918000005,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 20.955967494000003,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 333.29967347600007,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 1.1974838568000001,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 0.3991612856000001,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 59.874192840000006,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 7.983225712000001,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 0.05987419284000001,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 0.019958064280000003,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 0.19958064280000004,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 0.34427660883000005,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 33.928709276000006,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 33.928709276000006,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 3.7480337533099997,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 0.7983225712000002,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 79.63267647720001,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/eb1a51cdf4c6215762f36b69c6ffaef8?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Crispy Cabbage With Poppy Seeds From 'The New Midwestern Table'",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/b9b/b9b4735c682f66bb35787950068ef55c.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=7f54e34f6c71edb04fb3afee3f848bd7410ad5f1ed4bf550abfa51a08fc58eb2",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/b9b/b9b4735c682f66bb35787950068ef55c-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=eaf7c619162fc850a0ea838f2498f4471fac34f55876c2419d87931e55240cff",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/b9b/b9b4735c682f66bb35787950068ef55c-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f0fc120004df5ce31ffd67a2518f92c6110e69c324c172041f68a5f695fc579e",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/b9b/b9b4735c682f66bb35787950068ef55c.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=7f54e34f6c71edb04fb3afee3f848bd7410ad5f1ed4bf550abfa51a08fc58eb2",
                        "width": 300,
                        "height": 300
                    }
                },
                "url": "http://www.seriouseats.com/recipes/2013/12/crispy-cabbage-with-poppy-seeds-from-the-new-midwestern-table.html",
                "yield": 6,
                "dietLabels": [
                    "Low-Carb"
                ],
                "healthLabels": [
                    "Sugar-Conscious",
                    "Kidney-Friendly",
                    "Keto-Friendly",
                    "Vegetarian",
                    "Pescatarian",
                    "Gluten-Free",
                    "Wheat-Free",
                    "Egg-Free",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Pork-Free",
                    "Red-Meat-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "Sulfite-Free",
                    "Kosher",
                    "Immuno-Supportive"
                ],
                "ingredientLines": [
                    "5 tablespoons salted butter",
                    "1 tablespoon minced fresh ginger",
                    "8 cups shredded cabbage",
                    "4 cloves garlic, sliced",
                    "1 tablespoon minced fresh thyme",
                    "2 teaspoons poppy seeds",
                    "1 tablespoon sesame seeds",
                    "1/2 teaspoon fine sea salt",
                    "1/4 teaspoon freshly ground black pepper"
                ],
                "calories": 756.5872499997549,
                "mealType": [
                    "lunch/dinner"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 756.5872499997549,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 65.1098249999965,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 37.58283399999904,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 2.32738,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 17.060165249999713,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 5.872790499998979,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 42.196292499942295,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 25.188817499967044,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 17.00747499997525,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 18.382719999998276,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 11.440222499989131,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 152.65,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 1550.1068309993866,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 444.87653840285554,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 130.07072034984375,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 1146.905512799767,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 5.225297715519597,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 2.4242295350114222,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 291.8224999997935,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 519.5072499996137,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 212.9023999997351,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 0.49143699999989676,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 0.30354899999920104,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 1.976094249996279,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 0.9492872499992726,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 258.44974999991587,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 258.44974999991587,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 0.1207,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 1.065,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 2.639999999999736,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 431.72127499999993,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 541.6333790698437,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/f98bbccc356fdf2f974a91c2a429da0f?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Chicken Soup with Onions and Garlic for the Endless Winter",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/e60/e60645054a39ca32d02d67dd52d73550.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=14b258120e94be2d42259d1d18b6fbe766fdbca8df261e7a5ae16bc439644442",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/e60/e60645054a39ca32d02d67dd52d73550-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ab5d7db1f5221d29d483a7922c7490c95c48da0acb4211b41e7b1367bd3cdb1e",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/e60/e60645054a39ca32d02d67dd52d73550-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=8415102aff4e7c148787d95dceed231d4105fee1e5f2ecc964e15ada466588ed",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/e60/e60645054a39ca32d02d67dd52d73550.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=14b258120e94be2d42259d1d18b6fbe766fdbca8df261e7a5ae16bc439644442",
                        "width": 300,
                        "height": 300
                    },
                    "LARGE": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/e60/e60645054a39ca32d02d67dd52d73550-l.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=6ae2ca1a8ad665163d0ff0438c9946dbce5528b3684d5181bbf22f3fa51eebb8",
                        "width": 600,
                        "height": 600
                    }
                },
                "url": "https://food52.com/recipes/27183-chicken-soup-with-onions-and-garlic-for-the-endless-winter",
                "yield": 4,
                "dietLabels": [],
                "healthLabels": [
                    "Dairy-Free",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Shellfish-Free",
                    "Pork-Free",
                    "Red-Meat-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Alcohol-Free",
                    "No oil added",
                    "Sulfite-Free",
                    "Kosher"
                ],
                "ingredientLines": [
                    "1 small chicken or whatever chicken you have frozen for stock (if you use assorted parts, you will want a couple of pounds worth)",
                    "3 scallions, trimmed",
                    "1 bunch cilantro, stalks and roots included (optional: do not scour the city for cilantro with the roots still on; feel free to make without any cilantro)",
                    "2 carrots, halved",
                    "8 whole black peppercorns",
                    "3 tablespoons fish sauce",
                    "1/2 teaspoon salt",
                    "8 small shallots, or 4 large shallots, peeled and halved",
                    "1 head of garlic, peeled and halved",
                    "1 large onion, finely chopped",
                    "1/2 pound egg noodles (straight wheat noodles are fine, though)",
                    "cilantro, chopped (optional)"
                ],
                "calories": 3275.005293565217,
                "mealType": [
                    "lunch/dinner"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 3275.005293565217,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 147.06711021584636,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 41.77153541301128,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 1.01134567285,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 59.23345016604228,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 32.608541344868904,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 267.5020432303175,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 239.3025568891025,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 28.199486341215003,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 45.357419166180335,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 218.28106805426955,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 865.5087954,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 5077.602672345333,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 562.9390971548166,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 542.1665584767165,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 4654.882799867783,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 24.750451038602165,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 19.059113818387836,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 2268.6341681215667,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 1564.76247779435,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 91.13398303283333,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 3.6092791234622337,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 2.4054862790293337,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 84.50278204880932,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 6.015829023451548,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 1131.2638769013502,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 357.8888860513501,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 455.8603318500001,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 3.7069089365,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 2.480388555,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 5.675861105055333,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 235.09910439120162,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 1248.0734575043377,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/01c52594aae64cdf80eb961fb155d8d2?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Cook the Book: Crab, Avocado & Potato Terrine",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/8ac/8ac0609cf94947a547f392dbcd4070db.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=43c9f35c556f031e8b3e2b6d26774c80ba3646b99c00c8d92945e933e9444231",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/8ac/8ac0609cf94947a547f392dbcd4070db-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=3c98de148debc01d7ab072dbe550021be6b72b196169e0f02f6bacb4bd3b4fcf",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/8ac/8ac0609cf94947a547f392dbcd4070db-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=a144e796e70b7ab261ea560a3f1e44efff49a08255b9fe7a03e07cf1f7aa4449",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/8ac/8ac0609cf94947a547f392dbcd4070db.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=43c9f35c556f031e8b3e2b6d26774c80ba3646b99c00c8d92945e933e9444231",
                        "width": 300,
                        "height": 300
                    }
                },
                "url": "http://www.seriouseats.com/recipes/2011/07/crab-avocado-potato-terrine-recipe.html",
                "yield": 8,
                "dietLabels": [
                    "High-Fiber"
                ],
                "healthLabels": [
                    "Sugar-Conscious",
                    "Pescatarian",
                    "Gluten-Free",
                    "Wheat-Free",
                    "Egg-Free",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Fish-Free",
                    "Pork-Free",
                    "Red-Meat-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "Sulfite-Free"
                ],
                "ingredientLines": [
                    "1 1/2 pounds Yukon gold potatoes",
                    "Salt",
                    "3 tablespoons butter",
                    "1/2 cup half-and-half",
                    "1/4 teaspoon cayenne pepper",
                    "1 teaspoon turmeric",
                    "1/2 pound lump crabmeat",
                    "2 limes",
                    "2 green onions, roots trimmed, white and pale green parts thinly sliced",
                    "1/4 cup lightly packed cilantro leaves and tender stems, finely chopped",
                    "2 Hass avocados"
                ],
                "calories": 1878.881909788889,
                "mealType": [
                    "lunch/dinner"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 1878.881909788889,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 110.20849424627778,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 39.831968245038894,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 1.4298594658999997,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 52.74131584975001,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 10.147209791505556,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 176.96136444738892,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 129.66919401516668,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 47.29217043222222,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 16.27824295122222,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 68.15468502233334,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 356.35229945000003,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 3818.467269841867,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 547.6425235390175,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 389.2896901634314,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 5875.208725229673,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 11.736749083210102,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 14.270408827120907,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 1299.3448270277777,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 478.5753507388889,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 228.4708416622222,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 0.9716677443277779,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 1.2101565118722224,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 21.03846640498334,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 3.537315730294445,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 587.1110009277779,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 587.1110009277779,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 8.024032960500001,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 0.8809999999999999,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 14.764821437277778,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 174.05012110000004,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 1267.414630212853,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/9afb73c8cf455400246ae165e74cbb4a?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Cranberry sauce burnt butter, maple syrup, apple, thyme and spiced rum",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/4f6/4f6a0db56d5cf1d12331c24b0cd1e74d.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=fd1120b3a8ea6445a517de28240ca77c972f90f8c6a860a5ab58878c8e378ec5",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/4f6/4f6a0db56d5cf1d12331c24b0cd1e74d-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=9f67241d2991974338312373c2fa4319f98b6c039df34adc113163e473e7b2a8",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/4f6/4f6a0db56d5cf1d12331c24b0cd1e74d-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=9d1a7f840b08255bc66a907e0c100e1a4f80dddb28d732eedcb931f7654f24f5",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/4f6/4f6a0db56d5cf1d12331c24b0cd1e74d.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=fd1120b3a8ea6445a517de28240ca77c972f90f8c6a860a5ab58878c8e378ec5",
                        "width": 300,
                        "height": 300
                    },
                    "LARGE": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/4f6/4f6a0db56d5cf1d12331c24b0cd1e74d-l.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=92d97991922c0cc3ac3019dccc8a9dd88e2ef5243cde54fd6e1834b0688a6ea4",
                        "width": 600,
                        "height": 600
                    }
                },
                "url": "https://www.delicious.com.au/recipes/cranberry-sauce-burnt-butter-maple-syrup-apple-thyme-spiced-rum/yPwOah3z",
                "yield": 10,
                "dietLabels": [
                    "Low-Sodium"
                ],
                "healthLabels": [
                    "Low Potassium",
                    "Kidney-Friendly",
                    "Vegetarian",
                    "Pescatarian",
                    "Gluten-Free",
                    "Wheat-Free",
                    "Egg-Free",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Pork-Free",
                    "Red-Meat-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Kosher"
                ],
                "ingredientLines": [
                    "4 eating apples",
                    "50g unsalted butter",
                    "2 tbs maple syrup",
                    "4 sprigs thyme",
                    "300g fresh or frozen cranberries",
                    "50ml quality spiced rum"
                ],
                "calories": 1099.7534454933477,
                "mealType": [
                    "snack"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 1099.7534454933477,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 42.4082,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 25.979680000000002,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 1.6389999999999998,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 10.62958,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 2.12842,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 166.91680000000002,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 133.96480000000003,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 32.952,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 111.97320000000002,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 24.184,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 4.170999999999999,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 107.5,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 25.13001491555562,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 169.08,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 83,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 1204.7800298311113,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 3.828001789866674,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 1.474301044088893,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 146.95007457777808,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 401.4,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 92.60000000000002,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 0.19818011932444496,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 0.8308,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 1.23776,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 0.5135400000000001,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 31.74,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 31.74,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 0.085,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 0.75,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 6.070399999999999,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 34.816,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 945.3089933760042,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/29fc5d0730c3fdf73b2085cfa85a1b55?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Roasted Brussels Sprouts With Pomelo and Star Anise From 'Plenty More'",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/18f/18f3cbb0e333f4131a6a2f9b84349364.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=42f4b62b37fffd6af6744a5097d7ada73bc83bab5ad5553c3807f5330f337dfe",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/18f/18f3cbb0e333f4131a6a2f9b84349364-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=55f0fdb45036da38c47cfe23f6369c0050d9be5c29fe8c118b26522f66f9f186",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/18f/18f3cbb0e333f4131a6a2f9b84349364-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=384412d5c0cdddd50fd47bbeef85a850def85666db23e51314c14b52ffdb4a25",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/18f/18f3cbb0e333f4131a6a2f9b84349364.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=42f4b62b37fffd6af6744a5097d7ada73bc83bab5ad5553c3807f5330f337dfe",
                        "width": 300,
                        "height": 300
                    },
                    "LARGE": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/18f/18f3cbb0e333f4131a6a2f9b84349364-l.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=94be5108cc56cfb8b68df409dc0c9b6b1c2c696a5b3c6d918672cb1e7ad7fd8b",
                        "width": 600,
                        "height": 600
                    }
                },
                "url": "http://www.seriouseats.com/recipes/2014/10/roasted-brussels-sprouts-with-pomelo-and-star-anise-from-plenty-more.html",
                "yield": 4,
                "dietLabels": [
                    "High-Fiber"
                ],
                "healthLabels": [
                    "Vegan",
                    "Vegetarian",
                    "Pescatarian",
                    "Dairy-Free",
                    "Gluten-Free",
                    "Wheat-Free",
                    "Egg-Free",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Pork-Free",
                    "Red-Meat-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "Kosher"
                ],
                "ingredientLines": [
                    "1/2 cup/100 g superfine sugar",
                    "2 cinnamon sticks",
                    "5 star anise pods",
                    "3 tbsp lemon juice",
                    "1 pomelo (2 lb/900 g in total; 10 1/2 oz/300 g after peeling and segmenting)",
                    "1 1/3 lb/600 g brussels sprouts, trimmed",
                    "9 oz/250 g shallots, peeled",
                    "5 tbsp/75 ml olive oil",
                    "2/3 cup/10 g cilantro leaves",
                    "Salt and black pepper"
                ],
                "calories": 1608.4289084508266,
                "mealType": [
                    "lunch/dinner"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 1608.4289084508266,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 72.83516726278374,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 10.077233167570625,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 51.23376010133641,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 8.691274265408355,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 238.49426956028043,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 197.75201605850097,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 40.74225350177946,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 151.5133143075553,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 99.8,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 31.474692223174177,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 0,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 3137.991102167633,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 550.0733258562335,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 247.26495567520033,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 3859.5858295660646,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 16.918281966684344,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 4.496564970413192,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 676.8374066067506,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 409.66987486725066,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 633.9378593163674,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 1.1567082468771503,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 0.7520594238509994,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 6.092244482651796,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 2.456028396896447,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 504.99946808370066,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 504.99946808370066,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 16.051181278427084,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 1152.9696009486545,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 993.848207288859,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/8c0b6680f5a97f27c7028759936b5f97?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Pan-Seared Duck Breast and Duck Fat Brussels",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/330/330a3f8ff48786e923c3f757f2ecc5ae.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=eaf728d4b14082690168ec619a21153aa097e2184d0ed3837a5d9b11d9b43456",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/330/330a3f8ff48786e923c3f757f2ecc5ae-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=9737ceca3dbabb4e54d8f8cc26050c7689cb0c171000bdfc59ab38d109de0dcb",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/330/330a3f8ff48786e923c3f757f2ecc5ae-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=5d5edc687de349cd3297d49f3089b7355a06c3a1e5709c6589bbf2b667bfe434",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/330/330a3f8ff48786e923c3f757f2ecc5ae.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=eaf728d4b14082690168ec619a21153aa097e2184d0ed3837a5d9b11d9b43456",
                        "width": 300,
                        "height": 300
                    }
                },
                "url": "https://tastykitchen.com/recipes/holidays/pan-seared-duck-breast-and-duck-fat-brussels/",
                "yield": 2,
                "dietLabels": [
                    "High-Fiber"
                ],
                "healthLabels": [
                    "Gluten-Free",
                    "Wheat-Free",
                    "Egg-Free",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Pork-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Mollusk-Free"
                ],
                "ingredientLines": [
                    "FOR THE MASHED POTATOES:",
                    "2 whole Large Baking Potatoes, Peeled And Diced To 1/2 Inch Pieces",
                    "Salt And Pepper",
                    "⅓ cups Sour Cream",
                    "3 Tablespoons Butter",
                    "Milk, If Needed (optional)",
                    "FOR THE BRUSSELS SPROUTS:",
                    "1 pound Brussels Sprouts, Trimmed And Halved Or Quartered To Bite-sized Pieces",
                    "Salt And Pepper",
                    "1 teaspoon Onion Powder",
                    "1 teaspoon Garlic Powder",
                    "3 Tablespoons Reserved Duck Fat",
                    "2 Tablespoons Honey",
                    "FOR THE DUCK:",
                    "2 whole Duck Breasts, About 5 Ounces Each",
                    "Salt And Pepper",
                    "½ cups Dry Red Wine",
                    "1 Tablespoon Butter"
                ],
                "calories": 2045.2218914973764,
                "mealType": [
                    "lunch/dinner"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 2045.2218914973764,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 108.41930953383869,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 53.43331232087905,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 1.8619039999999998,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 36.84610486489108,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 9.335688936941496,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 205.03446292621658,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 175.26906624261477,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 29.765396683601804,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 51.56903237694312,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 34.4904,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 63.4424011618386,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 318.2639838204166,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 3957.0859407787775,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 465.78166569479254,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 333.75765278342425,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 5284.4303739497855,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 21.15391845684262,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 5.793334362937553,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 1109.6051228128304,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 724.4024787843709,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 431.4499015089167,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 1.846661198153039,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 1.3220985292527503,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 15.617350143402255,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 4.305749679955904,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 415.3575710597736,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 415.3575710597736,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 1.474691095716667,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 3.001866666666667,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 6.929846157699222,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 844.6650619292162,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 1165.387329551358,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/cab84d8129dd58426fc83bb22b063761?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Vegetable Quiche Made With Fresh Tomatoes, Spinach, Basil and Goat Cheese",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/ac9/ac9883e7f55ddda96323a9cf8d756b8d.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=290d56c15b139fba2a41c0eaed408aad64d21df203e0b7559b655a305b537b01",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/ac9/ac9883e7f55ddda96323a9cf8d756b8d-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=579e382ea7f0d28aa976f16b187e8ca97b12a35d29ccf599dcd94a14cbc847f3",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/ac9/ac9883e7f55ddda96323a9cf8d756b8d-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=1a44f14d2a4641d988ca16bbdb5d4fa454a94bfd1c4f4b7dc3f734503d32e143",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/ac9/ac9883e7f55ddda96323a9cf8d756b8d.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=290d56c15b139fba2a41c0eaed408aad64d21df203e0b7559b655a305b537b01",
                        "width": 300,
                        "height": 300
                    }
                },
                "url": "http://www.foodista.com/recipe/8KLLFP2C/vegetable-quiche-made-with-fresh-tomatoes-spinach-basil-and-goat-cheese",
                "yield": 8,
                "dietLabels": [],
                "healthLabels": [
                    "Sugar-Conscious",
                    "Kidney-Friendly",
                    "Vegetarian",
                    "Pescatarian",
                    "Mediterranean",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Pork-Free",
                    "Red-Meat-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "Sulfite-Free",
                    "Kosher"
                ],
                "ingredientLines": [
                    "One 10-inch pie crust",
                    "4 eggs, 2 egg whites (6 total)",
                    "1 1/2 cups whole milk",
                    "1/4 teaspoon salt",
                    "1/8 teaspoon ground white pepper",
                    "pinch of ground nutmeg",
                    "1 cup spinach or kale, leaves only and chopped (no stems)",
                    "2 small tomatoes, finely chopped",
                    "1/3 cup slices green onion",
                    "1/2 cup goat cheese",
                    "1 tablespoon chopped fresh basil",
                    "1 tablespoon of flour (I used Spelt)"
                ],
                "calories": 1616.2992916671697,
                "mealType": [
                    "brunch"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 1616.2992916671697,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 90.05208791673341,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 42.05236970838173,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 30.75534670833925,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 8.975514208333445,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 152.40315166665823,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 144.1782141666228,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 8.224937500035411,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 25.02118083333858,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 50.53052291666397,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 78,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 2302.314916666694,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 649.3077083336584,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 135.56429166698055,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 1559.5092916671813,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 6.272287916670818,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 3.358707916669771,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 738.8034583335898,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 669.4199583333427,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 40.51754166667228,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 0.5098589166671564,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 1.6672257916667208,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 5.057889625000783,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 0.6423516666669085,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 229.23641666677477,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 160.53641666677476,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 41.22,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 1.91304,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 5.118,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 2.347220833333254,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 242.1791374999996,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 748.9571387499959,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/cbf69b369be362e8ac7c0953b99773cd?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Totally Random Chocolate Dipped Pretzels",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/769/769a753b1d766dc50edd83083b7501e1.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=9618c9829759b0fad8f1f7610a107b007129b72e56e7de0730b31a31354008ef",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/769/769a753b1d766dc50edd83083b7501e1-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=442f8b20c0468fd01ab41f32be0db277dd7cb7b2bbd408f02525164b4b577616",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/769/769a753b1d766dc50edd83083b7501e1-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=02efeeaf1750f0218d07911fcb348826efe4a35d88a742473518d6cb094be9f9",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/769/769a753b1d766dc50edd83083b7501e1.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=9618c9829759b0fad8f1f7610a107b007129b72e56e7de0730b31a31354008ef",
                        "width": 300,
                        "height": 300
                    },
                    "LARGE": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/769/769a753b1d766dc50edd83083b7501e1-l.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f3b2b54e6a4215369acd41a29a5d0467bc7a66ffbbc8a1ca25f92e15aa01e581",
                        "width": 600,
                        "height": 600
                    }
                },
                "url": "http://www.food.com/recipe/totally-random-chocolate-dipped-pretzels-355427",
                "yield": 24,
                "dietLabels": [
                    "Low-Sodium"
                ],
                "healthLabels": [
                    "Low Potassium",
                    "Kidney-Friendly",
                    "Vegetarian",
                    "Pescatarian",
                    "Egg-Free",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Pork-Free",
                    "Red-Meat-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "Kosher"
                ],
                "ingredientLines": [
                    "2 cups semi-sweet chocolate chips or 2 cups white chocolate, chocolate chips",
                    "24 pretzels (You can use the ones that look like sticks to if you wish)",
                    "1 cup of any topping you like such as candy sprinkles, coconut, crushed peacons, etc"
                ],
                "calories": 2496.96,
                "mealType": [
                    "lunch/dinner"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 2496.96,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 134.8256,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 85.73356000000001,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 0.0057599999999999995,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 36.67932,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 5.494199999999999,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 349.0396,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 316.5296,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 32.510000000000005,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 196.7364,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 188.57,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 31.653599999999997,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 0,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 1839.6599999999999,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 160.79999999999998,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 465.26,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 1868.8199999999997,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 19.397799999999997,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 8.0116,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 731.4399999999999,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 5.664,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 0.85366,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 0.80548,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 9.49246,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 0.26942,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 304.82,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 304.82,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 1.7684000000000002,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 23.567999999999998,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 44.52120000000001,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/7575ba9d0d37aae700b7a7fe60eb0a25?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Pasta with cauliflower, sausage and big breadcrumbs",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/856/85694bb39065d9875731502f1e5a7999.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f30053c39941a1a6c0567fc4a4477a7e4957fdd9865ba11518ea5729f8b69296",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/856/85694bb39065d9875731502f1e5a7999-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=dc3d663c18309f6c7bcf2519dfa1523d7d53a376a1c538c12515a8b2d3444f1f",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/856/85694bb39065d9875731502f1e5a7999-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=3ab56c94606d2c70f411c9f1a8efe631757c84cbd40554e7d2b31cffaf3cb600",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/856/85694bb39065d9875731502f1e5a7999.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f30053c39941a1a6c0567fc4a4477a7e4957fdd9865ba11518ea5729f8b69296",
                        "width": 300,
                        "height": 300
                    },
                    "LARGE": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/856/85694bb39065d9875731502f1e5a7999-l.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ebafdfcc5ee2f8b010fb460af466d3f59b21a54c1875c14fac9322ed78d5d251",
                        "width": 600,
                        "height": 600
                    }
                },
                "url": "https://www.delicious.com.au/recipes/pasta-cauliflower-sausage-big-breadcrumbs/pt2o99vf",
                "yield": 4,
                "dietLabels": [
                    "Balanced",
                    "High-Fiber"
                ],
                "healthLabels": [
                    "Egg-Free",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "Sulfite-Free"
                ],
                "ingredientLines": [
                    "Kosher salt or sea salt, freshly ground black pepper",
                    "4 tbs unsalted butter",
                    "2 cups coarse torn breadcrumbs (6mm pieces)",
                    "Grated zest of 1 lemon",
                    "1/4 cup finely chopped parsley",
                    "3 tbs extra virgin olive oil",
                    "450g Italian sausage meat",
                    "5 garlic cloves, thinly sliced",
                    "450g cauliflower, cut into bite-sized pieces",
                    "450g rigatoni or orecchiette",
                    "1/4 cup (20g) grated Parmigiano Reggiano cheese, plus more for serving",
                    "3 tbs lemon juice"
                ],
                "calories": 4825.010999999829,
                "mealType": [
                    "lunch/dinner"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 4825.010999999829,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 223.22677999999812,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 76.81831399999966,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 2.316404,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 90.58983799999994,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 33.60281649999984,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 533.1907299999467,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 497.499479999949,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 35.69124999999768,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 41.26147999998051,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 175.1514249999973,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 450.72,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 5367.9454999999925,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 941.2919999999536,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 490.45099999995364,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 4456.709499999203,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 24.734559999999387,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 20.685294999999613,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 2200.421999999938,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 615.1419999999999,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 289.9752499997007,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 3.800939999999814,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 2.2073544999998838,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 48.964078499999296,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 2.792958999999644,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 742.6239999998454,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 442.3839999998453,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 177.12,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 5.232560000000001,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 7.251999999999999,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 12.801434999998838,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 359.40799999999996,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 859.342244999286,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/a84085346600a20e91d8efe72d9bc2f3?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Kale with Golden Raisins and Onions",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/0de/0de5085456d0d0fa08ecc027710ad0c7.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=24adf70d5a34f525f46aaf5d265e32ab904efc93eecf79f254daaadb74625108",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/0de/0de5085456d0d0fa08ecc027710ad0c7-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ec225dd54d4edb52876c25667980881ea9980d45af733851f8a8d2869f11113b",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/0de/0de5085456d0d0fa08ecc027710ad0c7-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f288a915d1dc1f7e6c176c67cc34911a57bcc81c3ee782d832410ebdacb0504f",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/0de/0de5085456d0d0fa08ecc027710ad0c7.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=24adf70d5a34f525f46aaf5d265e32ab904efc93eecf79f254daaadb74625108",
                        "width": 300,
                        "height": 300
                    }
                },
                "url": "http://www.seriouseats.com/recipes/2011/05/kale-with-golden-raisins-and-onions-recipe.html",
                "yield": 2,
                "dietLabels": [],
                "healthLabels": [
                    "Vegan",
                    "Vegetarian",
                    "Pescatarian",
                    "Paleo",
                    "Mediterranean",
                    "DASH",
                    "Dairy-Free",
                    "Gluten-Free",
                    "Wheat-Free",
                    "Egg-Free",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Pork-Free",
                    "Red-Meat-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "Sulfite-Free",
                    "Kosher"
                ],
                "ingredientLines": [
                    "2 large handfuls kale or cavolo nero",
                    "A medium onion",
                    "Olive oil",
                    "3 tablespoons golden raisins",
                    "For the dressing:",
                    "A blood orange",
                    "2 tablespoons white wine vinegar",
                    "Extra-virgin olive oil",
                    "2 tablespoons capers"
                ],
                "calories": 276.43469399850136,
                "mealType": [
                    "lunch/dinner"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 276.43469399850136,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 9.295782499985382,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 1.3540816529975794,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 6.417278075990791,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 1.0737997179980638,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 48.576499999634486,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 41.74459999965287,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 6.831899999981614,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 33.20022124972793,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 3.982976249984418,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 0,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 414.1886819999446,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 108.36446599975625,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 41.939624999839126,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 632.6418409965709,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 1.267107209991702,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 0.4517199999985291,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 89.0176249994714,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 40.614,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 85.4415999999853,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 0.17534099999996322,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 0.16443612499912208,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 0.9696452499947508,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 0.31592162499851534,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 72.02162499998622,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 72.02162499998622,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 1.7685408499976543,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 46.10564069997639,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 262.6021087499312,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/f5dba37aba98c9f0917113d0c2d54612?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "This Braided Poppy-Seed Roll Is a Delightful German Breakfast",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/d32/d328b656b6ab62303ba9aca3389b0ebf.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=3c193bcf351e9d8d6a38c3214070ff96f2c44c671688bdab3d500367f4a6a67c",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/d32/d328b656b6ab62303ba9aca3389b0ebf-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=7c028c3cd32b2a563d64654b68fbcd599773118389c02748a3b4bca37392823d",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/d32/d328b656b6ab62303ba9aca3389b0ebf-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=edeb71825dddd688e20c5f9ec23c3f9071b2e3b49397b2b7530ca31b41f20389",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/d32/d328b656b6ab62303ba9aca3389b0ebf.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=3c193bcf351e9d8d6a38c3214070ff96f2c44c671688bdab3d500367f4a6a67c",
                        "width": 300,
                        "height": 300
                    },
                    "LARGE": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/d32/d328b656b6ab62303ba9aca3389b0ebf-l.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=7079b02b28829121dbe117e1583dba0eaede8aa4ef87693fb7ff66a1cd933ad7",
                        "width": 600,
                        "height": 600
                    }
                },
                "url": "http://www.myrecipes.com/recipe/this-braided-poppy-seed-roll-is-a-delightful-german-breakfast",
                "yield": 2,
                "dietLabels": [],
                "healthLabels": [
                    "Low Potassium",
                    "Kidney-Friendly",
                    "Vegetarian",
                    "Pescatarian",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Pork-Free",
                    "Red-Meat-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "Kosher"
                ],
                "ingredientLines": [
                    "3 tablespoons granulated sugar",
                    "⅔ cup all-purpose flour",
                    "¾ teaspoon baking powder",
                    "4 tablespoons plus 1 teaspoon unsalted high-fat, European-style butter, softened, cut into cubes",
                    "1 egg yolk"
                ],
                "calories": 934.7446249992666,
                "mealType": [
                    "breakfast"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 934.7446249992666,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 54.29702708352789,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 33.02167033345655,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 2.016926083341196,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 14.587263458383758,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 2.7826378750072993,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 102.43598749936638,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 100.17908749936637,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 2.2569,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 37.76233083270085,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 37.42499999936737,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 11.270594583335372,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 278.4010416671824,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 287.58237500002,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 299.0720000000512,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 21.582750000004797,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 119.53483333337822,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 4.65417749999973,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 0.9528829166668191,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 499.4580000000575,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 472.16750000164063,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 0,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 0.6809444583333453,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 0.5108155833332944,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 4.949074250000101,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 0.0856458750000072,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 264.0072083333405,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 45.6738750000072,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 128.33333333333331,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 0.36719958333374114,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 1.650137500003598,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 1.9665833333388982,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 4.651308333350124,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 28.16157916670957,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/681a47056e191a58e6f7f3ce393dbda7?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Sam Sifton's Creamed Onions",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/97f/97f01853a22223fcf512e42f5bd20eba.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=6df1c71ba22e3be400392f32a6b1deae3c5617aed7e2a0cfb5bfd3f490ca51de",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/97f/97f01853a22223fcf512e42f5bd20eba-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=91ea4c750268b401fb5b7f5530e7e42d6ada644ceb6b56fc299ce99e7d35652a",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/97f/97f01853a22223fcf512e42f5bd20eba-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e43958203eabd96f336214b44f0256a3665e8263ddaa12fb2511937751e61578",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/97f/97f01853a22223fcf512e42f5bd20eba.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=6df1c71ba22e3be400392f32a6b1deae3c5617aed7e2a0cfb5bfd3f490ca51de",
                        "width": 300,
                        "height": 300
                    }
                },
                "url": "http://www.seriouseats.com/recipes/2012/11/sam-siftons-creamed-onions.html",
                "yield": 6,
                "dietLabels": [],
                "healthLabels": [
                    "Egg-Free",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "No oil added",
                    "Sulfite-Free"
                ],
                "ingredientLines": [
                    "2 pounds fresh pearl onions",
                    "3 thick slices of bacon, cut into lardons",
                    "3 tablespoons all-purpose flour",
                    "1 1/2 cups turkey or chicken broth",
                    "1 cup heavy cream, or light cream, or milk",
                    "2 sprigs fresh thyme, stems removed, leaves chopped fine",
                    "1 pinch cayenne pepper, or to taste",
                    "Kosher salt and freshly ground black pepper to taste",
                    "Chopped fresh parsley, for serving"
                ],
                "calories": 1782.1368179037065,
                "mealType": [
                    "lunch/dinner"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 1782.1368179037063,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 128.36563565217594,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 68.06277765487974,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 0.11571000000000001,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 42.89684576253518,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 9.998984531550832,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 128.0449265259258,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 109.72025002615479,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 18.32467649977103,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 51.81126457635493,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 38.33293950072569,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 394.28,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 3794.2830611998825,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 436.59345932461144,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 158.05405629760628,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 2210.1803515739557,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 6.038066620576698,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 4.013825290721643,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 675.7303082259199,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 1030.2954242881856,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 85.62002909344173,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 1.0325821358716205,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 1.0419502153120115,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 11.970922315352707,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 1.6541207724293328,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 279.33490092056377,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 217.928650921602,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 36.09374999938974,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 0.8634,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 2.014,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 3.36143454859607,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 102.1126001203348,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 1327.6870051097817,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/5c81c48728f53a376e198a3fc8a51317?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Sushi Rice Salad",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/17e/17ec8f27c19516fb56a55ac4522964a6.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ed3db1eb2338c202d2bde0bb22301399ac92ec3df2c407c83f279a44be8ea3d0",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/17e/17ec8f27c19516fb56a55ac4522964a6-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=8944c8ead9ce931dbdb1528b2bd295cf581b52ad527acaa6db220d8214ff9a8c",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/17e/17ec8f27c19516fb56a55ac4522964a6-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e331a2dd3d8a99f27da8f131c93ec647b26bf4f228f30ba4f0749e6b8dde8361",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/17e/17ec8f27c19516fb56a55ac4522964a6.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ed3db1eb2338c202d2bde0bb22301399ac92ec3df2c407c83f279a44be8ea3d0",
                        "width": 300,
                        "height": 300
                    }
                },
                "url": "https://food52.com/recipes/35595-sushi-rice-salad",
                "yield": 4,
                "dietLabels": [
                    "High-Fiber"
                ],
                "healthLabels": [
                    "Sugar-Conscious",
                    "Vegan",
                    "Vegetarian",
                    "Pescatarian",
                    "Dairy-Free",
                    "Egg-Free",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Pork-Free",
                    "Red-Meat-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "Kosher"
                ],
                "ingredientLines": [
                    "3 tablespoons canola oil",
                    "1 1/2 tablespoons soy sauce",
                    "1 tablespoon rice wine vinegar",
                    "1 tablespoon sesame seeds",
                    "1 teaspoon sugar",
                    "1/2 teaspoon fresh grated ginger",
                    "1/2 teaspoon wasabi (or more to taste)",
                    "3 cups cooked and cooled white or brown rice (from about 1 cup dried rice)",
                    "1 cup chopped seeded cucumber",
                    "1 large avocado, chopped",
                    "2 sheets nori, torn into small pieces",
                    "1/4 thinly sliced scallion, green part only"
                ],
                "calories": 2940.713152777853,
                "mealType": [
                    "lunch/dinner"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 2940.713152777853,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 98.86793847222268,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 12.17851811111111,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 0.1659,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 58.449015,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 23.914439444444444,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 467.8916969444606,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 429.67244416667745,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 38.21925277778314,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 7.838992777777779,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 4.1916,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 52.449161666669966,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 0,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 1365.5292638889007,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 339.52933333342116,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 953.144319444492,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 3085.8815000003906,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 13.762081805556264,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 14.331689166667783,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 1763.1800555556106,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 38.07069444444583,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 31.33517361113989,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 2.638657180555646,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 0.6965265277778562,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 30.06986562500051,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 3.7109289722224106,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 347.0504722222346,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 347.0504722222346,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 12.661472222222221,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 107.161,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 394.425156805603,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/579e279deaca574973ad8e07a5ff1397?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Vegan Fish Sauce",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/e0d/e0d0c008e43b4313ecf205324ae595a5.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=c184811d770c7def0ab191efd09682253fcfb66e043c10ceda2413104cef88c3",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/e0d/e0d0c008e43b4313ecf205324ae595a5-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=855d19e1b914312db8eab706fdaeda56a2aec45504cec1e2b425f24d461ecc76",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/e0d/e0d0c008e43b4313ecf205324ae595a5-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=24bc9f4d489e8e7d792ce7a97af3f21ce246dcbafcea9b0eb443f109177cdeb8",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/e0d/e0d0c008e43b4313ecf205324ae595a5.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=c184811d770c7def0ab191efd09682253fcfb66e043c10ceda2413104cef88c3",
                        "width": 300,
                        "height": 300
                    },
                    "LARGE": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/e0d/e0d0c008e43b4313ecf205324ae595a5-l.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=383f04081cb548bf5e0a3a6b88536e83872fb9e8b9355cf70b68bb543e05cfd4",
                        "width": 600,
                        "height": 600
                    }
                },
                "url": "https://food52.com/recipes/39684-vegan-fish-sauce",
                "yield": 2,
                "dietLabels": [
                    "Low-Fat"
                ],
                "healthLabels": [
                    "Low Potassium",
                    "Vegan",
                    "Vegetarian",
                    "Pescatarian",
                    "Dairy-Free",
                    "Egg-Free",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Pork-Free",
                    "Red-Meat-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "No oil added",
                    "Kosher"
                ],
                "ingredientLines": [
                    "3/4 cup water",
                    "2 tablespoons organic sugar",
                    "2 tablespoons soy sauce or Bragg’s Liquid Aminos",
                    "1 tablespoon distilled vinegar",
                    "2 tablespoons liquid from a jar of fermented tofu",
                    "1 teaspoon wakame powder (recipe below)",
                    "1 teaspoon sea salt",
                    "1 cup dried wakame"
                ],
                "calories": 184.29199999843385,
                "mealType": [
                    "snack"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 184.29199999843385,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 2.894399999971461,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 0.445534999996379,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 0.560484999992569,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 1.5004599999819521,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 35.30680999967717,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 34.65080999967041,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 0.6560000000067628,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 25.60395999958704,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 24.949999999578246,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 7.270050000003091,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 0,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 3253.0929999984323,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 149.68650000181077,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 125.50650000120547,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 200.62300000031917,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 2.7694700000200694,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 1.0331649999978445,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 137.79100000074266,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 14.400000000243462,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 2.455000000039647,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 0.1017350000000816,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 0.26932500000256104,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 2.0869450000198793,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 0.07398499999960395,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 169.2550000025162,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 169.2550000025162,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 0.8000000000135257,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 4.240000000071686,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 297.71222000075636,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/57d5fc4133cf39af0398f928b866ab80?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Yuzu-Glazed Salmon",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/735/7358953b04b45a4504081f39a14ce93b.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=65ec6536c6f93fd475b6daad0fbd32fdd65ce03a03524d7b20d16b12e6b1d0a6",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/735/7358953b04b45a4504081f39a14ce93b-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=51fa7a18131fe3bd17515af187ebab7be069b6f97cc861f64f3e04e6335a9417",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/735/7358953b04b45a4504081f39a14ce93b-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f9314ee096119662a6f22a9b5e2bda80075e9d2d7308df20cb21cc39b5157229",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/735/7358953b04b45a4504081f39a14ce93b.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=65ec6536c6f93fd475b6daad0fbd32fdd65ce03a03524d7b20d16b12e6b1d0a6",
                        "width": 300,
                        "height": 300
                    }
                },
                "url": "https://www.marthastewart.com/1140951/yuzu-glazed-salmon",
                "yield": 6,
                "dietLabels": [
                    "High-Protein",
                    "Low-Carb"
                ],
                "healthLabels": [
                    "Keto-Friendly",
                    "Pescatarian",
                    "Dairy-Free",
                    "Egg-Free",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Shellfish-Free",
                    "Pork-Free",
                    "Red-Meat-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "No oil added",
                    "Kosher"
                ],
                "ingredientLines": [
                    "2 tablespoons freshly squeezed or bottled yuzu juice",
                    "1 tablespoon yellow miso",
                    "1 tablespoon soy sauce",
                    "2 tablespoons maple syrup",
                    "2 heads baby bok choy, trimmed and sliced lengthwise",
                    "1 skinless center-cut wild salmon fillet (2 pounds)",
                    "1 tablespoon sesame seeds"
                ],
                "calories": 1554.37472039987,
                "mealType": [
                    "lunch/dinner"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 1554.37472039987,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 59.78675508199866,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 12.340462723999826,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 21.315127351599955,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 20.757275020799604,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 41.59459999995825,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 36.9205999999708,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 4.673999999987453,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 28.134699999988797,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 24.184,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 203.15024078799513,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 408.23313300000007,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 1949.944980399991,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 594.0365063998834,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 363.0972693999641,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 4467.941450199382,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 7.719234543997313,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 5.944857433999731,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 2536.1440187999287,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 388.1388959999955,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 64.15684739976248,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 1.216048756199821,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 1.9475986359999107,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 67.16808670199956,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 5.483694222599643,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 218.84162659995056,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 218.84162659995056,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 37.843203658,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 81.6466266,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 6.868798601999328,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 71.09618473999993,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 858.2884320836013,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/a297e84687a3805d8ad5c3ef85fec2dc?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        },
        {
            "recipe": {
                "label": "Cook the Book: Arugula, Garlic and Green Onion Stuffed Flank Steak",
                "image": "https://edamam-product-images.s3.amazonaws.com/web-img/0aa/0aa5cea2d2fea0d066909b5c1e07f0cc.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=479b0566ca474e55b121c577d69f5b44f7ffcc3c1d1e06594c894f2f76aeb3ad",
                "images": {
                    "THUMBNAIL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/0aa/0aa5cea2d2fea0d066909b5c1e07f0cc-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=5ca0ac39c611e8f250e6e0dcb72e01bb2992ffba264b37b2fb0dfb5470d9bea5",
                        "width": 100,
                        "height": 100
                    },
                    "SMALL": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/0aa/0aa5cea2d2fea0d066909b5c1e07f0cc-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=69526e1565400e5a19bbd903f66473bcd8255a8f9129f4dad6504c553be792ff",
                        "width": 200,
                        "height": 200
                    },
                    "REGULAR": {
                        "url": "https://edamam-product-images.s3.amazonaws.com/web-img/0aa/0aa5cea2d2fea0d066909b5c1e07f0cc.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJHMEUCIQCoZ%2BffM8YAfp7vZlIFPppib%2F%2FkatW6ogri4cXMwrVzMAIgG5v7C7fdR7Ccy0EUxqyfxa3sft%2Bwam4cWlUOQ2A%2BVR0qwQUIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDDvI3N0q08wqgmGqEiqVBUoIoQI%2BL13eAMzd2HUp7bQgLvHsplxl8nA213triDRcneEeDUNwNX9aQzALXpTuxvmpFqbGVq9XJE2zujYexol70SmEEYtOtZAFP6m8OaLdaMCbwVdN3%2BUMs%2FQAmBx3kl1AtYts1tTqYSi1Dkcu86Hh6EIHCEk5Sce%2BjSHE%2BL%2BRi%2FfBruJAQWayPkOTD3fLpNJi1KWocEL0XaYCqnRVEw%2BJy86UJBZG0%2FK%2FmzhFYUHvrfP77oYLXWYsLTGO4wC5csiRIRFL9x%2FDUKBYLcP0zPt6d4GdzJmoXvulXBW0tu9uo4qbdome0Ms7zM9%2F10F7gKJJolNOF9IsRhhSIjtp4rMhBDYbvG4sWIy3qG0LroMrFpxL%2BeH%2F%2BSp9Fg3UZkUczy2PPGHhPLPtGE2p48B3H5NuSvJdAu1NnzmvSliIP%2FwhGs9VXzKqIlRbI6fQXcw9Z9016qGJSp%2BK5ErX4nqojLtc5O0xNpKXVqWqOwHnZjXrUu9YZTK4D7SepDEyrUr1qoDgISEEnWvEOYmg%2BBltbgGvXkzchF9fcXI66cbyqe2sEx7joWJoEwg8pFhHo1VJN%2B5P4RIwmneo1TZkfabGCZQvtZkiIKnQUYgZBIi7cNu47P2YE6NOEPwVflKWBxboayswbJvL5VPhb5ZKlZqFeheCcDBxWiYNr8YoxBwXEoYV6tWs2jwVs7lYZO2LYDVAe8BcW2T2nCjkTdhTuCxPWMCiM1Ov84y1pFL60SKeYrU%2BdEXRcZ2v6YrtbXAIbMkJHt2vu6mFm1tZf0w6YW%2FTsVHdPXJb0CqymG7O7NgI1ckitYuqAKEbQI26%2BnwzmwHsI77eXTmfPhRGm0WmXGtwtzyuGwk5U0B%2FHlg3wzdvMlCn8i8nKwwwzOjfngY6sQHoQyvNOI0kBrTzF9p98N%2FqKzgovn17TJdUjhng5VZ4i8gOFDgZXJPrBdTr%2F%2FkxU3OfOLyw4VpXGSBOBzqnZou%2FSerGTpqB9r%2FTUmkjWLMqVua7I%2BboJdx6Yt0HrmmyLvEco5jAlSVhxqYlgs%2FXm%2FUej7g4BcJSYAn8bmaoMIBNXRFn4JZzxOxJR0eQOCWi8vxK84ZG088mHXgh0GpcwrBy4Et1dNU%2B5mbmeM5YiAtLhZg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T174416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN6225NTR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=479b0566ca474e55b121c577d69f5b44f7ffcc3c1d1e06594c894f2f76aeb3ad",
                        "width": 300,
                        "height": 300
                    }
                },
                "url": "http://www.seriouseats.com/recipes/2011/07/arugula-garlic-green-onion-stuffed-flank-steak.html",
                "yield": 8,
                "dietLabels": [
                    "Low-Carb"
                ],
                "healthLabels": [
                    "Sugar-Conscious",
                    "Keto-Friendly",
                    "Paleo",
                    "Dairy-Free",
                    "Gluten-Free",
                    "Wheat-Free",
                    "Egg-Free",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Soy-Free",
                    "Fish-Free",
                    "Shellfish-Free",
                    "Pork-Free",
                    "Crustacean-Free",
                    "Celery-Free",
                    "Mustard-Free",
                    "Sesame-Free",
                    "Lupine-Free",
                    "Mollusk-Free",
                    "Alcohol-Free",
                    "Sulfite-Free",
                    "Kosher"
                ],
                "ingredientLines": [
                    "8 cloves garlic",
                    "Salt",
                    "3 pounds flank steak, trimmed of excess fat",
                    "Black pepper",
                    "3 cups arugula leaves, washed and dried",
                    "1 bunch green onions, tops and roots trimmed, halved lengthwise then halved crosswise",
                    "3 tablespoons olive oil"
                ],
                "calories": 2702.2572581383006,
                "mealType": [
                    "lunch/dinner"
                ],
                "totalNutrients": {
                    "ENERC_KCAL": {
                        "label": "Energy",
                        "quantity": 2702.2572581383006,
                        "unit": "kcal"
                    },
                    "FAT": {
                        "label": "Fat",
                        "quantity": 154.195433920358,
                        "unit": "g"
                    },
                    "FASAT": {
                        "label": "Saturated",
                        "quantity": 52.6196599494136,
                        "unit": "g"
                    },
                    "FATRN": {
                        "label": "Trans",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "FAMS": {
                        "label": "Monounsaturated",
                        "quantity": 75.64145512152871,
                        "unit": "g"
                    },
                    "FAPU": {
                        "label": "Polyunsaturated",
                        "quantity": 9.203050735173399,
                        "unit": "g"
                    },
                    "CHOCDF": {
                        "label": "Carbs",
                        "quantity": 21.484894635535,
                        "unit": "g"
                    },
                    "CHOCDF.net": {
                        "label": "Carbohydrates (net)",
                        "quantity": 15.869802309045,
                        "unit": "g"
                    },
                    "FIBTG": {
                        "label": "Fiber",
                        "quantity": 5.615092326490001,
                        "unit": "g"
                    },
                    "SUGAR": {
                        "label": "Sugars",
                        "quantity": 4.133586920512,
                        "unit": "g"
                    },
                    "SUGAR.added": {
                        "label": "Sugars, added",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "PROCNT": {
                        "label": "Protein",
                        "quantity": 294.39738571718703,
                        "unit": "g"
                    },
                    "CHOLE": {
                        "label": "Cholesterol",
                        "quantity": 925.3284348000001,
                        "unit": "mg"
                    },
                    "NA": {
                        "label": "Sodium",
                        "quantity": 3727.911738124089,
                        "unit": "mg"
                    },
                    "CA": {
                        "label": "Calcium",
                        "quantity": 611.6844769884941,
                        "unit": "mg"
                    },
                    "MG": {
                        "label": "Magnesium",
                        "quantity": 364.4463155449914,
                        "unit": "mg"
                    },
                    "K": {
                        "label": "Potassium",
                        "quantity": 5184.822289541232,
                        "unit": "mg"
                    },
                    "FE": {
                        "label": "Iron",
                        "quantity": 24.765965951471173,
                        "unit": "mg"
                    },
                    "ZN": {
                        "label": "Zinc",
                        "quantity": 52.91138536089613,
                        "unit": "mg"
                    },
                    "P": {
                        "label": "Phosphorus",
                        "quantity": 2743.6056558013997,
                        "unit": "mg"
                    },
                    "VITA_RAE": {
                        "label": "Vitamin A",
                        "quantity": 129.1946044591,
                        "unit": "µg"
                    },
                    "VITC": {
                        "label": "Vitamin C",
                        "quantity": 37.732,
                        "unit": "mg"
                    },
                    "THIA": {
                        "label": "Thiamin (B1)",
                        "quantity": 0.9037635994364002,
                        "unit": "mg"
                    },
                    "RIBF": {
                        "label": "Riboflavin (B2)",
                        "quantity": 1.4017300953940002,
                        "unit": "mg"
                    },
                    "NIA": {
                        "label": "Niacin (B3)",
                        "quantity": 94.10342478830191,
                        "unit": "mg"
                    },
                    "VITB6A": {
                        "label": "Vitamin B6",
                        "quantity": 8.1931202572703,
                        "unit": "mg"
                    },
                    "FOLDFE": {
                        "label": "Folate equivalent (total)",
                        "quantity": 295.34837452610003,
                        "unit": "µg"
                    },
                    "FOLFD": {
                        "label": "Folate (food)",
                        "quantity": 295.34837452610003,
                        "unit": "µg"
                    },
                    "FOLAC": {
                        "label": "Folic acid",
                        "quantity": 0,
                        "unit": "µg"
                    },
                    "VITB12": {
                        "label": "Vitamin B12",
                        "quantity": 16.057169898,
                        "unit": "µg"
                    },
                    "VITD": {
                        "label": "Vitamin D",
                        "quantity": 1.3607771100000001,
                        "unit": "µg"
                    },
                    "TOCPHA": {
                        "label": "Vitamin E",
                        "quantity": 11.250880708832,
                        "unit": "mg"
                    },
                    "VITK1": {
                        "label": "Vitamin K",
                        "quantity": 349.3982413172101,
                        "unit": "µg"
                    },
                    "Sugar.alcohol": {
                        "label": "Sugar alcohol",
                        "quantity": 0,
                        "unit": "g"
                    },
                    "WATER": {
                        "label": "Water",
                        "quantity": 1116.4015545438563,
                        "unit": "g"
                    }
                }
            },
            "_links": {
                "self": {
                    "title": "Self",
                    "href": "https://api.edamam.com/api/recipes/v2/c08aad68bc444aec4e5d70602f9e8dd2?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
                }
            }
        }
    ]
    */
    const [API_URL,setAPI_URL] = useState("https://api.edamam.com/api/recipes/v2?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559&random=true&field=label&field=image&field=url&field=yield&field=dietLabels&field=healthLabels&field=ingredientLines&field=calories&field=mealType&field=dishType&field=totalNutrients");

    const searchRecipes = async (api)=>{
        let arrayString = ""
        queryArray.map((query)=>arrayString+=query)
        const res = await fetch(`${api}${arrayString}`);
        let data = await res.json();
        setRecipes(data.hits);
    }

 

    useEffect(()=>{
        searchRecipes(`${API_URL}&q=random`);
    },[]);
    



    const [mealTypeOpen, setMealTypeOpen] = useState(false);
    const [breakfastChecked,setBreakfastChecked] = useState(false);
    const [brunchChecked,setBrunchChecked] = useState(false);
    const [lunchChecked,setLunchChecked] = useState(false);
    const [snackChecked,setSnackChecked] = useState(false);
    const [teatimeChecked,setTeatimeChecked] = useState(false);

    const [healthOpen, setHealthOpen] = useState(false);
    const [alcoholfreeChecked, setAlcoholfreeChecked] = useState(false);
    const [dairyfreeChecked, setDairyfreeChecked] = useState(false);
    const [glutenfreeChecked, setGlutenfreeChecked] = useState(false);
    const [peanutfreeChecked, setPeanutfreeChecked] = useState(false);
    const [lowsugarChecked, setLowsugarchecked] = useState(false);

    const [dietOpen,setDietOpen] = useState(false);
    const [veganChecked,setVeganChecked] = useState(false);
    const [vegetarianChecked,setVegetarianChecked] = useState(false);
    const [ketoChecked,setKetoChecked] = useState(false);
    const [kosherChecked,setKosherChecked] = useState(false);
    const [paleoChecked,setPaleoChecked] = useState(false);

    const [dishTypeOpen,setDishTypeOpen] = useState(false);
    const [mainChecked,setMainChecked] = useState(false);
    const [sideChecked,setSideChecked] = useState(false);
    const [dessertChecked,setDessertChecked] = useState(false);
    const [drinksChecked,setDrinksChecked] = useState(false);


    return (



    <div className="App h-screen w-screen bg-[#161613] text-white overflow-x-hidden">
    {/*App div*/}

        {/*Main container*/}
        <div className="flex flex-col items-center pt-10 pb-10">

            <h1 className="font-bold font-[Unbounded] text-7xl pb-12 text-center"><span className='text-[#ff4b33]'>Meal</span>Spiration</h1>
            <p className="font-[Tangerine] text-5xl text-center pb-16 italic">"A recipe is a story that ends with a good meal."</p>

            {/*Input container*/}
            <div className="flex flex-col items-center">

                {/*Search container*/}
                <div className="input-group flex flex-row items-center w-auto pb-5">
                    <input 
                    placeholder="Search for a recipe" 
                    className="font-[Itim] h-10 w-96 px-5 border focus:outline-none text-black text-lg  rounded-2xl" type="text" 
                    onChange={(e)=>{
                        setInputField(e.target.value);
                    }}/>
                    <button 
                    className="w-10 h-10 relative right-8  bg-[#ff4b33] flex items-center justify-center rounded-2xl"
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
                <div className="flex justify-center gap-5">
                    <mealTypeContext.Provider value={{queryArray,setQueryArray,mealTypeOpen, setMealTypeOpen,healthOpen,setHealthOpen,dietOpen,setDietOpen,dishTypeOpen,setDishTypeOpen, breakfastChecked,setBreakfastChecked,brunchChecked,setBrunchChecked,lunchChecked,setLunchChecked,snackChecked,setSnackChecked,teatimeChecked,setTeatimeChecked}}>
                    <MealTypeFilter/>
                    </mealTypeContext.Provider>

                    <healthContext.Provider value={{queryArray,setQueryArray,mealTypeOpen, setMealTypeOpen,healthOpen,setHealthOpen,dietOpen,setDietOpen,dishTypeOpen,setDishTypeOpen,alcoholfreeChecked,setAlcoholfreeChecked,dairyfreeChecked,setDairyfreeChecked,glutenfreeChecked,setGlutenfreeChecked,peanutfreeChecked,setPeanutfreeChecked,lowsugarChecked,setLowsugarchecked}}>
                    <HealthFilter/>
                    </healthContext.Provider>

                    <dietContext.Provider value={{queryArray,setQueryArray,mealTypeOpen, setMealTypeOpen,healthOpen,setHealthOpen,dietOpen,setDietOpen,dishTypeOpen,setDishTypeOpen,veganChecked,setVeganChecked,vegetarianChecked,setVegetarianChecked,ketoChecked,setKetoChecked,kosherChecked,setKosherChecked,paleoChecked,setPaleoChecked}}>
                    <DietFilter/>
                    </dietContext.Provider>

                    <dishTypeContext.Provider value={{queryArray,setQueryArray,mealTypeOpen, setMealTypeOpen,healthOpen,setHealthOpen,dietOpen,setDietOpen,dishTypeOpen,setDishTypeOpen,mainChecked,setMainChecked,sideChecked,setSideChecked,dessertChecked,setDessertChecked,drinksChecked,setDrinksChecked}}>
                    <DishTypeFilter/>
                    </dishTypeContext.Provider>


                </div>

            </div>
            
            {/*Cards container*/}
            <div className="pt-40 gap-7 w-full flex flex-row flex-wrap justify-center items-stretch">
                {/*<Card data={testdata}/>*/}
                {
                    recipes.map((recipe,index)=>{
                        return <Card key={index} data={recipe}/>
                    })
                }
            </div>

        </div>

      

    </div>

  )
}

export default App
