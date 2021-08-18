import React, {useEffect, useState} from 'react';
import {Link} from '@reach/router';
import axios from 'axios';

const DetailsApartment = (props) => {
    console.log("*************************", props.Apartmentid)

    const [ApartmentInfo, setApartmentInfo] = useState({})

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/apartment/${props.Apartmentid}`)
        .then(response => {
        console.log("************")
        console.log(response)
        console.log("************")
        setApartmentInfo(response.data.results)
        })
        .catch(err=> console.log(err))
    }, [])

    return (
        <div>
            {ApartmentInfo==null?<Link to = {`/home`}>Apartment Information is undefined! Click this link to go back to homepage!</Link>
:
            <>
                <button><Link to = {`/home`}>Back To Home Page</Link></button>
                <h1>Apartment Name: {ApartmentInfo.Apartment_Name}</h1>
                <img src={ApartmentInfo.Picture} alt=""/>
                <h4>Address:</h4> {ApartmentInfo.Address}
                <h4>Rent: $</h4>{ApartmentInfo.Rent}
                <h4>Amenities: </h4>{ApartmentInfo.Amenities}
                <h4>Description: </h4>
                <p>{ApartmentInfo.Description}</p>
                <a href={ApartmentInfo.URL}>Official Apartment Website</a>
                
            </>
            }
        </div>
    );
};


export default DetailsApartment;