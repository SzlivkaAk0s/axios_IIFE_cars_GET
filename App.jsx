
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const AutoKomponens = ({ elem }) => {
  return (
    <div className="container">
      <div className="row m-3 p-3 border">
        <img src={elem.car_picture} alt="" width="150" />
        <h3>{elem.car_name}</h3>
        Szín: {elem.car_color}
        <br />
        ID: {elem.id}
      </div>
    </div>
  );
};

export const App = () => {
  const [autok, setAutok] = useState([]);
  const [auto, setAuto] = useState(null);
  const [hiba, setHiba] = useState('');
  const [id] = useState(39);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          'https://cars.sulla.hu/cars'
        );
        setAutok(response.data);
      } catch (error) {
        setHiba(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://cars.sulla.hu/cars/${id}`
        );
        setAuto(response.data);
      } catch (error) {
        setHiba(error.message);
      }
    })();
  }, [id]);

  return (
    <div className="container">
      <h1>Autók</h1>

      {hiba && <p>Hiba: {hiba}</p>}

      <h2>GET - Összes autó</h2>

      {autok.map((elem) => (
        <AutoKomponens key={elem.id} elem={elem} />
      ))}

      <hr />

      <h2>GET BY ID - Egy autó</h2>

      {auto && <AutoKomponens elem={auto} />}
    </div>
  );
};


