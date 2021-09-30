import React, { useEffect, useState } from "react";
import "./Friend.css";
import logoTrash from "../assets/trash_icon.svg";
import yellowStar from "../assets/filled_star_icon.svg";
import star from "../assets/blank_star_icon.svg";
import rightIcon from "../assets/arrow_right_icon.svg";
import leftIcon from "../assets/arrow_left_icon.svg";
const stars = [];

const Friend = (props) => {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setList(props.friends);
  }, [props.friends]);

  const handlePagination = (value) => {
    setCurrentPage((prev) => prev + value);

    console.log("value", value);
  };

  const sliceList = (pageNum) => {
    const _list = [...list];
    console.log(pageNum);

    return _list.slice(
      (pageNum - 1) * (props.numberOfItems || 4),
      pageNum * (props.numberOfItems || 4)
    );
  };

  let friendList = sliceList(currentPage).map((friend, i) => (
    <div key={i} className="each-friend">
      <div className="firsthalf" key={i}>
        {friend.name}
        <div style={{ fontSize: "0.8rem", color: "grey" }}>is your friend</div>
      </div>
      <div className="secondHalf">
        <div
          className="star"
          onClick={() => {
            props.starHandler(i);
          }}
        >
          <img src={friend.stared ? yellowStar : star} />
        </div>
        <div
          className="trash"
          onClick={() => {
            props.removeName(i);
          }}
        >
          <img src={logoTrash} />
        </div>
      </div>
    </div>
  ));

  return (
    <div className="friend-parent">
      <div className="friend-list">{friendList}</div>
      {list.length > (props.numberOfItems || 4) && (
        <div className="friend-arrow">
          <div
            className="icon"
            onClick={
              currentPage !== 1
                ? () => {
                    handlePagination(-1);
                  }
                : () => {
                    console.log("left arrow disabled");
                  }
            }
          >
            <img src={leftIcon} />
          </div>
          <div
            className="icon"
            onClick={
              currentPage !==
              Math.ceil(list.length / (props.numberOfItems || 4))
                ? () => {
                    handlePagination(+1);
                  }
                : () => {
                    console.log("right arrow disabled");
                  }
            }
          >
            <img src={rightIcon} />
          </div>
        </div>
      )}
    </div>
  );
};
export default React.memo(Friend);
