import React from "react";
import "./Friend.css";
const stars = [];

const Friend = (props) => {
  const list = props.friends;

  let friendList = list.map((friend, i) => (
    <div className="each-friend">
      <div className="firsthalf" key={i}>
        {friend.name}
      </div>
      <div className="secondHalf">
        <div
          onClick={() => {
            props.starHandler(i);
          }}
        >
          {friend.stared ? "stared" : "star"}
        </div>
        <div
          onClick={() => {
            props.removeName(i);
          }}
        >
          delete
        </div>
      </div>
    </div>
  ));

  return <div>{friendList}</div>;
};
export default Friend;
