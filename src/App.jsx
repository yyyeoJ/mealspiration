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

  // https://developer.edamam.com/edamam-docs-recipe-api#/
  // https://api.edamam.com/api/recipes/v2?type=public&q=random&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559&random=true&field=label&field=image&field=images&field=url&field=yield&field=dietLabels&field=healthLabels&field=ingredientLines&field=calories&field=mealType&field=totalNutrients

  const randomRecipes = async ()=>{
    const res = await fetch("https://api.edamam.com/api/recipes/v2?type=public&q=random&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559&random=true&field=label&field=image&field=images&field=url&field=yield&field=dietLabels&field=healthLabels&field=ingredientLines&field=calories&field=mealType&field=totalNutrients");
    let data = await res.json();
    data = data.hits[0];
    console.log(data);
  }

    const testdata = {
        "recipe": {
            "label": "Buttered Spinach From 'The Nourished Kitchen'",
            "image": "https://edamam-product-images.s3.amazonaws.com/web-img/52f/52f14a54a95cb7e8f0e847dd85bdc221.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLWVhc3QtMSJGMEQCIEYIE%2BdGVviYiVPtae3iWrq4nld1e6X99tE6mF2A1yUuAiBXJ0lfaPv1Pmef9PYLb3KMPU5YE6Y4mOoGebF8K1F5vSrBBQiQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDE4NzAxNzE1MDk4NiIMyN%2FA%2F7r0cuTDMesHKpUF8SWjQGxC%2BDjalAlPlOefd0HVzgeYKipnIslH%2FFlTfy4DKL1jQ9RCQWlGt1Pe6k%2B05dqMSg8gZ7BhuJGR4lx7Pj7AJCJXN7gUT%2BIuesGwdlRuF1jNM8f2LOWjKWnrSKqwwKXFj99aLT08F46uQRaOaNIMzbwAcWBiFu7vubMEPE%2F%2F60jgPQ%2B3h9TqnhqPxr4ZUvgXI9f3P4xT%2FIRTAzkMzyYczts%2Bd6gApous5bulnMjupWZxZEtZWx81UAVGK40x6MX5F3JycFhj18Q6%2BYOHYe9hkwuoOUyr1aSxuPUtuE2iDYIorlQMjalyYaUKFHtoFcB5lXKTh%2B%2FxqICj9%2BRcChitRFRurbxf3kvxNbzwIc%2Fx3KqIiGLQGxYvcy89KkHBVc7rSpiAzRsGFBlAxMm0UDLR4jMCjznDlZ2E3fz2xvyOVEFiZKdD5jc2yzmSAlQ%2Fmu1wbHcTLibKOWmnhkZi8zlBOQNftSIm4tUn%2BQe3AeQkRvcn7mL%2BH3%2FN1klnDHdwqxCxk9ob0qxVhr9txdegeAM9qYkkWbjFoCrmAc2VI8Pkq4qfkccs4qFIcm22nu6z%2BvWHjYKv6yjZfPXmRLdiNNh%2F%2BCPkZiDBI5okxnnx9mLfXrKVUrZLadOyJXW3oqg%2BmpP8GOk694gxvQ1%2BVsZ7nTjgl0QnzM56SChPlH4NNSN3Z1nMwrUTyJ%2FOYN3XD0ZtIwa0KKPgmXoMRbvTW17usUqYReOOSC7J07EsD3BjmvZ24yi4yTrqQDLE08wc%2F3FKpm8VkRhFNbsOgRfPVXeMT9oYjTEyd%2F629uxVZIT4ZLPI%2FosICHIr7CKQm%2BhaDYPE%2FQLfOXRtIBoBX4i87Tk1hvtXBP%2F2Vrt%2BcunzSSFFeOUnGJtZ9DCcsd%2BeBjqyAd0hNlvQAA%2FLQdvH9gLGDv3KU77hBwryb7sGhRX7AbL1sJgKq81PPi9jDDMzt0ieyCGNsiWYqrkHfb8AOjEsie5HFKklYFWwRvXl7plux7KFS0JJDl%2FhpXTZVEtWmjwCXTIYnN0AZDk8eDlA5S2cnogpDLxrLWy%2FW6y9F4BbUFgBY7CDMhowiKVTqKrU9hWtfQqjSEk%2BQn%2FyEVnoYXnrDvmlhjTBDwwElIzWiPcTL6nAVJo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T150817Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFP7IUC5ZR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=968913d65444c109310d52d3298c51ec9042efa460d43481cc506a66f334e634",
            "images": {
                "THUMBNAIL": {
                    "url": "https://edamam-product-images.s3.amazonaws.com/web-img/52f/52f14a54a95cb7e8f0e847dd85bdc221-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLWVhc3QtMSJGMEQCIEYIE%2BdGVviYiVPtae3iWrq4nld1e6X99tE6mF2A1yUuAiBXJ0lfaPv1Pmef9PYLb3KMPU5YE6Y4mOoGebF8K1F5vSrBBQiQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDE4NzAxNzE1MDk4NiIMyN%2FA%2F7r0cuTDMesHKpUF8SWjQGxC%2BDjalAlPlOefd0HVzgeYKipnIslH%2FFlTfy4DKL1jQ9RCQWlGt1Pe6k%2B05dqMSg8gZ7BhuJGR4lx7Pj7AJCJXN7gUT%2BIuesGwdlRuF1jNM8f2LOWjKWnrSKqwwKXFj99aLT08F46uQRaOaNIMzbwAcWBiFu7vubMEPE%2F%2F60jgPQ%2B3h9TqnhqPxr4ZUvgXI9f3P4xT%2FIRTAzkMzyYczts%2Bd6gApous5bulnMjupWZxZEtZWx81UAVGK40x6MX5F3JycFhj18Q6%2BYOHYe9hkwuoOUyr1aSxuPUtuE2iDYIorlQMjalyYaUKFHtoFcB5lXKTh%2B%2FxqICj9%2BRcChitRFRurbxf3kvxNbzwIc%2Fx3KqIiGLQGxYvcy89KkHBVc7rSpiAzRsGFBlAxMm0UDLR4jMCjznDlZ2E3fz2xvyOVEFiZKdD5jc2yzmSAlQ%2Fmu1wbHcTLibKOWmnhkZi8zlBOQNftSIm4tUn%2BQe3AeQkRvcn7mL%2BH3%2FN1klnDHdwqxCxk9ob0qxVhr9txdegeAM9qYkkWbjFoCrmAc2VI8Pkq4qfkccs4qFIcm22nu6z%2BvWHjYKv6yjZfPXmRLdiNNh%2F%2BCPkZiDBI5okxnnx9mLfXrKVUrZLadOyJXW3oqg%2BmpP8GOk694gxvQ1%2BVsZ7nTjgl0QnzM56SChPlH4NNSN3Z1nMwrUTyJ%2FOYN3XD0ZtIwa0KKPgmXoMRbvTW17usUqYReOOSC7J07EsD3BjmvZ24yi4yTrqQDLE08wc%2F3FKpm8VkRhFNbsOgRfPVXeMT9oYjTEyd%2F629uxVZIT4ZLPI%2FosICHIr7CKQm%2BhaDYPE%2FQLfOXRtIBoBX4i87Tk1hvtXBP%2F2Vrt%2BcunzSSFFeOUnGJtZ9DCcsd%2BeBjqyAd0hNlvQAA%2FLQdvH9gLGDv3KU77hBwryb7sGhRX7AbL1sJgKq81PPi9jDDMzt0ieyCGNsiWYqrkHfb8AOjEsie5HFKklYFWwRvXl7plux7KFS0JJDl%2FhpXTZVEtWmjwCXTIYnN0AZDk8eDlA5S2cnogpDLxrLWy%2FW6y9F4BbUFgBY7CDMhowiKVTqKrU9hWtfQqjSEk%2BQn%2FyEVnoYXnrDvmlhjTBDwwElIzWiPcTL6nAVJo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T150817Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFP7IUC5ZR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=2b414446826c85762d9855f51d4301a4cf2b8ebb11de8ea7957dc8678e69e4ae",
                    "width": 100,
                    "height": 100
                },
                "SMALL": {
                    "url": "https://edamam-product-images.s3.amazonaws.com/web-img/52f/52f14a54a95cb7e8f0e847dd85bdc221-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLWVhc3QtMSJGMEQCIEYIE%2BdGVviYiVPtae3iWrq4nld1e6X99tE6mF2A1yUuAiBXJ0lfaPv1Pmef9PYLb3KMPU5YE6Y4mOoGebF8K1F5vSrBBQiQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDE4NzAxNzE1MDk4NiIMyN%2FA%2F7r0cuTDMesHKpUF8SWjQGxC%2BDjalAlPlOefd0HVzgeYKipnIslH%2FFlTfy4DKL1jQ9RCQWlGt1Pe6k%2B05dqMSg8gZ7BhuJGR4lx7Pj7AJCJXN7gUT%2BIuesGwdlRuF1jNM8f2LOWjKWnrSKqwwKXFj99aLT08F46uQRaOaNIMzbwAcWBiFu7vubMEPE%2F%2F60jgPQ%2B3h9TqnhqPxr4ZUvgXI9f3P4xT%2FIRTAzkMzyYczts%2Bd6gApous5bulnMjupWZxZEtZWx81UAVGK40x6MX5F3JycFhj18Q6%2BYOHYe9hkwuoOUyr1aSxuPUtuE2iDYIorlQMjalyYaUKFHtoFcB5lXKTh%2B%2FxqICj9%2BRcChitRFRurbxf3kvxNbzwIc%2Fx3KqIiGLQGxYvcy89KkHBVc7rSpiAzRsGFBlAxMm0UDLR4jMCjznDlZ2E3fz2xvyOVEFiZKdD5jc2yzmSAlQ%2Fmu1wbHcTLibKOWmnhkZi8zlBOQNftSIm4tUn%2BQe3AeQkRvcn7mL%2BH3%2FN1klnDHdwqxCxk9ob0qxVhr9txdegeAM9qYkkWbjFoCrmAc2VI8Pkq4qfkccs4qFIcm22nu6z%2BvWHjYKv6yjZfPXmRLdiNNh%2F%2BCPkZiDBI5okxnnx9mLfXrKVUrZLadOyJXW3oqg%2BmpP8GOk694gxvQ1%2BVsZ7nTjgl0QnzM56SChPlH4NNSN3Z1nMwrUTyJ%2FOYN3XD0ZtIwa0KKPgmXoMRbvTW17usUqYReOOSC7J07EsD3BjmvZ24yi4yTrqQDLE08wc%2F3FKpm8VkRhFNbsOgRfPVXeMT9oYjTEyd%2F629uxVZIT4ZLPI%2FosICHIr7CKQm%2BhaDYPE%2FQLfOXRtIBoBX4i87Tk1hvtXBP%2F2Vrt%2BcunzSSFFeOUnGJtZ9DCcsd%2BeBjqyAd0hNlvQAA%2FLQdvH9gLGDv3KU77hBwryb7sGhRX7AbL1sJgKq81PPi9jDDMzt0ieyCGNsiWYqrkHfb8AOjEsie5HFKklYFWwRvXl7plux7KFS0JJDl%2FhpXTZVEtWmjwCXTIYnN0AZDk8eDlA5S2cnogpDLxrLWy%2FW6y9F4BbUFgBY7CDMhowiKVTqKrU9hWtfQqjSEk%2BQn%2FyEVnoYXnrDvmlhjTBDwwElIzWiPcTL6nAVJo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T150817Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFP7IUC5ZR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e878f2e9e74874ab8a82bd144f6c7a0f08ec7fc5e2d4e4e40127219a7173701b",
                    "width": 200,
                    "height": 200
                },
                "REGULAR": {
                    "url": "https://edamam-product-images.s3.amazonaws.com/web-img/52f/52f14a54a95cb7e8f0e847dd85bdc221.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLWVhc3QtMSJGMEQCIEYIE%2BdGVviYiVPtae3iWrq4nld1e6X99tE6mF2A1yUuAiBXJ0lfaPv1Pmef9PYLb3KMPU5YE6Y4mOoGebF8K1F5vSrBBQiQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDE4NzAxNzE1MDk4NiIMyN%2FA%2F7r0cuTDMesHKpUF8SWjQGxC%2BDjalAlPlOefd0HVzgeYKipnIslH%2FFlTfy4DKL1jQ9RCQWlGt1Pe6k%2B05dqMSg8gZ7BhuJGR4lx7Pj7AJCJXN7gUT%2BIuesGwdlRuF1jNM8f2LOWjKWnrSKqwwKXFj99aLT08F46uQRaOaNIMzbwAcWBiFu7vubMEPE%2F%2F60jgPQ%2B3h9TqnhqPxr4ZUvgXI9f3P4xT%2FIRTAzkMzyYczts%2Bd6gApous5bulnMjupWZxZEtZWx81UAVGK40x6MX5F3JycFhj18Q6%2BYOHYe9hkwuoOUyr1aSxuPUtuE2iDYIorlQMjalyYaUKFHtoFcB5lXKTh%2B%2FxqICj9%2BRcChitRFRurbxf3kvxNbzwIc%2Fx3KqIiGLQGxYvcy89KkHBVc7rSpiAzRsGFBlAxMm0UDLR4jMCjznDlZ2E3fz2xvyOVEFiZKdD5jc2yzmSAlQ%2Fmu1wbHcTLibKOWmnhkZi8zlBOQNftSIm4tUn%2BQe3AeQkRvcn7mL%2BH3%2FN1klnDHdwqxCxk9ob0qxVhr9txdegeAM9qYkkWbjFoCrmAc2VI8Pkq4qfkccs4qFIcm22nu6z%2BvWHjYKv6yjZfPXmRLdiNNh%2F%2BCPkZiDBI5okxnnx9mLfXrKVUrZLadOyJXW3oqg%2BmpP8GOk694gxvQ1%2BVsZ7nTjgl0QnzM56SChPlH4NNSN3Z1nMwrUTyJ%2FOYN3XD0ZtIwa0KKPgmXoMRbvTW17usUqYReOOSC7J07EsD3BjmvZ24yi4yTrqQDLE08wc%2F3FKpm8VkRhFNbsOgRfPVXeMT9oYjTEyd%2F629uxVZIT4ZLPI%2FosICHIr7CKQm%2BhaDYPE%2FQLfOXRtIBoBX4i87Tk1hvtXBP%2F2Vrt%2BcunzSSFFeOUnGJtZ9DCcsd%2BeBjqyAd0hNlvQAA%2FLQdvH9gLGDv3KU77hBwryb7sGhRX7AbL1sJgKq81PPi9jDDMzt0ieyCGNsiWYqrkHfb8AOjEsie5HFKklYFWwRvXl7plux7KFS0JJDl%2FhpXTZVEtWmjwCXTIYnN0AZDk8eDlA5S2cnogpDLxrLWy%2FW6y9F4BbUFgBY7CDMhowiKVTqKrU9hWtfQqjSEk%2BQn%2FyEVnoYXnrDvmlhjTBDwwElIzWiPcTL6nAVJo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230130T150817Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFP7IUC5ZR%2F20230130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=968913d65444c109310d52d3298c51ec9042efa460d43481cc506a66f334e634",
                    "width": 300,
                    "height": 300
                }
            },
            "url": "http://www.seriouseats.com/recipes/2014/06/buttered-spinach-from-the-nourished-kitchen.html",
            "yield": 4,
            "dietLabels": [
                "Low-Carb"
            ],
            "healthLabels": [
                "Sugar-Conscious",
                "Keto-Friendly",
                "Vegetarian",
                "Pescatarian",
                "Gluten-Free",
                "Wheat-Free",
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
                "FODMAP-Free",
                "Kosher",
                "Immuno-Supportive"
            ],
            "ingredientLines": [
                "2 large bunches young spinach (about 1 1/4 pounds)",
                "1 tablespoon unsalted butter",
                "1/2 teaspoon finely ground unrefined sea salt",
                "1/4 teaspoon ground white pepper",
                "2 hard-cooked eggs, peeled and minced"
            ],
            "calories": 357.997806375,
            "mealType": [
                "lunch/dinner"
            ],
            "totalNutrients": {
                "ENERC_KCAL": {
                    "label": "Energy",
                    "quantity": 357.997806375,
                    "unit": "kcal"
                },
                "FAT": {
                    "label": "Fat",
                    "quantity": 22.229602803749998,
                    "unit": "g"
                },
                "FASAT": {
                    "label": "Saturated",
                    "quantity": 10.268815991375,
                    "unit": "g"
                },
                "FATRN": {
                    "label": "Trans",
                    "quantity": 0.46547599999999995,
                    "unit": "g"
                },
                "FAMS": {
                    "label": "Monounsaturated",
                    "quantity": 6.30801504625,
                    "unit": "g"
                },
                "FAPU": {
                    "label": "Polyunsaturated",
                    "quantity": 2.502536263125,
                    "unit": "g"
                },
                "CHOCDF": {
                    "label": "Carbs",
                    "quantity": 21.897933788750002,
                    "unit": "g"
                },
                "CHOCDF.net": {
                    "label": "Carbohydrates (net)",
                    "quantity": 9.266943613750001,
                    "unit": "g"
                },
                "FIBTG": {
                    "label": "Fiber",
                    "quantity": 12.630990175,
                    "unit": "g"
                },
                "SUGAR": {
                    "label": "Sugars",
                    "quantity": 3.2858799425000003,
                    "unit": "g"
                },
                "SUGAR.added": {
                    "label": "Sugars, added",
                    "quantity": 0,
                    "unit": "g"
                },
                "PROCNT": {
                    "label": "Protein",
                    "quantity": 26.4630272275,
                    "unit": "g"
                },
                "CHOLE": {
                    "label": "Cholesterol",
                    "quantity": 328.93,
                    "unit": "mg"
                },
                "NA": {
                    "label": "Sodium",
                    "quantity": 1489.4034237560463,
                    "unit": "mg"
                },
                "CA": {
                    "label": "Calcium",
                    "quantity": 606.9010578750296,
                    "unit": "mg"
                },
                "MG": {
                    "label": "Magnesium",
                    "quantity": 456.7707362083346,
                    "unit": "mg"
                },
                "K": {
                    "label": "Potassium",
                    "quantity": 3268.646947416677,
                    "unit": "mg"
                },
                "FE": {
                    "label": "Iron",
                    "quantity": 16.414150908750408,
                    "unit": "mg"
                },
                "ZN": {
                    "label": "Zinc",
                    "quantity": 3.8670365345834563,
                    "unit": "mg"
                },
                "P": {
                    "label": "Phosphorus",
                    "quantity": 419.88932662499997,
                    "unit": "mg"
                },
                "VITA_RAE": {
                    "label": "Vitamin A",
                    "quantity": 2875.513269125,
                    "unit": "µg"
                },
                "VITC": {
                    "label": "Vitamin C",
                    "quantity": 159.4503199625,
                    "unit": "mg"
                },
                "THIA": {
                    "label": "Thiamin (B1)",
                    "quantity": 0.49589456075000005,
                    "unit": "mg"
                },
                "RIBF": {
                    "label": "Riboflavin (B2)",
                    "quantity": 1.4875959741250002,
                    "unit": "mg"
                },
                "NIA": {
                    "label": "Niacin (B3)",
                    "quantity": 4.163446948499999,
                    "unit": "mg"
                },
                "VITB6A": {
                    "label": "Vitamin B6",
                    "quantity": 1.203457401875,
                    "unit": "mg"
                },
                "FOLDFE": {
                    "label": "Folate equivalent (total)",
                    "quantity": 1135.64749725,
                    "unit": "µg"
                },
                "FOLFD": {
                    "label": "Folate (food)",
                    "quantity": 1135.64749725,
                    "unit": "µg"
                },
                "FOLAC": {
                    "label": "Folic acid",
                    "quantity": 0,
                    "unit": "µg"
                },
                "VITB12": {
                    "label": "Vitamin B12",
                    "quantity": 0.9121400000000002,
                    "unit": "µg"
                },
                "VITD": {
                    "label": "Vitamin D",
                    "quantity": 1.9730000000000003,
                    "unit": "µg"
                },
                "TOCPHA": {
                    "label": "Vitamin E",
                    "quantity": 12.663346388749998,
                    "unit": "mg"
                },
                "VITK1": {
                    "label": "Vitamin K",
                    "quantity": 2739.2309434125,
                    "unit": "µg"
                },
                "Sugar.alcohol": {
                    "label": "Sugar alcohol",
                    "quantity": 0,
                    "unit": "g"
                },
                "WATER": {
                    "label": "Water",
                    "quantity": 580.546136891667,
                    "unit": "g"
                }
            }
        },
        "_links": {
            "self": {
                "title": "Self",
                "href": "https://api.edamam.com/api/recipes/v2/924eb3e7aa1edca2f11dce652e1c9c72?type=public&app_id=01e9579a&app_key=08c4b8ce44973e5658e1fafd517be559"
            }
        }
    }
    console.log(testdata.recipe.image);

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



    <div className="App h-screen w-screen bg-gray-800 text-white overflow-x-hidden">
    {/*App div*/}

        {/*Main container*/}
        <div className="flex flex-col items-center pt-10 pb-10">

            <h1 className="font-bold text-5xl pb-5 text-center">MealSpiration</h1>
            <p className="text-lg text-center pb-5 italic">"A recipe is a story that ends with a good meal."</p>

            {/*Input container*/}
            <div className="flex flex-col items-center">

                {/*Search container*/}
                <div className="input-group flex flex-row items-center w-auto">
                    <input className="h-8 border text-black  border-black rounded-2xl w-60" type="text" />
                    <BsSearch className="text-black bg-white rounded-r-2xl relative right-5"/>
                </div>
                
                {/*Filters*/}
                <div className="flex justify-center gap-5">
                    <mealTypeContext.Provider value={{mealTypeOpen, setMealTypeOpen,healthOpen,setHealthOpen,dietOpen,setDietOpen,dishTypeOpen,setDishTypeOpen, breakfastChecked,setBreakfastChecked,brunchChecked,setBrunchChecked,lunchChecked,setLunchChecked,snackChecked,setSnackChecked,teatimeChecked,setTeatimeChecked}}>
                    <MealTypeFilter/>
                    </mealTypeContext.Provider>

                    <healthContext.Provider value={{mealTypeOpen, setMealTypeOpen,healthOpen,setHealthOpen,dietOpen,setDietOpen,dishTypeOpen,setDishTypeOpen,alcoholfreeChecked,setAlcoholfreeChecked,dairyfreeChecked,setDairyfreeChecked,glutenfreeChecked,setGlutenfreeChecked,peanutfreeChecked,setPeanutfreeChecked,lowsugarChecked,setLowsugarchecked}}>
                    <HealthFilter/>
                    </healthContext.Provider>

                    <dietContext.Provider value={{mealTypeOpen, setMealTypeOpen,healthOpen,setHealthOpen,dietOpen,setDietOpen,dishTypeOpen,setDishTypeOpen,veganChecked,setVeganChecked,vegetarianChecked,setVegetarianChecked,ketoChecked,setKetoChecked,kosherChecked,setKosherChecked,paleoChecked,setPaleoChecked}}>
                    <DietFilter/>
                    </dietContext.Provider>

                    <dishTypeContext.Provider value={{mealTypeOpen, setMealTypeOpen,healthOpen,setHealthOpen,dietOpen,setDietOpen,dishTypeOpen,setDishTypeOpen,mainChecked,setMainChecked,sideChecked,setSideChecked,dessertChecked,setDessertChecked,drinksChecked,setDrinksChecked}}>
                    <DishTypeFilter/>
                    </dishTypeContext.Provider>


                </div>

            </div>
            
            {/*Cards container*/}
            <div className="pt-40 gap-5 w-full flex flex-row flex-wrap items-center justify-center">
                <Card data={testdata}/>
                <Card data={testdata}/>
                <Card data={testdata}/>
                <Card data={testdata}/>
                <Card data={testdata}/>
                <Card data={testdata}/>
                <Card data={testdata}/>
                <Card data={testdata}/>
                <Card data={testdata}/>
                <Card data={testdata}/>
                <Card data={testdata}/>
                <Card data={testdata}/>
                <Card data={testdata}/>
                <Card data={testdata}/>
                <Card data={testdata}/>
            </div>

        </div>

      

    </div>

  )
}

export default App
