import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Spinner } from "react-bootstrap";
import ListCard from "../components/Card";

const GET_SERIES = gql`
    query get{
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

export default function Series() {
  const { data, loading, error } = useQuery(GET_SERIES);

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
    <div>
      <h1 className="text-center mt-4">Series List</h1>
      <div className="d-flex flex-wrap container">
        {data.getSeries.map((series) => (
          <ListCard key={series._id} film={series} type={"tv-series"} action={true} />
        ))}
      </div>
    </div>
  );
}