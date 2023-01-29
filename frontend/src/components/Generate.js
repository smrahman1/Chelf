import "./Generate.css";
import LoopIcon from "@mui/icons-material/Loop";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import RecipeItem from "./RecipeItem";

function Generate() {
  const testData = [
    {
      title: "Chicken Parmesan",
    },
    {
      title: "Chick Parm",
    },
    {
      title: "Parm",
    },
  ];

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
        {testData && testData.map((item) => <RecipeItem item={item} />)}
        {!testData && <div className="noRecipes">No Recipes Found</div>}
      </div>
    </>
  );
}

export default Generate;
