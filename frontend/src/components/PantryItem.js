import { useParams } from "react-router-dom";
import "./PantryItem.css";

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
      <div className="ingredient">
        <h4>Tomatoes</h4>
        <div>
          <p>2 L</p>
        </div>
      </div>
    </div>
  );
}

export default PantryItem;
