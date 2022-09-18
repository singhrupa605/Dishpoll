import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Slide,
} from "@mui/material";
import React, { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = ({
  setOpen,
  open,
  dishId,
  polledDishes,
  setRatingButton,
  votes,
  rankstatus,

  ratingButton,
}) => {
  const [rank, setRank] = useState("");

  const handleRating = (event) => {
    setRank(event.target.value);
  };
  const handleCancel = () => {
    handleClose();
  };

  const handleSave = () => {
    localStorage.setItem(
      "ratings",
      JSON.stringify({ ...votes, [rank]: dishId })
    );
    localStorage.setItem(
      "ratingstatus",
      JSON.stringify({ ...rankstatus, [rank]: false })
    );
    handleClose();
  };

  const dish = polledDishes.filter((dish) => dish.id === dishId);
  let dishName = "";
  if (dish.length) {
    dishName = dish[0].dishName;
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {rankstatus ? (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
        >
          {dishName ? (
            <DialogTitle
              sx={{
                alignSelf: "center",
                color: (theme) => theme.palette.grey[600],
              }}
            >
              {dishName}
            </DialogTitle>
          ) : null}
          <DialogContent sx={{ alignSelf: "center" }}>
            <FormControl>
              <RadioGroup onChange={handleRating}>
                <FormControlLabel
                  value="rank1"
                  disabled={!rankstatus.rank1}
                  control={<Radio />}
                  label="Rank 1"
                />
                <FormControlLabel
                  value="rank2"
                  disabled={!rankstatus.rank2}
                  control={<Radio />}
                  label="Rank 2"
                />
                <FormControlLabel
                  value="rank3"
                  disabled={!rankstatus.rank3}
                  control={<Radio />}
                  label="Rank 3"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </div>
  );
};

export default DialogBox;
