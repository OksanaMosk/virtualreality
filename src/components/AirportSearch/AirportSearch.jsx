import css from './AirportSearch.module.css';
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAirports } from '../../redux/airoports/airoports.reducer'; // Вказати правильний шлях

const AirportSearch = ({ onSelectAirport }) => {
  const dispatch = useDispatch();
  const {
    airports = [],
    loading,
    error,
  } = useSelector(state => state.airports || {});

  const [searchTerm, setSearchTerm] = useState('');

  const [hasFetched, setHasFetched] = useState(false); // Додаємо стан для перевірки, чи вже завантажені аеропорти

  // Завантаження аеропортів тільки один раз при першому рендері
  useEffect(() => {
    if (!hasFetched && airports.length === 0) {
      dispatch(fetchAirports());
      setHasFetched(true); // Після запиту встановлюємо hasFetched в true
    }
  }, [dispatch, airports.length, hasFetched]); // Залежить від airports.length та hasFetched

  // Фільтрація аеропортів за введеним терміном з useMemo
  const filteredAirports = useMemo(() => {
    if (searchTerm === '') {
      return []; // Якщо нічого не введено — повертаємо порожній масив
    } else {
      return airports.filter(airport =>
        airport.cityCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }, [searchTerm, airports]); // Залежить від searchTerm та airports

  const handleChange = e => {
    setSearchTerm(e.target.value); // Оновлюємо значення введеного міста
  };

  const handleSelectCity = city => {
    setSearchTerm(city); // Встановлюємо вибране місто як searchTerm
    onSelectAirport(city); // Викликаємо передану функцію для встановлення вибраного аеропорту
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Enter Airport"
          className={css.inputFind}
        />
        <button className={css.inputButton} type="submit">
          <span className={css.buttonLabel}></span>
          &#128269;
        </button>
      </form>

      {loading && <div>Завантаження...</div>}
      {error && <div>Помилка: {error}</div>}

      {filteredAirports.length > 0 && (
        <ul>
          {filteredAirports.map(airport => (
            <li
              key={airport.iataCode}
              onClick={() => handleSelectCity(airport.cityCode)}
            >
              {airport.cityCode} - {airport.name}
            </li>
          ))}
        </ul>
      )}

      <div>{searchTerm && <h3>Вибрано місто: {searchTerm}</h3>}</div>
    </div>
  );
};

export default AirportSearch;
