import { DeleteIngredientIcon } from "./Icons";
import "./PantryItem.css"

function Ingredient({ name, amount, unit }) {
    return (
        <div className="ingredient">
            <h4>{ name }</h4>
            <div className="quantities">
              <div className="quantityNumber">
                { amount }
              </div>
              <div className="quantityUnit">
                { unit }
              </div>
              <DeleteIngredientIcon></DeleteIngredientIcon>
            </div>
        </div>
    )
}

export default Ingredient;
