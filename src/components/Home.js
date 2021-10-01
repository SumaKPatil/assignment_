import React, { useState } from "react";
import "./Home.css";
import Friend from "./Friend";
import { clientSearch } from "./util";

const Home = () => {
  const [friendNames, setFriendNames] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentOP, setCurrentOp] = useState("add");
  const addName = (name) => {
    if (name) {
      const id = new Date().getTime();

      const _friendNames = { ...friendNames };
      _friendNames[id] = { name, stared: false, id };
      console.log(_friendNames);

      setFriendNames(_friendNames);
    }
  };

  const removeName = (id) => {
    const _friendNames = { ...friendNames };
    delete _friendNames[id];
    setFriendNames(_friendNames);
  };

  const starHandler = (id) => {
    const newList = { ...friendNames };
    newList[id].stared = !newList[id].stared;
    setFriendNames(newList);
  };

  return (
    <div className="wrapper">
      <div className="main-div">
        <div className="heading">
          <h2>Friends List</h2>
        </div>
        <div className="op-wrapper">
          {currentOP === "add" ? (
            <div className="inputDiv">
              <input
                name="name"
                type="text"
                onKeyDown={(e) => {
                  e.key === "Enter" && addName(e.target.value);
                }}
                placeholder="Enter your friends name here"
                className="header-input"
              />
            </div>
          ) : (
            <div className="header-op">
              <button onClick={() => setCurrentOp("add")}>
                Switch to Add Friend
              </button>
            </div>
          )}
          {currentOP === "search" ? (
            <div className="inputDiv">
              <input
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                placeholder="Search your friends"
                className="header-input"
              />
            </div>
          ) : (
            <div className="header-op">
              <button onClick={() => setCurrentOp("search")}>
                Switch to Search
              </button>
            </div>
          )}
        </div>
        <Friend
          friends={clientSearch(
            Object.values(friendNames),
            "name",
            searchQuery
          )}
          removeName={removeName}
          starHandler={starHandler}
        />
      </div>
    </div>
  );
};

export default Home;
