import React, { useEffect, useState } from "react";
import "./Friend.css";
import { ReactComponent as Delete } from "../assets/trash_icon.svg";
import { ReactComponent as StartMarked } from "../assets/filled_star_icon.svg";
import { ReactComponent as Star } from "../assets/blank_star_icon.svg";
import { ReactComponent as RightIcon } from "../assets/arrow_right_icon.svg";
import { ReactComponent as LeftIcon } from "../assets/arrow_left_icon.svg";
import { Modal } from "./modal";
let selectedList = -1;
let currentShowingData = -1;
const Friend = ({ numberOfItems = 4, friends, starHandler, removeName }) => {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    setList(friends || []);
    setCurrentPage(1);
  }, [friends]);

  const handlePagination = (value) => {
    setCurrentPage((prev) => prev + value);
  };

  const sliceList = (pageNum) => {
    const _list = [...list];

    return _list.slice(
      (pageNum - 1) * numberOfItems,
      pageNum * (numberOfItems || 4)
    );
  };
  const getListOfFreind = () => {
    return sliceList(currentPage).map((friend, i, arr) => (
      <div key={friend.id} className="each-friend">
        <div className="firstHalf">
          {friend.name}
          <div className="subtext">is your friend</div>
        </div>
        <div className="secondHalf">
          {friend.stared ? (
            <StartMarked
              className="icon-button"
              onClick={() => {
                starHandler && starHandler(friend.id);
              }}
            />
          ) : (
            <Star
              className="icon-button"
              onClick={() => {
                starHandler && starHandler(friend.id);
              }}
            />
          )}
          <Delete
            className="icon-button"
            onClick={() => {
              selectedList = i + (currentPage - 1) * numberOfItems;
              currentShowingData = arr.length;
              setOpenModal(true);
            }}
          />
        </div>
      </div>
    ));
  };

  const switchPageOnDelete = () => {
    if (currentShowingData == 1 && currentPage != 1) {
      setCurrentPage((prev) => prev - 1);
    }
    removeName && removeName(list[selectedList].id);
    setOpenModal(false);
  };

  const getStatusOfRightArrow = () => {
    return currentPage !== Math.ceil(list.length / (numberOfItems || 4));
  };

  const getStatusOfLeftArrow = () => {
    return currentPage !== 1;
  };

  return (
    <div className="friend-parent">
      <div className="friend-list">{getListOfFreind()}</div>
      {list.length > numberOfItems && (
        <div className="friend-arrow">
          <LeftIcon
            className={getStatusOfLeftArrow() ? "icon" : "icon disable-icon"}
            onClick={
              getStatusOfLeftArrow()
                ? () => {
                    handlePagination(-1);
                  }
                : () => {
                    console.log("left arrow disabled");
                  }
            }
          />
          <RightIcon
            className={getStatusOfRightArrow() ? "icon" : "icon disable-icon"}
            onClick={
              getStatusOfRightArrow()
                ? () => {
                    handlePagination(+1);
                  }
                : () => {
                    console.log("right arrow disabled");
                  }
            }
          />
        </div>
      )}
      {openModal && (
        <Modal>
          <div className="warning-modal">
            <div className="title">
              Are you sure to Delete{" "}
              <strong>{list?.[selectedList]?.name}</strong>?
            </div>
            <div className="modal-button-wrapper">
              <div className="cancel-button">
                <button
                  onClick={() => {
                    setOpenModal(false);
                    selectedList = -1;
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className="delete-button">
                <button onClick={switchPageOnDelete}>Delete</button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default React.memo(Friend);
