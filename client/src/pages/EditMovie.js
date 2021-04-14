import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";

const EDIT_MOVIE = gql`
  mutation EditMovie($id: String, $movie: editMovie) {
    editMovie(_id: $id, movie: $movie) {
      msg
    }
  }
`;

const EDIT_SERIES = gql`
  mutation EditSeries($id: String, $series: editSeries) {
    editSeries(_id: $id, series: $series) {
      msg
    }
  }
`;

export default function EditMovie() {
  const location = useLocation();
  const {
    id,
    title,
    overview,
    poster_path,
    popularity,
    tags,
    type,
  } = location.state;

  const history = useHistory();

  const [form, setForm] = useState({
    title: title,
    overview: overview,
    popularity: popularity,
    poster_path: poster_path,
    tags: tags,
  });

  const [typeEdit, setTypeEdit] = useState(type);

  const [editMovie] = useMutation(EDIT_MOVIE);
  const [editSeries] = useMutation(EDIT_SERIES);

  const category = [
    "action",
    "comedy",
    "horror",
    "thriller",
    "romance",
    "drama",
    "sci-fi",
    "mystery",
    "martial arts",
    "animation",
    "anime",
    "fantasy"
];

  function onChangeForm(event) {
    let { name, value } = event.target;

    if (name === "popularity") {
      value = Number(value);
    }

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleTags(event) {
    if (event.target.checked) {
      let temp = JSON.parse(JSON.stringify(form.tags));
      temp.push(event.target.value);
      setForm({
        ...form,
        tags: temp,
      });
    } else {
      let temp = JSON.parse(JSON.stringify(form.tags));
      temp = temp.filter((tag) => tag !== event.target.value);
      setForm({
        ...form,
        tags: temp,
      });
    }
  }

  function typeHandle(event) {
    setTypeEdit(event.target.value);
  }

  function submitForm(event) {
    event.preventDefault();
    if (type === "Movie") {
      editMovie({
        variables: {
          id,
          movie: form,
        },
        refetchQueries: ["GetMovies"],
      });
      Swal.fire({
        icon: "success",
        title: "Success Edit Movie",
      });
      history.push("/movies");
    } else if (type === "Series") {
      editSeries({
        variables: {
          id,
          series: form,
        },
        refetchQueries: ["GetSeries"],
      });
      Swal.fire({
        icon: "success",
        title: "Success Edit Series",
      });
      history.push("/series");
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center" style={{color: "white"}}>Edit Movies or Series</h1>
      <Form onSubmit={submitForm}>

        <Form.Group>
          <Form.Label style={{color: "white"}}>Type</Form.Label>
          <Form.Control as="select" value={typeEdit} onChange={typeHandle}>
            <option>Movie</option>
            <option>Series</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label style={{color: "white"}}>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={onChangeForm}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label style={{color: "white"}}>Overview</Form.Label>
          <Form.Control
            type="text"
            name="overview"
            placeholder="Overview"
            value={form.overview}
            onChange={onChangeForm}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label style={{color: "white"}}>Popularity</Form.Label>
          <Form.Control
            type="number"
            name="popularity"
            placeholder="Popularity"
            value={form.popularity}
            onChange={onChangeForm}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label style={{color: "white"}}>Poster Path</Form.Label>
          <Form.Control
            type="text"
            name="poster_path"
            placeholder="Poster Path"
            value={form.poster_path}
            onChange={onChangeForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{color: "white"}}>Tags</Form.Label>
          <br />
          {category &&
            category.map((tag, index) => (
              <Form.Check
                style={{color: "white"}}
                inline
                key={index}
                label={tag}
                onChange={handleTags}
                value={tag}
                checked={form.tags.includes(tag)}
              />
            ))}
        </Form.Group>
        <Button variant="info" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
