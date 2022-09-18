import DishCard from "./DishCard";
import { CircularProgress, Grid, Box, Typography } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import "./Dashboard.css";

const Dashboard = ({
  handleClickOpen,
  polledDishes,
  setPolledDishes,
  dishes,
  loading,
}) => {
  return (
    <Box className="dish-grid">
      <Box className="child-grid">
        {loading === true ? (
          <Box className="loading">
            <Box>
              {" "}
              <CircularProgress fontSize="large" />
            </Box>
            <Box>
              {" "}
              <Typography variant="h5">Loading Dishes....</Typography>
            </Box>
          </Box>
        ) : dishes.length ? (
          <Grid container spacing={2}>
            {dishes.map((item) => (
              <Grid item xs={12} md={3} key={item.id}>
                <DishCard
                  handleClickOpen={handleClickOpen}
                  dish={item}
                  isAddButton
                  polledDishes={polledDishes}
                  setPolledDishes={setPolledDishes}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box className="smiley">
            <SentimentDissatisfiedIcon fontSize="large" />
            <Typography variant="h6">Sorry! no dishes found</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
