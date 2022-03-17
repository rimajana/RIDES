import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import Navbar from './Components/navbar/Navbar';

import Filterbar from './Components/filterbar/Filterbar';
import Allcards from './Components/allcards/Allcards';
const axios = require('axios');
function App() {


  const [arr, setoriginalarr] = useState([]);

  const [nearestarr, setnearest] = useState([]);
  const [upcomingarr, setupcoming] = useState([]);
  const [pastarr, setpast] = useState([]);


  const [statearr, setState] = useState([]);
  const [cityarr, setCity] = useState([]);

  const [fState, setFState] = useState("");
  const [fCity, setFCity] = useState("");
  const [map, setMap] = useState();
  const [users, setUsers] = useState({});

  //for filter operations we need dummy arr
  const [ntemp, setntemp] = useState();
  const [utemp, setutemp] = useState();
  const [ptemp, setptemp] = useState();

  //initial filter conditions
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState("nearest");
  useEffect(() => {
    console.log("user-useeffect");
    axios
      .get("https://assessment.api.vweb.app/user")
      .then(function (response) {
        setUsers(response.data);


      });

  }, [])

  const userid = users.station_code;
  console.log(users);

  // console.log(user_id);

  useEffect(() => {
    console.log("array-useeffect");
    axios
      .get("https://assessment.api.vweb.app/rides")
      .then(function (response) {

        setoriginalarr(response.data);
      });

    var sortedarr = [...arr];//saved a copy of array for future use

    // console.log("here");
    // console.log(arr)
    // console.log("here1")
    // console.log(sortedarr);
    //cdistance is dis
    // sort according to distance

    var d = 0;
    for (var i = 0; i < sortedarr.length; i++) {
      d = Math.abs(sortedarr[i].destination_station_code - userid);
      for (var j = 0; j < sortedarr[i].station_path.length; j++) {
        if (Math.abs(sortedarr[i].station_path[j] - userid) < d) {
          d = Math.abs(sortedarr[i].station_path[j] - userid);
        }
      }
      //d is minimum dist from our station to station path
      sortedarr[i].distance = d;
    }


    //sorting by distance
    for (var i = 0; i < sortedarr.length; i++) {
      for (var j = 0; j < sortedarr.length; j++) {
        if (sortedarr[i].distance < sortedarr[j].distance) {
          var temp2 = sortedarr[i];
          sortedarr[i] = sortedarr[j];
          sortedarr[j] = temp2;
        }
      }
    }

    setnearest(sortedarr);
    const upcomingrides = sortedarr.filter((obj) => {
      return new Date(obj.date) - new Date() > 0;
    });

    const pastrides = sortedarr.filter((obj) => {
      return new Date(obj.date) - new Date() < 0;
    });

    setupcoming(upcomingrides);
    setpast(pastrides);

    setutemp(upcomingrides);
    setptemp(pastrides);
    setntemp(nearestarr);
    console.log("h");
    console.log(nearestarr);
    console.log(pastarr);
    console.log(upcomingarr);
    console.log("i");
    //states and cities arr
    const states = arr.map((item) => {
      return item.state;
    });

    const cities = arr.map((item) => {
      return item.city;
    });
    const statesUnique = [...new Set(states)];
    const citiesUnique = [...new Set(cities)];

    //   //creating an object to map state to city
    const stateMap = {};
    statesUnique.map((item) => {
      stateMap[item] = [];
    });
    for (var i = 0; i < arr.length; i++) {
      stateMap[arr[i].state].push(arr[i].city);
    }
    for (var i = 0; i < Object.keys(stateMap).length; i++) {
      stateMap[Object.keys(stateMap)[i]] = [
        ...new Set(stateMap[Object.keys(stateMap)[i]]),
      ];
    }
    stateMap["all"] = citiesUnique;
    setMap(stateMap);

    setState(statesUnique);
    setCity(citiesUnique);


  }, []);

  useEffect(() => {
    //handling change in state filter
    console.log("user-state-ueff");
    var select = document.getElementById("citySelect");
    if (select !== null && select !== undefined) {
      select.value = "all";
    }

    if (fState !== "") {
      setCity(map[fState]);

      setnearest(ntemp.filter((item) => item.state == fState));
      setupcoming(utemp.filter((item) => item.state == fState));
      setpast(ptemp.filter((item) => item.state == fState));
    }

    if (fState === "all") {
      setCity(map[fState]);
      setnearest(ntemp);
      setupcoming(utemp);
      setpast(ptemp);
    }
  }, [fState, setFState]);

  useEffect(() => {
    //handling change in city filter
    console.log("user-city-ueff");

    if (fCity !== "") {
      setnearest(ntemp.filter((item) => item.city == fCity));
      setupcoming(utemp.filter((item) => item.city == fCity));
      setpast(ptemp.filter((item) => item.city == fCity));
    }

    if (fCity === "all") {
      if (fState !== "") {
        setnearest(ntemp.filter((item) => item.state == fState));
        setupcoming(utemp.filter((item) => item.state == fState));
        setpast(ptemp.filter((item) => item.state == fState));
      }
    }
  }, [fCity, setFCity]);


  return (
    <div className="App">

      <Navbar users={users} />

      <Filterbar
        filter={filter}
        setFilter={setFilter}
        show={show}
        setShow={setShow}
        upcomingarr={upcomingarr}
        pastarr={pastarr}
        nearestarr={nearestarr}
        states={fState}
        cities={fCity}
        setFState={setFState}
        setFCity={setFCity}
      />

      <Allcards
        nearestarr={nearestarr}
        pastarr={pastarr}
        upcomingarr={upcomingarr}
        ftype={filter}



      />
    </div>
  );
}

export default App;
