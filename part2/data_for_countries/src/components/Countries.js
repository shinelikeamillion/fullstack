import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryWeather = ({ weather }) => weather
    ?
    <>
        <h3>Weather in {weather.country}</h3>
        <div>temperature: {weather.temp} Celsius</div>
        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />
        <div>wind: {weather.wind.speed} mps direction {weather.wind.deg} deg</div>
    </>
    :
    null

const Countries = ({ countries }) => {

    if (!process.env.REACT_APP_URL || !process.env.REACT_APP_ID) {
        console.error(
            ```
            Note that you need to apply your own app_id from https://openweathermap.org
            or you can use the official Examples API below for a glance
            api.openweathermap.org/data/2.5/weather?q=London,uk
            ```
        )
    }

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (countries.length > 1) {
        return countries.map(country => <CountryItem key={country.name} country={country} />)
    } else if (countries.length === 1) {
        return <Country country={countries[0]} />
    }
    return <div>no matches</div>
}

const CountryItem = ({ country }) => {
    const [showDetail, setShowDetail] = useState(false)
    return <div>
        {country.name}
        <button onClick={() => { setShowDetail(!showDetail) }}>{showDetail ? 'hide' : 'show'}</button>
        {showDetail ? <Country country={country} /> : null}
    </div>
}

const Country = ({ country }) => {
    const [weather, setWeather] = useState()

    const getWeather = () =>
        axios.get(`${process.env.REACT_APP_URL}?q=${country.name}&units=metric&appid=${process.env.REACT_APP_ID}`)
            .then(response => {
                if (response.status === 200) {
                    let data = response.data
                    setWeather(
                        {
                            country: country.name,
                            temp: data.main.temp,
                            wind: data.wind,
                            icon: data.weather[0].icon,
                            description: data.weather[0].description
                        }
                    )
                }
            })

    useEffect(() => { getWeather() }, [])

    return <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>Languages</h3>
        <ul>
            {country.languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
        </ul>
        <img width='200' src={country.flag} alt={`${country.name}'s flag`} />
        <CountryWeather weather={weather} />
    </div>
}

export default Countries
