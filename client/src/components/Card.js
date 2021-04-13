import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import client, { GET_FAV_FILM } from "../config/graphql";
import Swal from "sweetalert2";
import "../flip-card.css";

const REMOVE_MOVIE = gql`
  mutation RemoveMovie($id: String) {
    removeMovie(id: $id) {
      msg
    }
  }
`;

const REMOVE_SERIES = gql`
  mutation RemoveSerie($id: String) {
    removeSeries(id: $id) {
      msg
    }
  }
`;

export default function ListCard(props) {
  const { _id, title, overview, poster_path, popularity, tags } = props.film;
  const { type, action } = props;
  const history = useHistory();
  const [removeMovie] = useMutation(REMOVE_MOVIE);
  const [removeSeries] = useMutation(REMOVE_SERIES);

  function remove(id) {
    Swal.fire({
      icon: "success",
      title: "Success Remove Series",
    });
  }

  function editPage(id) {
    history.push(`/edit/${id}`, {
      id,
      title,
      overview,
      poster_path,
      popularity,
      tags,
      type,
    });
  }

  function addFav(favData) {
    Swal.fire({
      icon: "success",
      title: "Success Add To Favourite",
    });
  }

  return (
    <>
      <Row>
        <Col md={4}>
          <div className="main-container ml-5 mt-5">
            <div className="the-card">
              <div className="front-card">
                <Card.Img
                  variant="top"
                  src={poster_path}
                  style={{ width: "100%", height: "100%", borderRadius: "10px", backgroundColor: "#14213d"}}
                />
              </div>
              <div className="back-card">
                <div
                  style={{
                    backgroundColor: "#14213d",
                    textAlign: "center",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    borderRadius: "10px"
                  }}
                >
                  <div>
                    <h6>Title:</h6>
                    <h6>{title}</h6>
                  </div>
                  <div>
                    <h6>Overview:</h6>
                    <h6>{overview}</h6>
                  </div>
                  <div>
                    <h6>Tags:</h6>
                    <h6>{tags.join(", ")}</h6>
                  </div>
                  <div>
                    <h6>Rating:</h6>
                    <h6>{popularity}/10</h6>
                  </div>
                  {action && (
                    <div className="d-flex justify-content-around">
                      <Button className="mr-1" onClick={() => editPage(_id)}>
                        Edit
                      </Button>
                      <Button className="mr-1" onClick={() => remove(_id)}>
                        Delete
                      </Button>
                      <Button
                        className="mr-1"
                        onClick={() =>
                          addFav({
                            _id,
                            title,
                            overview,
                            poster_path,
                            popularity,
                            tags,
                          })
                        }
                      >
                        Fav
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}