import "./Generate.css";

function Generate() {
  return (
    <div className="generatorContainer">
      <button className="buttonClass">Generate Recipes</button>
      <button className="buttonClass">Add Filters</button>
      <div>
        <p>No recipes generated...</p>
      </div>
    </div>
  );
}

export default Generate;
