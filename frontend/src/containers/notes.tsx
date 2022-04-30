import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Storage } from "aws-amplify";
import { Form } from "react-bootstrap";
import LoaderButton from "components/loader-button";
import config from "config";

import { s3Upload } from "lib/aws-lib";
import { onError } from "lib/error-lib";
import { deleteNote, loadNote, saveNote } from "lib/api";
import { Note } from "types";

const Notes = () => {
  const file = useRef<HTMLInputElement | any>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note>({} as Note);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const onLoad = async () => {
      try {
        const note = await loadNote(id!);
        const { content, attachment } = note;

        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
        }

        setContent(content);
        setNote(note);
      } catch (e) {
        onError(e);
      }
    };

    onLoad();
  }, [id]);

  const validateForm = () => content.length > 0;

  const formatFilename = (str: string | File) => {
    if (typeof str === "string") {
      return str.replace(/^\w+-/, "");
    } else {
      return;
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    file.current = event.target.files![0];
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    let attachment;

    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }

      if (id)
        await saveNote({
          content,
          attachment: attachment || note.attachment,
          id,
        });

      navigate("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  const handleDelete = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      if (id) await deleteNote(id);
      navigate("/");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  };

  return (
    <div className="Notes">
      {note && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="content">
            <Form.Control
              as="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="file">
            <Form.Label>Attachment</Form.Label>
            {note.attachment && (
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={note.attachmentURL}
                >
                  {formatFilename(note.attachment)}
                </a>
              </p>
            )}
            <Form.Control onChange={handleFileChange} type="file" />
          </Form.Group>
          <div className="d-flex flex-column">
            <LoaderButton
              size="lg"
              type="submit"
              isLoading={isLoading}
              disabled={!validateForm()}
              className="mb-3"
            >
              Save
            </LoaderButton>
            <LoaderButton
              size="lg"
              className="btn-danger"
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              Delete
            </LoaderButton>
          </div>
        </Form>
      )}
    </div>
  );
};

export default Notes;
