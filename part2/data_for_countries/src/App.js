import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
    const [name, setName] = useState('china')
    const [countries, setCountries] = useState([])

    // useEffect function must return a cleanup function or nothing
    const hook = async () => {
        if (!name) return
        await axios
            .get(`https://restcountries.eu/rest/v2/name/${name}`)
            .then(response => {
                if (response.status === 200) handleResult(response.data)
            })
            .catch((err) => console.log(err))
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

    useEffect(() => { hook() }, [name]);

    return (
        <div>
            <div>find countries<input value={name} onChange={(event) => setName(event.target.value)} /></div>
            <Countries countries={countries} />
        </div>
    )
}

export default App