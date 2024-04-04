import { useEffect, useState } from 'react';
import '../styles.css';
import Icons from './Icons';

function ClimaCiudad() {
    const [search, setSearch] = useState('')
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
        if (temperatura >= 23) {
          mensaje = 'Hace mucho calor';
        } else if (temperatura <= 10) {
          mensaje = 'Hace mucho frío';
        }
    }
  
    const manejarBuscar = (e) => {
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
        <h2>Buscar ciudad para conocer el clima</h2>
        <div className='row'>
          <input 
            onKeyDown={manejarBuscar}
            type="text"          
            autoFocus
          />
        </div>
      </div>
  
      <div className='card'>
        {(values) ? (
          <div className='card-container'>
            <h1>{values.name}</h1>
            <p>{values.main.temp.toFixed(0)}&deg;C</p>
            <img src={Icons(icon)} alt="icon-weather" />
            <div>
            <p>
              Temperatura mínima: {values.main.temp_min.toFixed(0)}&deg;C  |  
              Temperatura máxima: {values.main.temp_max.toFixed(0)}&deg;C
            </p>
            {mensaje && <p>{mensaje}</p>}
            </div>
          </div>
        ) : (
          <p>{"City not found"}</p>
        )}
  
      </div>

  
      </>  
    );
  }

export default ClimaCiudad;
