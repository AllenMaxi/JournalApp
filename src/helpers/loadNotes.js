import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {
  const collecNotes = await db.collection(`${uid}/journal/notes`).get();
  const notes = [];
  collecNotes.forEach((item) => {
    notes.push({
      id: item.id,
      ...item.data(),
    });
  });

  return notes;
};
