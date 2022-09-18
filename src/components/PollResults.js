import { Stack, Button, Grid, Box, Divider, Typography } from "@mui/material";
import Header from "./Header";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import DishCard from "./DishCard";
import "./PollResults.css";

const PollResults = () => {
  const votes = JSON.parse(localStorage.getItem("ratings"));
  const polleddishes = JSON.parse(localStorage.getItem("polleddishes"));
  const [dishes, setDishes] = useState([]);
  const username = localStorage.getItem("username");

  const PolledDishes = () => {
    const polls = [];
    polleddishes.forEach((dish) => {
      const prim = votes.rank1;
      const sec = votes.rank2;
      const ter = votes.rank3;
      let obj = null;
      if (dish.id === prim) {
        obj = { dish: dish, points: 30, title: " RANK #1 ", stars: 3 };
        polls.push(obj);
      }
      if (dish.id === sec) {
        obj = { dish: dish, points: 20, title: " RANK #2 ", stars: 2 };
        polls.push(obj);
      }
      if (dish.id === ter) {
        obj = { dish: dish, points: 10, title: " RANK #3 ", stars: 1 };
        polls.push(obj);
      }
    });

    sortDishes(polls);
    setDishes(polls);
  };

  const sortDishes = (array) => {
    array.sort((a, b) => {
      return b.points - a.points;
    });
  };

  useEffect(() => {
    PolledDishes();
  }, []);

  return (
    <Stack spacing={2}>
      <Header username={username} />

      {username ? (
        <Stack spacing={2}>
          {dishes.length ? (
            <Link className="link" to="/home" >
              <Button variant="contained" sx={{marginTop:"0.8rem"}}>Edit Polls</Button>{" "}
            </Link>
          ) : null}
          <Divider sx={{ bgcolor: "rgb(228, 224, 224)" }} />
          {dishes.length ? (
            <Grid container justifyContent="center" columnSpacing={2}>
              {dishes.map((poll) => (
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
                  sx={{ padding: "1rem" }}
                  key={poll.dish.id}
                >
                  {" "}
                  <Stack className="elems">
                    <Box
                      className="ranking"
                      sx={{ color: (theme) => theme.palette.grey[600] }}
                    >
                      <Typography variant="h5">{poll.title}</Typography>{" "}
                      <Typography>( {poll.points} Points )</Typography>
                    </Box>
                    <DishCard dish={poll.dish}></DishCard>{" "}
                    <ReactStars
                      count={3}
                      size={35}
                      value={poll.stars}
                      edit={false}
                      activeColor="#ffd700"
                    />{" "}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          ) : null}
        </Stack>
      ) : (
        <Typography sx={{ paddingTop: "10rem" }} variant="h5">
          Oops something went wrong! Please make sure you logged in or refresh
          the page.
        </Typography>
      )}
    </Stack>
  );
};

export default PollResults;
