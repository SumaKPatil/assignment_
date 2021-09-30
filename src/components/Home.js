import React, { useState } from "react";
import "./Home.css";
import Friend from "./Friend";
import { clientSearch } from "./util";

const Home = () => {
  const [friendNames, setFriendNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addName = (name) => {
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
          <h2>Friends List</h2>
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
          <input
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder="Search your friends"
          ></input>
        </div>
        {/* <div style={{ height: "65%" }}> */}
        <Friend
          friends={clientSearch(friendNames, "name", searchQuery)}
          removeName={removeName}
          starHandler={starHandler}
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Home;
