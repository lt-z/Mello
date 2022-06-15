import React, { useState }  from "react";
import { useDispatch } from "react-redux"


const List = ({title}) => {
  return (
    <div className="list-wrapper">
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            <p className="list-title">{title}</p>
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
          <div className="add-dropdown add-bottom">
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom">
            Add a card...
          </div>
        </div>
      </div>
    </div>
  )
}

export default List;
