import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";
//! Cookies is not showing up on the front end and the backend.
//! Can not render First and Last name to component without mapping? How can I render without mapping through all the users?
const AllApartments = (props) => {
  const [AllApartments, setAllApartments] = useState([]);
  const [deleteClicked, setDeleteClicked] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/apartment/all")
      .then((AllApartments) => {
        console.log("****************");
        console.log(AllApartments);
        console.log("****************");
        setAllApartments(AllApartments.data.results);
      })
      .catch();
  }, []);

  const deleteOneApartment = (e, apartmentID) => {
    console.log("************DELETED_APARTMENT*************");
    axios
      .delete(`http://localhost:8000/api/apartment/delete/${apartmentID}`)
      .then((response) => {
        console.log("deleted!");
        console.log(response);
        console.log("deleted!");
        navigate("/home");
        setDeleteClicked(!deleteClicked);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Check These Apartments Out</h2>
      {AllApartments.map((apartmentobj, idx) => {
        return (
          <div key={idx} style={{ border: "1px solid black" }}>
            <h1>{apartmentobj.Apartment_Name}</h1>
            <button>
              <Link to={`/apartments/${apartmentobj._id}`}>
                Click here for more info
              </Link>
            </button>
            <button>
              <Link to={`/apartments/${apartmentobj._id}/edit`}>
                Click here to update apartment data
              </Link>
            </button>
            <button onClick={(e) => deleteOneApartment(e, apartmentobj._id)}>
              Delete Apartment
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AllApartments;
