import React, {useState} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router'

const ApartmentForm = () => {
    const [ApartmentForm, setApartmentForm] = useState({
        Apartment_Name: "",
        Picture: "",
        Address: "",
        Rent: "",
        Amenities: "",
        Description: "",
        URL: ""
    })

    const [errors, setErrors] = useState({})

    const changeHandler = (e)=>{
        console.log("*********Value of text*********")
        console.log(e.target.name)
        setApartmentForm({
            ...ApartmentForm,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        console.log("***********Value used to submit to db*************", ApartmentForm)
        axios.post("http://localhost:8000/api/apartment/create", ApartmentForm)
            .then(response => {
                console.log("*****************")
                console.log(response)
                console.log("*****************")
                if(response.data.errors){
                    console.log("***************ERRORS_TRY_AGAIN**************")
                    setErrors(response.data.errors)
                } else {
                    navigate("/home")
                }
            })
            .catch(err => console.log("ERROR TRY AGAIN", err))
        
    }


    return (
        <div>
        <img src="https://www.shutterbug.com/images/photo_post/105024/IMG_1016s.jpg" alt=""/>   
        <button><Link to = "/home">Click here to go back to home page</Link></button> 
        <h1>Enter Information From New Apartment In The Form Below</h1>

            
            <form onSubmit={submitHandler}>
                <p>
                    <label htmlFor="">Apartment Name: </label>
                    <input type ="text" name="Apartment_Name" id="" onChange={changeHandler} />
                    <p>{errors.Apartment_Name? errors.Apartment_Name.message: ""}</p>
                </p>
                <p>
                    <label htmlFor="">Picture: </label>
                    <input type ="text" name="Picture" id="" onChange={changeHandler} />
                    <p>{errors.Picture? errors.Picture.message: ""}</p>
                </p>
                <p>
                    <label htmlFor="">Address: </label>
                    <input type ="text" name="Address" id="" onChange={changeHandler} />
                    <p>{errors.Address? errors.Address.message: ""}</p>
                </p>
                <p>
                    <label htmlFor="">Rent: $</label>
                    <input type ="number" name="Rent" id="" onChange={changeHandler} />
                    <p>{errors.Rent? errors.Rent.message: ""}</p>
                </p>
                <p>
                    Amenities: <textarea name="Amenities" id="" cols="30" rows="5" onChange={changeHandler}></textarea>
                    <p>{errors.Amenities? errors.Amenities.message: ""}</p>
                </p>
                <p>
                    Description: <textarea name="Description" id="" cols="30" rows="5" onChange={changeHandler}></textarea>
                    <p>{errors.Description? errors.Description.message: ""}</p>
                </p>
                <p>
                    <label htmlFor="">URL Link: </label>
                    <input type ="text" name="URL" id="" onChange={changeHandler} />
                    <p>{errors.URL? errors.URL.message: ""}</p>
                </p>
                <input type="submit" value="Add Apartment"/>
            </form>


        </div>
    );
};


export default ApartmentForm;