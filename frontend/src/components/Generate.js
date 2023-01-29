import "./Generate.css";
import LoopIcon from "@mui/icons-material/Loop";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import RecipeItem from "./RecipeItem";
import { useState, useEffect } from "react";

function Generate() {
  const [data, setData] = useState({});

  const generateData = async () => {
    const response = await fetch("http://localhost:5000/generateRecipe", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setData(data);
  };

  return (
    <>
      <div className="container3">
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
        {data && data.map((item) => <RecipeItem item={item} />)}
        {!data && <div className="noRecipes">No Recipes Found</div>}
      </div>
    </>
  );
}

export default Generate;
