import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Spinner } from "react-bootstrap";
import ListCard from "../components/Card";

const GET_MOVIES = gql`
    query get{
        getMovies {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`;

function Home() {
  const { data } = useQuery(GET_MOVIES);

  console.log(data, '<<< ini data');

//   if (loading)
//     return (
//       <div className="container d-flex justify-content-center mt-4">
//         <Spinner
//           style={{ width: "300px", height: "300px" }}
//           animation="border"
//         />
//         ;
//       </div>
//     );
//   if (error) return <h1>ERROR</h1>;
  return (
    <>
      <h1 className="text-center mt-4">Movies List</h1>
      {/* <div className="d-flex flex-wrap container">
        {data.getMovies.map((movie) => (
          <ListCard key={movie._id} film={movie} type={"Movie"} action={true} />
        ))}
      </div> */}
    </>
  );
}

export default Home;