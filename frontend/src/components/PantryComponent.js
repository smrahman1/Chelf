import "./PantryComponent.css";
import FoodCategories from "./Categories";
function PantryComponent({ title, items }) {
  return (
    <div className="container1">
      <div className="title">{title}</div>
      {items?.map((item) => (
        <FoodCategories
          icon={item.icon}
          title={item.title}
          keyRoute={item.key}
          key={item.key}
        />
      ))}
    </div>
  );
}

export default PantryComponent;
