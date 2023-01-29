import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./PantryItem.css";
import Ingredient from "./Ingredient";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";

function PantryItem() {
  const category_to_label = {
    Drinks: "Liquids & Drinks",
    Meat: "Meats",
    "Fruit-Vegetable": "Fruits & Vegetables",
    Toppings: "Jams & Toppings",
    Spices: "Spices",
    Oil: "Oils & Other Liquids",
    "Rice-Pasta": "Pastas & Rice",
    "Bread-Grains": "Breads & Wheat",
  };

  const { category } = useParams();
  const title = category_to_label[category];
  const [open, setOpen] = useState(false);
  const [ingredient, setIngredient] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function addIngredient() {
    const temp = category.replace("-", "/");
    const response = await fetch("http://localhost:5000/addItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          category: temp,
          name,
          quantity,
          unit,
        },
      ]),
    });
    // const res = await response.json();

    getIngredient();
  }

  async function deleteIngredient(ingredientName) {
    const response = await fetch("http://localhost:5000/removeItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: ingredientName,
      }),
    });

    getIngredient();
  }

  async function getIngredient() {
    const temp = category.replace("-", "/");
    const response = await fetch("http://localhost:5000/getByCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: temp,
      }),
    });
    const res = await response.json();
    setIngredient(res.data);
  }

  useEffect(() => {
    getIngredient();
  }, [category]);

  return (
    <>
      <div className="ingredientList">
        <h2>{title}</h2>
        {!!ingredient.length &&
          ingredient?.map((item) => (
            <Ingredient
              name={item[0]}
              amount={item[1]}
              unit={item[2]}
              onDelete={deleteIngredient}
            />
          ))}
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
          <TextField
            id="outlined-basic"
            label="Item Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Unit"
            variant="outlined"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
          <button
            className="buttonClass"
            onClick={() => {
              addIngredient();
              handleClose();
            }}
          >
            Add Ingredient
          </button>
        </Box>
      </Modal>
    </>
  );
}

export default PantryItem;
