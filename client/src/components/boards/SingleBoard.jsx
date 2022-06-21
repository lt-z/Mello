import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import React, {useState, useEffect}  from "react";
import { fetchBoard } from "../../features/boards/boards"
import { createList } from "../../features/lists/lists"
import List from "../lists/List"

const SingleBoard = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const board = useSelector((state) => state.boards).find((b) => b._id === id);
  const lists = useSelector((state) => state.lists).filter((l) => l.boardId === id);
  const cards = useSelector((state) => state.cards);

  let boardId;

  if (location.pathname.startsWith('/boards')) {
    boardId = id;
  } else {
    const card = cards.find((c) => c._id === id);
    if (card) {
      boardId = card.boardId;
    }
  }

  useEffect(() => {
    if (boardId) {
      dispatch(fetchBoard(boardId))
    }
  }, [dispatch, boardId]);

  const [newListClass, setNewListClass] = useState("new-list")
  const [listTitle, setListTitle] = useState("")

  const handleListTitleChange = (e) => {
    e.preventDefault()
    setListTitle(e.target.value)
  }

  const handleAddAListSave = async (e) => {
    e.preventDefault()
     // TODO: callback function to handle setting class. only if it is successful.
    const newList = {
      boardId: id,
      list: {
        title: listTitle
      }
    }
    await dispatch(createList({newList, setNewListClass}))
  }

  const handleXClickFromAddAList = (e) => {
    e.preventDefault()
    setNewListClass("new-list")
  }

  return (board === undefined || lists === undefined) ? null : (
    <>
       <header>
        <ul>
          <li id="title">{board.title}</li>
          <li className="star-icon icon"></li>
          <li className="private private-icon icon">Private</li>
        </ul>
        <div className="menu">
          <i className="more-icon sm-icon"></i>Show Menu
        </div>
        <div className="subscribed">
          <i className="sub-icon sm-icon"></i>Subscribed
        </div>
      </header>
      <main>
        <div id="list-container" className="list-container">
          <div id="existing-lists" className="existing-lists">
          {lists.map((list) => (
            < List key={list._id} lst={list} />
            ))}
          </div>
          <div id="new-list" className={newListClass}>
            <span onClick={() => setNewListClass('new-list selected')}>Add a list...</span>
            <input type="text" onChange={handleListTitleChange} placeholder="Add a list..." value={listTitle}/>
            <div>
              <input type="submit" className="button" value="Save" onClick={handleAddAListSave}/>
              <i className="x-icon icon" onClick={handleXClickFromAddAList}></i>
            </div>
          </div>
        </div>
      </main>
      <div className="menu-sidebar">
        <div id="menu-main" className="main slide">
          <i className="back-icon icon"></i>
          <i className="x-icon icon"></i>
          <h1>Menu</h1>
          <div className="menu-contents">
            <div className="members">
              <div className="member-container">
                <div className="card-member ">VR</div>
              </div>
              <div className="member-container">
                <div className="card-member admin">TP</div>
              </div>
              <div className="member-container">
                <div className="card-member ">KW</div>
              </div>
            </div>
            <div className="add-members">
              <i className="add-icon sm-icon"></i>Add Members...
            </div>
            <hr />
            <ul className="menu-list">
              <li className="background-item">Change Background</li>
              <li className="filter-icon menu-icon">Filter Cards</li>
              <li className="power-icon menu-icon not-implemented">Power-Ups</li>
              <li className="stickers-icon menu-icon not-implemented">Stickers</li>
              <li className="more-icon menu-icon">More</li>
              <hr />
              <li className="activity-icon menu-icon not-implemented">Activity</li>
            </ul>
            <ul className="activity-list">
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>yesterday at 4:53 PM</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> sent{" "}
                  <span className="link">
                    Use the + in the top menu to make your first board now.
                  </span>{" "}
                  to the board <small>4 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> archived{" "}
                  <span className="link">
                    Use the + in the top menu to make your first board now.
                  </span>{" "}
                  <small>4 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>5 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>6 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>yesterday at 10:23 PM</small>
                </p>
              </li>
            </ul>
            <a className="all-activity not-implemented">View all activity...</a>
          </div>
        </div>
      </div>
      <div id="modal-container"></div>
      <div id="dropdown-container"></div>
    </>
  );
};

export default SingleBoard;
