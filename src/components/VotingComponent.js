import { Stack, Button, Typography } from "@mui/material";
import React from "react";
import "./VotingComponent.css";
import { useSnackbar } from "notistack";

export let polledDishes = [];
const VotedPolls = ({
  polledDishes,
  setOpen,
  votes,
  setDishId,
  setPolledDishes,
  rankstatus,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleRating = (event) => {
    const id = Number(event.target.id);
    setDishId(id);
    let isSelected = false;
    for (let vote in votes) {
      if (votes[vote] === id && votes[vote] > 0) {
        isSelected = true;
        break;
      }
    }
    if (isSelected) {
      enqueueSnackbar(
        "You have already rated this dish, select another dish to rate",
        { variant: "warning" }
      );
      return false;
    } else {
      setOpen(true);
      return true;
    }
  };

  const handleRemove = (event) => {
    const id = Number(event.target.id);

    for (let vote in votes) {
      if (votes[vote] === id && votes[vote] > 0) {
        localStorage.setItem(
          "ratings",
          JSON.stringify({ ...votes, [vote]: -1 })
        );
        localStorage.setItem(
          "ratingstatus",
          JSON.stringify({ ...rankstatus, [vote]: true })
        );
        break;
      }
    }

    const newList = polledDishes.filter((dish) => dish.id !== id);
    setPolledDishes([...newList]);
  };

  return (
    <Stack spacing={2}>
      {polledDishes.map((item) =>
        votes ? (
          <Stack key={item.id} className="voting-stack" spacing={2}>
            <Typography
              variant="h5"
              sx={{
                color: (theme) => theme.palette.grey[600],
                fontWeight: "bold",
              }}
            >
              {item.dishName}
            </Typography>

            <Stack
              direction="row"
              sx={{
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{ margin: "0.5rem" }}
                onClick={handleRemove}
                id={item.id}
              >
                Remove
              </Button>
              <Button
                variant="contained"
                sx={{ margin: "0.5rem" }}
                onClick={handleRating}
                id={item.id}
              >
                Rate
              </Button>
            </Stack>
          </Stack>
        ) : null
      )}
    </Stack>
  );
};

export default VotedPolls;
