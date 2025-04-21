import React from "react";
import './App.css';
import PropTypes from "prop-types";
import humidityIcon from './assets/humidity.png';
import windIcon from './assets/wind.png';

const Weatherdetails = ({ icon, temp, city, country, lat, lon, humidity, wind }) => {
    return (
        <>
            <div className="image">
                <img src={icon} alt="Weather Icon" style={{ height: "160px", width: "160px" }} />
            </div>
            <div className="temp">{temp}°C</div>
            <div className="location">{city}</div>
            <div className="country">{country}</div>
            <div className="cord">
                <div>
                    <span className="lat">Latitude: </span>
                    <span>{lat}</span>
                </div>
                <div>
                    <span className="lon">Longitude: </span>
                    <span>{lon}</span>
                </div>
            </div>
            <div className="data-container">
                <div className="element">
                    <img
                        src={humidityIcon}
                        alt="Humidity"
                        className="icon"
                        style={{ height: "50px", width: "50px" }}
                    />
                    <div className="data">
                        <div className="humidity-percentage">{humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img
                        src={windIcon}
                        alt="Wind"
                        className="icon"
                        style={{ height: "50px", width: "50px" }}
                    />
                    <div className="data">
                        <div className="wind-percentage">{wind} km/hr</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </>
    );
};

Weatherdetails.propTypes = {
    icon: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired,
    wind: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
};

export default Weatherdetails;
