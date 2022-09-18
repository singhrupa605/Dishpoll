import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import "./LandingPage.css";
import Dashboard from "./Dashboard";
import { Stack, Button, Typography, Grid } from "@mui/material";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { getDishes } from "./Data";
import DialogBox from "./Dialog";
import VotedPolls from "./VotingComponent";

const LandingPage = () => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [polledDishes, setPolledDishes] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dishes, setDishes] = useState([]);
  const [dishId, setDishId] = useState(-1);

  const username = localStorage.getItem("username");
  let votes = JSON.parse(localStorage.getItem("ratings"));
  let rankstatus = JSON.parse(localStorage.getItem("ratingstatus"));
  let localdishes = JSON.parse(localStorage.getItem("polleddishes"));

  const performAPICall = async () => {
    const data = await getDishes();
    if (data.length) {
      setDishes(data);
    } else {
      setDishes([]);
    }
    setLoading(false);
  };

  const handleClearAction = () => {
    if (polledDishes.length) {
      setPolledDishes([]);
      localStorage.setItem(
        "ratings",
        JSON.stringify({
          rank1: -1,
          rank2: -1,
          rank3: -1,
        })
      );
      localStorage.setItem(
        "ratingstatus",
        JSON.stringify({
          rank1: true,
          rank2: true,
          rank3: true,
        })
      );
      enqueueSnackbar("Polls cleared successfully ", {
        variant: "success",
      });
    }
    else {
      enqueueSnackbar("No polls to clear, please add using the add button", {
        variant: "warning",
      });
    }
  };

  useEffect(() => {
    (async () => {
      await performAPICall();
      if (votes === null) {
        localStorage.setItem(
          "ratings",
          JSON.stringify({
            rank1: -1,
            rank2: -1,
            rank3: -1,
          })
        );
      }
      if (!votes || !rankstatus) {
        localStorage.setItem(
          "ratingstatus",
          JSON.stringify({
            rank1: true,
            rank2: true,
            rank3: true,
          })
        );
      }

      if (localdishes) {
        setPolledDishes([...localdishes]);
      }
    })();
  }, []);

  const handleViewAction = () => {
    if (votes.rank1 < 0 || votes.rank2 < 0 || votes.rank3 < 0) {
      enqueueSnackbar("Please select all 3 ranks  to view the poll results", {
        variant: "warning",
      });
      return;
    } else {
      localStorage.setItem("polleddishes", JSON.stringify(polledDishes));
      navigate("/pollresults");
    }
  };

  return (
    <Stack className="parent-box" spacing={2}>
      <Header username={username} />
      <DialogBox
        setOpen={setOpen}
        dishId={dishId}
        open={open}
        polledDishes={polledDishes}
        votes={votes}
        rankstatus={rankstatus}
      />
      {username ? (
        <Stack direction="row" spacing={2}>
          <Button onClick={handleViewAction} variant="contained">
            <span>View Poll Results</span>
          </Button>

          <Button variant="contained" onClick={handleClearAction}>
            Clear Polls
          </Button>
        </Stack>
      ) : null}
      {username ? (
        <Grid container className="voting-grid">
          <Grid
            item
            xs={polledDishes.length ? 8 : 12}
            md={polledDishes.length ? 8 : 12}
          >
            <Dashboard
              loading={loading}
              dishes={dishes}
              setPolledDishes={setPolledDishes}
              polledDishes={polledDishes}
            />
          </Grid>
          {polledDishes.length ? (
            <Grid item xs={4} md={4}>
              <VotedPolls
                dishId={dishId}
                setDishId={setDishId}
                setOpen={setOpen}
                polledDishes={polledDishes}
                votes={votes}
                rankstatus={rankstatus}
                setPolledDishes={setPolledDishes}
              />
            </Grid>
          ) : null}
        </Grid>
      ) : (
        <Typography sx={{ paddingTop: "10rem" }} variant="h5">
          Oops something went wrong! Please make sure you logged in or refresh
          the page.
        </Typography>
      )}
    </Stack>
  );
};

export default LandingPage;
