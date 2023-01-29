import "./RecipeItem.css";
import { GiHotMeal } from "react-icons/gi";
import VisibilityIcon from "@mui/icons-material/Visibility";

function RecipeItem(props) {
  return (
    <div className="recipe">
      <GiHotMeal className="recipeIcon" />
      <h2 className="recipeTitle">{props.item.Name}</h2>
      <VisibilityIcon className="viewIcon" />
    </div>
  );
}

export default RecipeItem;
