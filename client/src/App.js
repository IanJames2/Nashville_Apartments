import React, {useState} from 'react'
import {Router} from '@reach/router'
import ApartmentForm from './views/ApartmentForm'
import DetailsApartment from './components/DetailsApartment'
import UpdateApartment from './components/UpdateApartment'
import Reg from './components/Reg'
import Login from './components/Login'
import Main from './components/Main'


function App() {
  const [logged, setLogged] = useState(null);
  return (
    <div className="App">

      <Router>
        <Reg path = "/"
        setLogged = {setLogged}
        ></Reg>
        <Login path = "/login"></Login>
        <Main path = "/home"
        logged = {logged}
        ></Main>
        <ApartmentForm path = "/apartments/:Apartmentid/add"></ApartmentForm>
        <DetailsApartment path = "/apartments/:Apartmentid"></DetailsApartment>
        <UpdateApartment path = "/apartments/:Apartmentid/edit"></UpdateApartment>
      </Router>
      
    </div>
  );
}

export default App;
