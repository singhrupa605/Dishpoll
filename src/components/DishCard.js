import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./DishCard.css";
import AddIcon from "@mui/icons-material/Add";
import { useSnackbar } from "notistack";

const DishCard = ({ dish, setPolledDishes, polledDishes, isAddButton }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleOnClick = () => {
    if (polledDishes.length >= 3) {
      enqueueSnackbar(
        "You cannot add more than 3 dishes to vote. Remove one dish from the vote cart to add this dish.",
        { variant: "warning" }
      );
      return false;
    } else {
      const matched = polledDishes.filter((item) => item.id === dish.id);
      if (matched.length) {
        enqueueSnackbar(
          "You cannot add same dish twice. Please select another dish",
          { variant: "warning" }
        );
        return false;
      } else {
        setPolledDishes([...polledDishes, dish]);
        enqueueSnackbar("Dish added for rating", { variant: "success" });

        return true;
      }
    }
  };

  return (
    <Card className="card">
      <CardMedia component="img" image={dish.image} />
      <CardContent className="content">
        <Typography gutterBottom variant="h5" component="div">
          {dish.dishName}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          {dish.description}
        </Typography>
      </CardContent>
      {isAddButton ? (
        <CardActions className="cardaction">
          <Button onClick={handleOnClick} variant="contained">
            <AddIcon color="tertiary" />
            Add to vote
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
};
export default DishCard;
