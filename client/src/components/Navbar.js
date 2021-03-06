import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Image } from "react-bootstrap";

export default function NavbarTop() {
  const history = useHistory();

  function homePage() {
    history.push("/");
  }
  
  function addPage() {
    history.push("/add");
  }

  function moviesPage() {
    history.push("/movies");
  }
  
  function seriesPage() {
    history.push("/series");
  }

  function favouritesPage() {
    history.push("/favorites");
  }

  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand onClick={() => homePage()} style={{ fontWeight: "bold", fontSize: "30px", color: "#d00000", cursor: "pointer" }}>
        <Image src="https://i.imgur.com/Y6vbnmI.png" style={{height: "40px"}}/>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Nav className="mr-auto" style={{color: "white"}}>
        </Nav>
        <Nav>
          <Nav.Link onClick={() => moviesPage()} style={{ fontWeight: "bold", color: "white" }}>
            Movies
          </Nav.Link>
          <Nav.Link onClick={() => seriesPage()} style={{ fontWeight: "bold", color: "white" }}>
            Series
          </Nav.Link>
          <Nav.Link onClick={() => favouritesPage()} style={{ fontWeight: "bold", color: "white" }}>
            Favorites
          </Nav.Link>
          <Nav.Link onClick={() => addPage()} style={{ fontWeight: "bold", color: "white" }}>
            Add
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
