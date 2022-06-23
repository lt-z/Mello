import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { updateCard } from "../../features/cards/cards"

const CardTitle = ({ card }) => {
  const dispatch = useDispatch();
  const [cardTitle, setCardTitle] = useState(card.title);

  const handleBlur = () => {
    const cardData = {
      card: {card: { title: cardTitle }},
      id: card._id
    }
    dispatch(updateCard(cardData))
  }
  
  const handleTitleChange = (e) => {
    e.preventDefault()
    setCardTitle(e.target.value)
  }

  return (
    <textarea className="list-title" style={{ height: "45px" }} value={cardTitle} onChange={handleTitleChange} onBlur={handleBlur}>
      {cardTitle}
    </textarea>
  )
}

export default CardTitle;