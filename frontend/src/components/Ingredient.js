import { DeleteIngredientIcon } from "./Icons";
import "./PantryItem.css";

function Ingredient({ name, amount, unit, onDelete }) {
  return (
    <div className="ingredient">
      <h4>{name}</h4>
      <div className="quantities">
        <div className="quantityNumber">{amount}</div>
        <div className="quantityUnit">{unit}</div>
        <div
          onClick={() => {
            console.log("Hi");
            onDelete(name);
          }}
        >
          <DeleteIngredientIcon></DeleteIngredientIcon>
        </div>
      </div>
    </div>
  );
}

export default Ingredient;
