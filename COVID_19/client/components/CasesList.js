import React, { useEffect, useState } from 'react'
import casesService from '../services/cases'

const CasesList = () => {
  const [cases, setCases] = useState([])
  useEffect(() => {
    casesService.getAll().then((cases) => {
      console.log(Object.values(cases)[0])
      setCases(cases)
    })
  }, [])

  return cases
   && (
   <div className="ui container">
     {Object.values(cases).map((value) => (
       <div key={value.province}>
         <p>{value.province}</p>
         <p>{value.province_infected}</p>
         <p>{value.province_recovered}</p>
         <p>{value.province_deaths}</p>
         <p>{value.date}</p>
       </div>
     ))}
   </div>
   )
}

export default CasesList
