import React from 'react';
import { useState, useEffect } from "react";
import "./Filterbar.css";
import { BsFilterLeft } from "react-icons/bs";
function Filterbar(props) {
    
  return (
    <div className='filter-bar'>
    
    <div 
        className='Nrides' 
        id={props.filter === "nearest" ? "selected" : ""}
        onClick={() => props.setFilter("nearest")}
    >
        Nearest Rides
    </div>
    <div 
        className='Urides' 
        id={props.filter === "upcoming" ? "selected" : ""}
        onClick={() => props.setFilter("upcoming")}
    >
        Upcoming Rides ( {props.upcomingarr ? props.upcomingarr.length : ""} )
    
    </div>
    
    <div 
        className='Prides'
        id={props.filter === "past" ? "selected" : ""}
        onClick={() => props.setFilter("past")}
    >
        Past Rides ({props.pastarr ? props.pastarr.length : ""} )
    </div>
    
    <button className="fbtn" onClick={() => props.setShow(!props.show)}>
        < BsFilterLeft/> Filters
      </button>
      {props.show && (
        <div className="filter-box">
          <div className="filters-h">Filters</div>
          <select onChange={(e) => props.setFState(e.target.value)}>
            <option value={"all"}>State</option>
            {props.states.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          </div>

          
        //   <select
        //     id="citySelect"
        //     onChange={(e) => props.setFCity(e.target.value)}
        //   >
        //     <option value={"all"}>City</option>
        //     {props.cities.map((item) => (
        //       <option value={item}>{item}</option>
        //     ))}
        //   </select>
        // </div>
      )}


    </div>
  )
}

export default Filterbar