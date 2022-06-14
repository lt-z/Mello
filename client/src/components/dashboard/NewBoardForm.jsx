import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { createBoard } from "../../features/boards/boards";

const NewBoardForm = (props) => {
  const { value: title, bind: bindTitle } = useInput("");

  const dispatch = useDispatch();

  const addBoard = useCallback(
    (newBoard, callback) => {
      dispatch(createBoard(newBoard, callback));
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      const newBoard = { title };
      addBoard(newBoard, props.onCloseClick(new Event("click")));
    },
    [addBoard, props, title]
  );

  return (
    <div>
      <header>
        <span>Create Board</span>
        <a
          href="#"
          className="icon-sm icon-close"
          onClick={props.onCloseClick}
        ></a>
      </header>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <dl>
            <dt>Title</dt>
            <dd>
              <input
                type="text"
                placeholder='Like "Publishing Calendar"...'
                value={title}
                {...bindTitle}
              />
            </dd>
          </dl>
          <button className="button" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBoardForm;
