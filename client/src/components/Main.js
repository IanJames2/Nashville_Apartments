import React from 'react';
import AllApartments from '../views/AllApartments';
import {Link} from '@reach/router';





function Main() {
    return (
      <div className="Main">

        <button><Link to = "/apartments/:Apartmentid/add">Click here to add to apartment list</Link></button> 
        <h1>Here Are My List Of Apartments</h1>
        <img src="http://blog.prolines.sa/wp-content/uploads/2015/06/Apartments-Logo-1.jpg" alt=""/>
  
     <AllApartments></AllApartments>

      </div>
    );
  }
  

export default Main;
