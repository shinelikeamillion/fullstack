import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [name, setName] = useState('australia')
    const [countries, setCountries] = useState([])

    // useEffect function must return a cleanup function or nothing
    const hook = () => {
        if (!name) return
        (async () => {
            await axios
                .get(`https://restcountries.eu/rest/v2/name/${name}`)
                .then(response => {
                    if (response.status === 200) handleResult(response.data)
                })
                .catch((err) => console.log(err))
        })()
    }

    function handleResult(data) {
        if (data.length < 1) {
            setCountries([])
        } else if (data.length < 10) {
            setCountries(data)
        } else {
            setCountries(Array(11))
        }
    }

    useEffect(hook, [name]);

    return (
        <div>
            <div>find countries<input value={name} onChange={(event) => setName(event.target.value)} /></div>
            <Countries countries={countries} />
        </div>
    )
}

const Countries = ({ countries }) => {
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (countries.length > 1) {
        return countries.map(country => <p key={country}>{country}</p>)
    } else if (countries.length === 1) {
        let country = countries[0]
        return <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
            </ul>
            <img width='200' src={country.flag} />
        </div>
    }
    return <></>
}

export default App