import "./Generate.css";
import LoopIcon from "@mui/icons-material/Loop";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import RecipeItem from "./RecipeItem";
import { useState, useEffect } from "react";

function Generate() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateData = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:5000/generateRecipe", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    setData(res.data);
    setLoading(false);
  };

  return (
    <>
      <div className="container3" onClick={generateData}>
        <div className="title3">Generate Recipes</div>
        <LoopIcon className="cycleIcon" />
      </div>

      <div className="container4">
        <FilterAltOutlinedIcon className="filterIcon" />
        <div className="filters">Add Filters</div>
        <div className="spacer"></div>
        <ArrowForwardIosOutlinedIcon className="arrowIcon" />
      </div>

      <div className="recipesContainer">
        {!!data?.length &&
          data.map((item) => (
            <RecipeItem
              item={item}
              key={item.Name}
              ingredients={item.Ingredients}
              instructions={item.Instructions}
            />
          ))}
        {!data?.length && !loading && (
          <div className="noRecipes">No recipes generated...</div>
        )}
        {loading && <div className="noRecipes">Loading...</div>}
      </div>
    </>
  );
}

export default Generate;
