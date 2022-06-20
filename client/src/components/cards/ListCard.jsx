import React, { useState} from "react";
import CardModal from "./CardModal";

const ListCard = ({ card }) => {
  const [showModal, setshowModal] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setshowModal(!showModal);
  }

  return showModal ? <CardModal id={card._id} /> : (
    <div className="card-background">
      <div className="card" onClick={toggleModal}>
        <i className="edit-toggle edit-icon sm-icon"></i>
        <div className="card-info">
          <p>{card.title}</p>
        </div>
        <div className="card-icons">
          <i className="clock-icon sm-icon overdue-recent completed">{card.dueDate}</i>
          <i className="description-icon sm-icon"></i>
          <i className="comment-icon sm-icon"></i>
        </div>
      </div>
    </div>
  )
}

export default ListCard;