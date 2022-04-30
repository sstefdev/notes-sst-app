import { API } from "aws-amplify";

import { UserBill } from "types";

export const loadNotes = () => API.get("notes", "/notes", () => {});

export const loadNote = (id: string) =>
  API.get("notes", `/notes/${id}`, () => {});

export const saveNote = ({
  content,
  attachment,
  id,
}: {
  content: string;
  attachment: string | File;
  id: string;
}) =>
  API.put("notes", `/notes/${id}`, {
    body: { content, attachment },
  });

export const createNote = (note: any) =>
  API.post("notes", "/notes", {
    body: note,
  });

export const deleteNote = (id: string) =>
  API.del("notes", `/notes/${id}`, () => {});

export const billUser = (details: UserBill) =>
  API.post("notes", "/billing", {
    body: details,
  });
