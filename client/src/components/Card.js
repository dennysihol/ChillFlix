import React from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import client, { GET_FAV_FILM } from "../config/graphql";
import { GET_ALL } from "../pages/Home"
import Swal from "sweetalert2";
import "../flip-card.css";

const REMOVE_MOVIE = gql`
  mutation RemoveMovie($id: String) {
    removeMovie(_id: $id) {
      msg
    }
  }
`;

const REMOVE_SERIES = gql`
  mutation RemoveSeries($id: String) {
    removeSeries(_id: $id) {
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
    console.log(id);
    if (type === "Movie") {
      removeMovie({
        variables: {
          id,
        },
        refetchQueries: [
          { query: GET_ALL }
        ],
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
        refetchQueries: [
          { query: GET_ALL }
        ],
      });
      Swal.fire({
        icon: "success",
        title: "Success Remove Series",
      });
    }
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
                    <h5>{title}</h5>
                  </div>
                  <div>
                    <p>"{overview}"</p>
                  </div>
                  <div>
                    <h6>Tags: {tags.join(", ")}</h6>
                  </div>
                  <div>
                    <h6><Image src="https://image.flaticon.com/icons/png/128/3163/3163742.png" rounded style={{width: "40px"}} />&nbsp;{popularity}%</h6>
                  </div>
                  {action && (
                    <div className="d-flex justify-content-around">
                      <Image 
                        src="https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Compose-512.png" 
                        style={{height: "40px"}}
                        onClick={() => editPage(_id)}
                        alt="Edit"
                      />
                      <Image
                        src="https://i.imgur.com/hUWMQ5Q.png"
                        style={{height: "40px"}}
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
                        alt="Favorite"
                        />
                      <Image 
                        src="https://i.imgur.com/Xek8q8Y.png" 
                        style={{height: "40px"}}
                        onClick={() => remove(_id)}
                        alt="Delete"
                      />
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