import React, { useState } from "react";
import "./Home.css";
import Friend from "./Friend";
let searchResult = [];

const findRelated = (letter, arr) => {
  console.log(letter);
  let regexp = new RegExp(`^${letter}*`, "i");
  const result = arr.filter((val) => val.match(regexp));
  //console.log("result:", result);
  return result;
};

const Home = () => {
  const [friendNames, setFriendNames] = useState([]);
  const [searching, setSearching] = useState(false);

  // const changeHandler = (value) => {
  //   if (value.length > 0) {
  //     console.log(value);
  //     searchResult = findRelated(value, friendNames);
  //     console.log(searchResult);
  //     setSearching(true);
  //   } else if (value.length === 0) {
  //     setSearching(false);
  //   }
  // };

  const addName = (name) => {
    setSearching(false);
    if (name) {
      const newList = [{ name, stared: false }, ...friendNames];
      setFriendNames(newList);
      console.log(newList);
    }
  };

  const removeName = (index) => {
    const newList = friendNames.filter((val, i) => i !== index);
    setFriendNames(newList);
    console.log(newList);
  };

  const starHandler = (index) => {
    const newList = [...friendNames];
    newList[index].stared = !newList[index].stared;
    setFriendNames(newList);
  };

  return (
    <div className="wrapper">
      <div className="main-div">
        <div className="Heading">
          <h4>Friends List</h4>
        </div>
        <div className="inputDiv">
          <input
            name="name"
            type="text"
            // onChange={(e) => changeHandler(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" && addName(e.target.value);
            }}
            placeholder="Enter your friends name here"
          ></input>
        </div>
        <div>
          <Friend
            friends={searching ? searchResult : friendNames}
            removeName={removeName}
            starHandler={starHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
