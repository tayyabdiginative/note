import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainScreen from "../components/MainScreen";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../redux/action/noteAction";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const MyNotes = ({ search }) => {
  const [myNotes, setNotes] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, notes } = noteList;
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;
  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;
  // const noteCreate = useSelector((state) => state.noteCreate);
  // const { success: successCreate } = noteCreate;

  // }
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };
  useEffect(() => {
    dispatch(listNotes());
    if (!userLogin) {
      navigate("/");
    }
  }, [dispatch, successUpdate, userLogin, noteDelete]);
  return (
    <MainScreen title={`Wellcome back ${userLogin.userInfo.name}`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {notes &&
        notes
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((note) => (
            <Accordion>
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(note)}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion as={Card.Text} variant="link" eventKey="0">
                      {note.title}
                    </Accordion>
                  </span>
                  {userLogin.userInfo.isAdmin == true ? (
                    <div>
                      <Button href={`/note/${note._id}`}>Edit</Button>
                      <Button
                        onClick={() => deleteHandler(note._id)}
                        variant="danger"
                        className="mx-2"
                      >
                        Delete
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                </Card.Header>
                <Accordion.Collapse>
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Category - {note.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{note.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}{" "}
    </MainScreen>
  );
};

export default MyNotes;
