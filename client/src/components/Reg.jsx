import React, {useState} from 'react';
import Input from '../views/Input'
import axios from 'axios';
import {Link, navigate} from '@reach/router';

const Reg = (props) => {
    
    const {setLogged} = props
        
    const form = {
        firstName: "",
        lastName: "",
        ageCount: "",
        emailAddress: "",
        password: ""
    }    

    const handleinputChange = (e) =>{
        console.log(e.target.name)
        console.log(e.target.value)
        setReg({
            ...Reg,
            [e.target.name]: e.target.value
        })
    }

    const [Reg, setReg] = useState(form)
    const [errors, setErrors] = useState(form)

    const submitHandler = (e) =>{
        console.log("submit button was click")
        e.preventDefault()
        console.log("***********Value used to submit to db*************", Reg)
        axios.post("http://localhost:8000/api/register", Reg, {withCredentials:true})
        .then(response => {
            console.log("*****************")
            console.log(response)
            console.log("*****************")
            if(response.data.errors){
                console.log("***************ERRORS_TRY_AGAIN**************")
                setErrors(response.data.errors)
            } else {
                setLogged(response.data.user);
                navigate("/home")
            }
        })
        .catch(err => console.log("ERROR TRY AGAIN", err))
}



    return (
        <form className = "col-5 mx-auto" onSubmit = {submitHandler}>
            <h2>Register</h2>
            <Input
                name = "firstName"
                value = {Reg.firstName}
                error = {errors.firstName}
                handleChange = {handleinputChange}
                label = "First Name:"
                type = "text"
            />
            <Input
                name = "lastName"
                value = {Reg.lastName}
                error = {errors.lastName}
                handleChange = {handleinputChange}
                label = "Last Name:"
                type = "text"
            />
            <Input
                name = "suffix"
                value = {Reg.suffix}
                error = {errors.suffix}
                handleChange = {handleinputChange}
                label = "Suffix (if any):"
                type = "text"
            />
            <Input
                name = "ageCount"
                value = {Reg.ageCount}
                error = {errors.ageCount}
                handleChange = {handleinputChange}
                label = "Age:"
                type = "number"
            />
            <Input
                name = "emailAddress"
                value = {Reg.emailAddress}
                error = {errors.emailAddress}
                handleChange = {handleinputChange}
                label = "Email Address:"
                type = "email"
            />
            <Input
                name = "password"
                value = {Reg.password}
                error = {errors.password}
                handleChange = {handleinputChange}
                label = "Password:"
                type = "password"
            />
            <Input
                name = "confirmPassword"
                value = {Reg.confirmPassword}
                error = {errors.confirmPassword}
                handleChange = {handleinputChange}
                label = "Confirm Password:"
                type = "password"
            /> 
            <Input
                submitHandler = "Register"
                type = "submit"
            />
            <br/>
            <Link to="/login">Already have an account? Click here to login!</Link>
        </form>
        
    );
};


export default Reg;