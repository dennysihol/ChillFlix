import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FAV_FILM } from "../config/graphql";
import ListCard from "../components/Card";

export default function Favorites() {
    const { data } = useQuery(GET_FAV_FILM);
    return (
      <div style={{paddingBottom: "20px", height: "100vh", overflow: "auto"}}>
        <h1 className="text-center mt-4" style={{color: "white"}}>List Favorites</h1>
        <div className="d-flex flex-wrap container">
          {data?.favFilms.map((film, idx) => (
            <ListCard key={idx} film={film} action={false} />
          ))}
        </div>
      </div>
    );
}
