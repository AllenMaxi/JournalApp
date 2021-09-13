import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { activeNote, startDeletingNote } from "../../actions/notes";
import { useForm } from "../../customHook/useForm";
import NotesAppBar from "./NotesAppBar";

const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const [values, handleInputChange, reset] = useForm(note);
  const { body, title } = values;

  const activeID = useRef(note.id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (note.id !== activeID) {
      reset(note);
      activeID.current = note.id;
    }
  }, [note]);

  const handleBlur = () => {
    dispatch(activeNote(values.id, { ...values }));
  };

  const handleDelete = () => {
    dispatch(startDeletingNote(note.id));
  };
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="The best title"
          className="notes__input"
          name="title"
          value={title}
          onBlur={handleBlur}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="what happened today?"
          className="notes__textarea"
          autoComplete="off"
          name="body"
          value={body}
          onBlur={handleBlur}
          onChange={handleInputChange}
        ></textarea>

        {note.url && (
          <div className="notes__image">
            <img src={note.url} alt="starts" />
          </div>
        )}
      </div>
      <button onClick={handleDelete} className="btn btn-danger">
        Delete
      </button>
    </div>
  );
};

export default NoteScreen;
