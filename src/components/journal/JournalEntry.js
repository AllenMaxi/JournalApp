import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";

const JournalEntry = ({ id, date, title, body, url, note }) => {
  const noteDay = moment(date);
  const dispatch = useDispatch();

  const handleActive = () => {
    dispatch(activeNote(id, note));
  };

  return (
    <div
      className="journal__entry pointer animate__animated animate__fadeIn"
      onClick={handleActive}
    >
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}
      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>
      <div className="journal__entry-date">
        <span>{noteDay.format("dddd")}</span>
        <h4>{noteDay.format("Do")}</h4>
      </div>
    </div>
  );
};

export default JournalEntry;
