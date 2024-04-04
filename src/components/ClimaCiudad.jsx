import { useEffect, useState } from 'react';
import '../styles.css';
import Icons from './Icons';

function ClimaCiudad() {
    const [search, setSearch] = useState('roma')
    const [values, setValues] = useState('')
    const [icon, setIcon] = useState('')
  
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=es&units=metric&appid=${process.env.REACT_APP_API_KEY}`
  
    const getData = async () => {
      await fetch(URL)
        .then(response => {return response.json()})
        .then( data => {
          if(data.cod >= 400) {
            setValues(false)
          }else{         
            setIcon(data.weather[0].main)
            setValues(data)
          }        
        })
        .catch(error => {
          console.log(error)
        })
    }

    let mensaje = '';
        if (values) {
       const temperatura = values.main.temp;
        if (temperatura > 30) {
          mensaje = 'Hace mucho calor';
        } else if (temperatura < 10) {
          mensaje = 'Hace mucho frío';
        }
    }
  
    const handleSearch = (e) => {
      if(e.key === 'Enter'){      
        setSearch(e.target.value)
      }
    }
    useEffect(()=>{
      getData()
    },[search]) // eslint-disable-line react-hooks/exhaustive-deps
  
    return (
      <>
      <div className="container">
        <h2>Clima en la ciudad de:</h2>
        <div className='row'>
          <input 
            onKeyDown={handleSearch}
            type="text"          
            autoFocus
          />
        </div>
      </div>
  
      <div className='card'>
        {(values) ? (
          <div className='card-container'>
            <h1 className='city-name'>{values.name}</h1>
            <p className='temp'>{values.main.temp.toFixed(0)}&deg;</p>
            <img className='icon' src={Icons(icon)} alt="icon-weather" />
            <div className='card-footer'>
            <p className='temp-max-min'>
              Temperatura mínima: {values.main.temp_min.toFixed(0)}&deg;C  |  
              Temperatura máxima: {values.main.temp_max.toFixed(0)}&deg;C
            </p>
            {mensaje && <p>{mensaje}</p>}
            </div>
          </div>
        ) : (
          <h1>{"City not found"}</h1>
        )}
  
      </div>
  
      </>  
    );
  }

export default ClimaCiudad;

