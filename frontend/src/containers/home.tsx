import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

import { useUserData } from "lib/user-context";
import { loadNotes } from "lib/api";
import { Note } from "types";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useUserData();

  useEffect(() => {
    const onLoad = async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        console.log(e);
      }

      setIsLoading(false);
    };

    onLoad();
  }, [isAuthenticated]);

  const renderNotesList = (notes: Note[]) => (
    <>
      <Link to="/notes/new">
        <ListGroup.Item action className="py-3 text-nowrap text-truncate">
          <BsPencilSquare size={17} />
          <span className="ml-2 font-weight-bold">Create a new note</span>
        </ListGroup.Item>
      </Link>
      {notes.map(({ noteId, content, createdAt }) => (
        <Link key={noteId} to={`/notes/${noteId}`}>
          <ListGroup.Item action>
            <span className="font-weight-bold">
              {content?.trim().split("\n")[0]}
            </span>
            <br />
            <span className="text-muted">
              Created: {new Date(createdAt!).toLocaleString()}
            </span>
          </ListGroup.Item>
        </Link>
      ))}
    </>
  );

  const renderLander = () => (
    <div className="lander">
      <h1>Scratch</h1>
      <p className="text-muted">A simple note taking app</p>
    </div>
  );

  const renderNotes = () => (
    <div className="notes">
      <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
      <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
    </div>
  );

  return (
    <div className="Home">
      {isAuthenticated && notes.length > 0 ? renderNotes() : renderLander()}
    </div>
  );
};

export default Home;
