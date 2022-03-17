import React from 'react'
// import {dateFormat} from
import "./Card.css";

function Card(props) {
    console.log("yo");
    console.log(props);
  return (

    <div className="card" key={props.keyy}>
      <img src={props.rides.map_url} alt="xyz"/>
      <div className="data">
      <div className='row'>
      Ride Id:&nbsp; {props.rides.id}
      </div>

      <div className="row">
      Origin Station:&nbsp; {props.rides.origin_station_code}
      </div>
      <div className="row">
      station_path :&nbsp;
            {props.path}
      </div>
      <div className="row">
      Date:&nbsp; 
      {/* {dateFormat(props.rides.date)} */}
      
      {props.rides.date}
      </div>
      
       <div className="row">
      Distance:&nbsp; {props.rides.distance}
      </div>     
      </div>
      <div className="geo">
      <span className="sname">{props.rides.state}</span>
      <span className="cname">{props.rides.city}</span>
      </div>
      </div>
    

  )
}

export default Card