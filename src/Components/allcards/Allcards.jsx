import React from 'react'

import Card from '../card/Card'

function Allcards(props) {
    console.log(props);
  return (
    <div className="content-box">
    {/* conditonal statements */}
    {props.ftype === "nearest" ? (
        <>
          {props.nearestarr &&
            props.nearestarr.map((item,index) => (
                
              <Card
                keyy={index}
                rides={item}
                path={JSON.stringify(item.station_path)}
                

              />
            ))}
        </>
      ) : props.ftype === "upcoming" ? (
        <>
          {props.upcomingarr &&
            props.upcomingarr.map((item) => (
              <Card
              rides={item}
              path={JSON.stringify(item.station_path)}/>
            ))}
        </>
      ) : props.ftype === "past" ? (
        <>
          {props.pastarr &&
            props.pastarr.map((item) => (
                <Card
                rides={item}
                path={JSON.stringify(item.station_path)}
                />
            ))}
        </>
      ) : (
        <></>
      )
      }
    </div>
  )
}

export default Allcards