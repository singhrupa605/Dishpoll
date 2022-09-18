import axios from "axios";
const usersUrl =
  "https://raw.githubusercontent.com/syook/react-dishpoll/main/users.json";
const dishesUrl =
  "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json";
  

export const getUsers = async () => {
  try {
    const users = await axios.get(usersUrl);
    return users.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDishes = async () => {
  try {
    const dishes = await axios.get(dishesUrl);
    return dishes.data;
  } catch (error) {
    console.log(error);
  }
};
