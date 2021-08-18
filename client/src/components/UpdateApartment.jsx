import React, {useState, useEffect} from 'react';
import {Link, navigate} from '@reach/router';
import axios from 'axios'

const UpdateApartment = (props) => {
    const [ApartmentInfo, setApartmentInfo] = useState({
        Apartment_Name: "",
        Picture: "",
        Address: "",
        Rent: "",
        Amenities: "",
        Description: "",
        URL: ""
    })

    const [errors, setErrors] = useState({})

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/apartment/${props.Apartmentid}`)
            .then(response=>{
                console.log("*********")
                console.log(response)
                console.log("*********")
                setApartmentInfo(response.data.results)

            })
            .catch(err=> console.log(err))
    },

    [props.Apartmentid]) //new change 25MAR21 not needed for function to run. Not necessary

    const changeHandler = (e)=>{
        console.log("********inputCHANGINGnow********")
        console.log(e.target.name)
        setApartmentInfo({
            ...ApartmentInfo,
            [e.target.name]: e.target.value

        })
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        console.log("**************SUBMITnewDATAtoDATABASE************", ApartmentInfo)
        axios.put(`http://localhost:8000/api/apartment/update/${props.Apartmentid}`, ApartmentInfo)
            .then(response =>{
                console.log("*******JUST UPDATED!******")
                console.log(response)
                console.log("*********JUST UPDATED!*********")
                if(response.data.errors){
                    console.log("***************ERRORS_TRY_AGAIN**************")
                    setErrors(response.data.errors)
                } else {
                    console.log("SUCCESSFUL")
                    navigate("/home")
                }
            })
            .catch(err => console.log("ERROR TRY AGAIN", err))
    }


    return (
        <div>
                <img src={ApartmentInfo.Picture} alt=""/>
                <p></p>
                <button><Link to = {`/home`}>Back To Home Page</Link></button>
                <h2>Edit Apartment Info</h2>


            <form onSubmit={submitHandler}>
                <p>
                    <label htmlFor="">Apartment Name: </label>
                    <input type ="text" name="Apartment_Name" id="" onChange={changeHandler} defaultValue={ApartmentInfo.Apartment_Name}/>
                    <p>{errors.Apartment_Name? errors.Apartment_Name.message: ""}</p>
                </p>
                <p>
                    <label htmlFor="">Picture: </label>
                    <input type ="text" name="Picture" id="" onChange={changeHandler} defaultValue={ApartmentInfo.Picture}/>
                    <p>{errors.Picture? errors.Picture.message: ""}</p>
                </p>
                <p>
                    <label htmlFor="">Address: </label>
                    <input type ="text" name="Address" id="" onChange={changeHandler} defaultValue={ApartmentInfo.Address}/>
                    <p>{errors.Address? errors.Address.message: ""}</p>
                </p>
                <p>
                    <label htmlFor="">Rent: $</label>
                    <input type ="number" name="Rent" id="" onChange={changeHandler} defaultValue={ApartmentInfo.Rent}/>
                    <p>{errors.Rent? errors.Rent.message: ""}</p>
                </p>
                <p>
                    Amenities: <textarea name="Amenities" id="" cols="30" rows="5" onChange={changeHandler} defaultValue={ApartmentInfo.Amenities}></textarea>
                    <p>{errors.Amenities? errors.Amenities.message: ""}</p>
                </p>
                <p>
                    Description: <textarea name="Description" id="" cols="30" rows="5" onChange={changeHandler} defaultValue={ApartmentInfo.Description}></textarea>
                    <p>{errors.Description? errors.Description.message: ""}</p>
                </p>
                <p>
                    <label htmlFor="">URL Link: </label>
                    <input type ="text" name="URL" id="" onChange={changeHandler} defaultValue={ApartmentInfo.URL}/>
                    <p>{errors.URL? errors.URL.message: ""}</p>
                </p>
                <input type="submit" value="Finished Editing? Click Here To Save Your Changes!"/>
            </form>

        </div>
    );
};


export default UpdateApartment;