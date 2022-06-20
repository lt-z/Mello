import React, { useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { editList } from "../../features/boards/boards";
import ListCard from "../cards/ListCard";
import { createCard } from "../../features/cards/cards"

const List = ({lst}) => {
  const title = lst.title
  const dispatch = useDispatch()
  const [listTitleText, setListTitleText] = useState(title)
  const [listTitleConfirmed, setListTitleConfirmed] = useState(true)
  const cards = useSelector((state) => state.cards).filter((card) => card.listId === lst._id);
  const [showAddCard, setShowAddCard] = useState(false);
  const toggleAddCard = () => setShowAddCard(!showAddCard);

  const listWrapperClass = showAddCard ? "list-wrapper add-dropdown-active" : "list-wrapper";
  const dropDownClass = showAddCard ? "add-dropdown add-bottom active-card" : "add-dropdown add-bottom";
  const [cardTitle, setCardTitle] = useState("") 

  const handleListTitleClick = (e) => {
    e.preventDefault();
    setListTitleConfirmed(false);
  }
  
  const handleTextChange = (e) => {
    e.preventDefault();
    setCardTitle(e.target.value)
  }

  const handleAddCardSubmit = (e) => {
    e.preventDefault()
    const newCard = {
      listId: lst._id,
      card: {
        title: cardTitle,
      }
    }
    dispatch(createCard({newCard, setCardTitle, toggleAddCard}))
  }

  const renderListTitleLine = () => {
    if (listTitleConfirmed) {
      return (
        <p className="list-title" onClick={handleListTitleClick}>{listTitleText}</p>
        )
    }
    return (
      <input className="list-title" onChange={handleTitleTextChange} onKeyDown={handleListTitleSubmitEnterKey} value={listTitleText} onBlur={handleBlur} />
    )
  }

  const handleListTitleSubmitEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      dispatch(editList({id: lst._id, updatedList: {...lst, title: listTitleText}}))
      setListTitleConfirmed(true)
    }
  }

  const handleBlur = () => {
    dispatch(editList({id: lst._id, updatedList: {...lst, title: listTitleText}}))
    setListTitleConfirmed(true)
  }
  
  const handleTitleTextChange = (e) => {
    e.preventDefault()
    setListTitleText(e.target.value)
  }

  return (
    <div className={listWrapperClass}>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {renderListTitleLine()}
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id="list-1-cards">
            {cards.map((card) => < ListCard key={card._id} card={card} />)}
            <div className="card-background">
              <div className="card ">
                <i className="edit-toggle edit-icon sm-icon"></i>
                
                <div className="card-info">
                  <div className="card-label green colorblindable"></div>
                  <div className="card-label yellow colorblindable"></div>
                  <div className="card-label red colorblindable"></div>
                  <div className="card-label orange colorblindable"></div>
                  <div className="card-label blue colorblindable"></div>
                  <div className="card-label purple colorblindable"></div>
                  <p>
                    Cards do many cool things. Click on this card to
                    open it and learn more...
                  </p>
                </div>
                <div className="card-icons">
                  <i className="clock-icon sm-icon overdue-recent completed">
                    Aug 4
                  </i>
                  <i className="description-icon sm-icon"></i>
                  <i className="comment-icon sm-icon"></i>
                </div>
              </div>
            </div>
            <div className="card-background">
              <div className="card ">
                <i className="edit-toggle edit-icon sm-icon"></i>
                <div className="cover-image"></div>
                <div className="card-info">
                  <p>Another list with stuff</p>
                </div>
                <div className="card-icons">
                  <i className="clock-icon sm-icon overdue ">Aug 3</i>
                  <i className="description-icon sm-icon"></i>
                </div>
              </div>
            </div>
            <div className="card-background">
              <div className="card ">
                <i className="edit-toggle edit-icon sm-icon"></i>
                <div className="cover-image"></div>
                <div className="card-info">
                  <p>
                    Use the + in the top menu to make your first board
                    now.
                  </p>
                </div>
                <div className="card-icons"></div>
              </div>
            </div>
          </div>
          <div className={dropDownClass}>
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card" onChange={handleTextChange} value={cardTitle}></textarea>
              <div className="members"></div>
            </div>
            <a className="button" onClick={handleAddCardSubmit}>Add</a>
            <i className="x-icon icon" onClick={toggleAddCard}></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom" onClick={toggleAddCard}>
            Add a card...
          </div>
        </div>
      </div>
    </div>
  )
}

export default List;
