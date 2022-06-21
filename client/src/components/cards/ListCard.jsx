import React, { useState} from "react";
import { useHistory } from 'react-router-dom';

const ListCard = ({ card }) => {
  const history = useHistory();
  const handleCardModal = () => history.push(`/cards/${card._id}`);

  return (
    <div className="card-background">
      <div className="card" onClick={handleCardModal}>
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