import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [name, setName] = useState('china')
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
        return countries.map(country => <CountryItem key={country.name} country={country} />)
    } else if (countries.length === 1) {
        return <Country country={countries[0]} />
    }
    return null
}

const CountryItem = ({ country }) => {
    const [showDetail, setShowDetail] = useState(false)
    return <div>
        {country.name}
        <button onClick={() => { setShowDetail(!showDetail) }}>{showDetail ? 'hide' : 'show'}</button>
        {showDetail ? <Country country={country} /> : null}
    </div>
}

const Country = ({ country }) =>
    <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>Languages</h3>
        <ul>
            {country.languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
        </ul>
        <img width='200' src={country.flag} alt={`${country.name}'s flag`} />
    </div>

export default App