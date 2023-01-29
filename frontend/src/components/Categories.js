import { ArrowRight } from "./Icons";
import { Link } from "react-router-dom";
import "./FoodCategories.css";
function FoodCategories({ icon, title, keyRoute }) {
  return (
    <Link
      to={`/pantry/${keyRoute}`}
      style={{
        textDecoration: "none",
        color: "black",
        width: "100%",
      }}
    >
      <div className="rounded-button">
        <div className="innerButton">
          {icon}
          <div className="title2">{title}</div>
        </div>

        <ArrowRight />
      </div>
    </Link>
  );
}

export default FoodCategories;
