import React, { useState, useEffect } from 'react'

function Weather() {
    const [cityName, setCityName] = useState("");
    const [temp, setTemp] = useState();
    const [minTemp, setMinTemp] = useState();
    const [maxTemp, setMaxTemp] = useState();
    const [searchCity, setSearchCity] = useState("");
    let setCityNames = () => {
        setCityName(searchCity);
    }
    useEffect(() => {
        if (cityName !== "") {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=0a2955a001a3fd0bfff2b535e3ec07ba`).then((apidata) => {
                return apidata.json();

            }).then((actualdata) => {
                setCityName(cityName);
                // console.log(actualdata.main);
                // console.log(actualdata.main.temp);
                setTemp(actualdata.main.temp);
                setMinTemp(actualdata.main.temp_min);
                setMaxTemp(actualdata.main.temp_min)
            }).catch(() => {
                console.log("Error");
            });
        }
    })

    return (
        <>
            <div className="card w-50 border border-0 rounded mx-auto mt-3" id='weatherContainer'>

                <div className="d-flex justify-content-between">
                    <input type="text" className="form-control w-50 mx-auto border border-dark rounded-pill mt-5" placeholder='Enter city name' value={searchCity} onChange={(event) => setSearchCity(event.target.value)} />
                    <button type="button" className="btn text-white bg-secondary btn-sm border border-0" onClick={() => setCityNames()}>Search</button>
                </div>

                {cityName === "" ? <div className="container fs-1 fw-bolder text-center mt-5">No Data Found</div> :
                    <>
                        <div className=" d-flex mt-5 mx-auto">
                            <i className="fa fa-cloud text-light fs-1 my-auto"></i>
                            <p className='fs-1 fw-bold ms-3 my-auto' style={{ textTransform: "capitalize" }}>{cityName}</p>
                        </div>
                        <p className='fs-1 fw-bolder mx-auto mt-4'>{temp}<sup>0</sup>Cel</p>
                        <p className='mx-auto'>Min : {minTemp} | Max : {maxTemp}</p>

                    </>}
                <img src="weather.jpg" alt="" className="img-fluid"/>
            </div>
        </>
    )
}

export default Weather
