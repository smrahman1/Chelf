import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./PantryItem.css";
import Ingredient from "./Ingredient";
import { useState } from "react";
import { TextField } from "@mui/material";

function PantryItem() {
  const category_to_label = {
    Drinks: "Liquids & Drinks",
    Meats: "Meats",
    "Fruits-Vegetables": "Fruits & Vegetables",
    Toppings: "Jams & Toppings",
    Spices: "Spices",
    Oil: "Oils & Other Liquids",
    "Rice-Pasta": "Pastas & Rice",
    "Bread-Wheat": "Breads & Wheat",
  };

  const { category } = useParams();
  const title = category_to_label[category];
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="ingredientList">
        <h2>{title}</h2>
        <Ingredient name="Tomatoes" amount="4" unit="Single"></Ingredient>
        <Ingredient name="Apples" amount="6" unit="Single"></Ingredient>
        <Ingredient name="Bell Peppers" amount="2" unit="Single"></Ingredient>
        <button className="buttonClass" onClick={handleOpen}>
          Add Ingredient
        </button>
      </div>
      <Modal
        // hideBackdrop
        open={open}
        onClose={handleClose}
        sx={{
          position: "absolute",
          top: "28%",
          left: "10%",
        }}
      >
        <Box
          sx={{
            paddingTop: "50px",
            paddingLeft: "15px",
            paddingRight: "15px",
            width: "290px",
            height: "300px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <TextField id="outlined-basic" label="Item Name" variant="outlined" />
          <TextField id="outlined-basic" label="Amount" variant="outlined" />
          <TextField id="outlined-basic" label="Unit" variant="outlined" />
          <button className="buttonClass">Add Ingredient</button>
        </Box>
      </Modal>
    </>
  );
}

export default PantryItem;
