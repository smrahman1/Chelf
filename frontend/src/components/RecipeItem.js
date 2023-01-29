import "./RecipeItem.css";
import { GiHotMeal } from "react-icons/gi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";

function RecipeItem(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="recipe">
        <GiHotMeal className="recipeIcon" />
        <h2 className="recipeTitle">{props.item.Name}</h2>
        <div onClick={() => setOpen(true)}>
          <VisibilityIcon className="viewIcon" />
        </div>
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
          {/* {props.ingredients} */}

          {/* {props.instructions.map((item) => (
            <div className="instruction">{item}</div>
          ))} */}
        </Box>
      </Modal>
    </>
  );
}

export default RecipeItem;
