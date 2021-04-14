import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Spinner } from "react-bootstrap";
import ListCard from "../components/Card";

const GET_ALL = gql`
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
    <div className="container" style={{paddingBottom: "20px"}}>
      <h1 className="text-left mt-4" style={{color: "white"}}>Movies List</h1>
      <div className="container">
        <div className="row">
          {data.getMovies.map((movie) => (
            <div className="col-4">
              <ListCard key={movie._id} film={movie} type={"Movie"} action={true} />
            </div>
          ))}
        </div>
      </div>
      <h1 className="text-left mt-4" style={{color: "white"}}>Series List</h1>
      <div className="container">
        <div className="row">
          {data.getSeries.map((series) => (
            <div className="col-4">
              <ListCard key={series._id} film={series} type={"Series"} action={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}