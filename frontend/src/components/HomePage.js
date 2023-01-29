import { CameraIcon } from "./Icons";
import "./HomePage.css";
import PantryComponent from "./PantryComponent";
import LiquorIcon from "@mui/icons-material/Liquor";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import {
  GiFruitBowl,
  GiHoneyJar,
  GiHotSpices,
  GiBrandyBottle,
  GiBowlOfRice,
  GiSlicedBread,
} from "react-icons/gi";

function HomePage() {
  const RefrigeratorItems = [
    { icon: <LiquorIcon />, title: "Drinks and Liquor", key: "Drinks" },
    { icon: <KebabDiningIcon />, title: "Meats", key: "Meats" },
    {
      icon: <GiFruitBowl size={"24px"} />,
      title: "Fruits/Vegetables",
      key: "Fruits-Vegetables",
    },
    {
      icon: <GiHoneyJar size="24px" />,
      title: "Jams & Toppings",
      key: "Toppings",
    },
  ];

  const PantryItems = [
    { icon: <GiHotSpices size="24px" />, title: "Spices", key: "Spices" },
    {
      icon: <GiBrandyBottle size="24px" />,
      title: "Oil & Other Liquids",
      key: "Oil",
    },
    {
      icon: <GiBowlOfRice size={"24px"} />,
      title: "Pastas & Rice",
      key: "Rice-Pasta",
    },
    {
      icon: <GiSlicedBread size="24px" />,
      title: "Bread & Wheat",
      key: "Bread-Wheat",
    },
  ];
  return (
    <div className="container">
      <PantryComponent
        icon={<CameraIcon />}
        title="Refrigerator"
        items={RefrigeratorItems}
      />
      <PantryComponent
        icon={<CameraIcon />}
        title="Pantry"
        items={PantryItems}
      />
    </div>
  );
}

export default HomePage;
