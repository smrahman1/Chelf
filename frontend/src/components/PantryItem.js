import { useParams } from "react-router-dom";
import "./PantryItem.css";
import Ingredient from "./Ingredient";


function PantryItem() {
  const category_to_label = {
    Drinks: "Liquids & Drinks",
    Meats: "Meats",
    "Fruits-Vegetables": "Fruits & Vegetables",
    Toppings: "Jams & Toppings",
    Spices: "Spices",
    Oil: "Oils & Other Liquids",
    "Rice-Pasta": "Pastas & Rice",
    "Bread-Wheat": "Breads & Wheat",
  };
  const { category } = useParams();
  const title = category_to_label[category];

  return (
    <div className="ingredientList">
      <h2>{title}</h2>
      <Ingredient name="Tomatoes" amount="4" unit="U"></Ingredient>
      <Ingredient name="Apples" amount="6" unit="U"></Ingredient>
      <Ingredient name="Bell Peppers" amount="2" unit="U"></Ingredient>
      <button>
        Add Ingredient
      </button>
    </div>
  );
}

export default PantryItem;
