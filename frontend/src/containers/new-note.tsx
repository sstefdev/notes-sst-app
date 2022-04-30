import { Form } from "react-bootstrap";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { s3Upload } from "lib/aws-lib";
import { onError } from "lib/error-lib";
import { createNote } from "lib/api";
import LoaderButton from "components/loader-button";
import config from "config";

const NewNote = () => {
  const file = useRef<null | any>(null);
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => content.length > 0;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    file.current = event.target.files![0];
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
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
      const attachment = file.current ? await s3Upload(file.current) : "";

      await createNote({ content, attachment });
      navigate("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="NewNote">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Control
            value={content}
            as="textarea"
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="file">
          <Form.Label>Attachment</Form.Label>
          <Form.Control onChange={handleFileChange} type="file" />
        </Form.Group>
        <LoaderButton
          type="submit"
          size="lg"
          isLoading={isLoading}
          disabled={!validateForm()}
          className="w-100"
        >
          Create
        </LoaderButton>
      </Form>
    </div>
  );
};

export default NewNote;
