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

const REMOVE_SERIE = gql`
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
  const [removeSeries] = useMutation(REMOVE_SERIE);

  function remove(id) {
    if (type === "Movie") {
      removeMovie({
        variables: {
          id,
        },
        refetchQueries: ["GetMovies"],
      });
      Swal.fire({
        icon: "success",
        title: "Success Remove Movie",
      });
    } else if (type === "Series") {
      removeSeries({
        variables: {
          id,
        },
        refetchQueries: ["GetSeries"],
      });
      Swal.fire({
        icon: "success",
        title: "Success Remove Series",
      });
    }
  }

  function editPage(id) {
    history.push(`/edit-form/${id}`, {
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
    const { favFilms } = client.readQuery({ query: GET_FAV_FILM });
    client.writeQuery({
      query: GET_FAV_FILM,
      data: {
        favFilms: [...favFilms, favData],
      },
    });
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
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="back-card">
                <div
                  style={{
                    backgroundColor: "teal",
                    textAlign: "center",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <h5>{title}</h5>
                  </div>
                  <div>
                    <h6>{overview}</h6>
                  </div>
                  <div>
                    <p>{tags.join(", ")}</p>
                  </div>
                  <div>
                    <h4>{popularity}/10</h4>
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