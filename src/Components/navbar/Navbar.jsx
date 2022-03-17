import ReactDOM from "react-dom";

import "./Navbar.css";
import { useState, useEffect } from "react";

export default function Navbar(props) {
  

  return (
    <div className="navbar_top">
      <span className="company">Edvora</span>
      
      <div className="details">
        {props.users.name}
        
        
      </div>
      <img className="navbar-img" src={props.users.url}/>
    
      
    </div>
  );
}
// export default Navbar;
