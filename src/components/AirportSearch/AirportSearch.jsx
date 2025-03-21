import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAirports } from '../../redux/airports/airports.reducer'; // Вказати правильний шлях
import debounce from 'lodash.debounce'; // Імпортуємо debounce з lodash
import css from './AirportSearch.module.css'; // Імпортуємо файл CSS

const AirportSearch = ({ onSelectAirport }) => {
  const dispatch = useDispatch();
  const {
    airports = [],
    loading,
    error,
  } = useSelector(state => state.airports || {});

  const [searchTerm, setSearchTerm] = useState(''); // Локальний стан для введеного терміну
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched && airports.length === 0) {
      dispatch(fetchAirports());
      setHasFetched(true); // Завантажуємо аеропорти лише один раз
    }
    console.log('airports при вході в компонент:', airports);
  }, [dispatch, airports.length, airports, hasFetched]);

  // Створюємо debouncedSearchTerm, щоб обробляти введення з затримкою
  const debouncedSearchTerm = useMemo(() => {
    return debounce(term => term, 500); // 500 мс - це час затримки
  }, []);

  // Оновлюємо searchTerm зі затримкою

  const handleChange = e => {
    const value = e.target.value;
    setSearchTerm(value); // Оновлюємо значення при кожному введенні
    debouncedSearchTerm(value); // Викликаємо debounce
  };

  // Фільтрація аеропортів за дебаунс-терміном
  const filteredAirports = useMemo(() => {
    if (debouncedSearchTerm === '') {
      console.log('TCL: filteredAirports -> []', []); // Лог для порожнього введення
      return []; // Якщо нічого не введено — повертаємо порожній масив
    } else {
      const filtered = airports.filter(airport =>
        airport.name.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase())
      );
      console.log('TCL: filteredAirports ->', filtered); // Лог для відфільтрованих аеропортів
      return filtered;
    }
  }, [debouncedSearchTerm, airports]);

  const handleSelectCity = city => {
    setSearchTerm(city); // Встановлюємо вибране місто в searchTerm
    onSelectAirport(city); // Викликаємо функцію onSelectAirport
  };

  return (
    <div className={css.searchContainer}>
      <form>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Enter Airport"
          className={css.inputFind} // Клас для інпуту
        />
        <button className={css.inputButton} type="submit">
          <span className={css.buttonLabel}></span>
          &#128269;
        </button>
      </form>

      {loading && <div>Завантаження...</div>}
      {error && <div>Помилка: {error}</div>}

      {filteredAirports.length > 0 && (
        <ul className={css.suggestionsList}>
          {' '}
          {/* Клас для відображення списку пропозицій */}
          {filteredAirports.map(airport => (
            <li
              key={airport.iataCode}
              onClick={() => handleSelectCity(airport.cityCode)}
              className={css.suggestionItem}
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
