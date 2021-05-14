import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Spinner } from "react-bootstrap";
import ListCard from "../components/Card";

export const GET_ALL = gql`
    query GetAll{
        getMovies {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
        getSeries {
          _id
          title
          overview
          poster_path
          popularity
          tags
      }
    }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_ALL);

  console.log(data, '<<< ini data');

  if (loading)
    return (
      
      <div className="container d-flex justify-content-center mt-4">
        <Spinner
          style={{ width: "300px", height: "300px" }}
          animation="border"
        />
        ;
      </div>
    );
  if (error) return <h1>ERROR</h1>;
  return (
    <div className="container" style={{paddingBottom: "20px", paddingLeft: "0", height: "100%", minHeight: "calc(100vh - 97px)"}}>
      <h1 className="text-center mt-4" style={{color: "white"}}>Movies List</h1>
      <div className="d-flex flex-wrap container" style={{alignContent: "space-evenly", justifyContent: "space-evenly", paddingLeft: "0"}}>
        {data.getMovies.map((movie) => (
          <ListCard key={movie._id} film={movie} type={"Movie"} action={true} />
        ))}
      </div>
      <h1 className="text-center mt-4" style={{color: "white"}}>Series List</h1>
      <div className="d-flex flex-wrap container" style={{alignContent: "space-evenly", justifyContent: "space-evenly", paddingLeft: "0"}}>
        {data.getSeries.map((series) => (
            <ListCard key={series._id} film={series} type={"Series"} action={true} />
        ))}
      </div>
    </div>
  );
}