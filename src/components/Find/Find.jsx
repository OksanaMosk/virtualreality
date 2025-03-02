import React, { useState, useEffect, useRef } from 'react';

import AirportSearch from '../AirportSearch/AirportSearch'; // Імпортуємо компонент для пошуку аеропортів
import css from './Find.module.css';

const Find = () => {
  const [originAirport, setOriginAirport] = useState('');
  const [destinationAirport, setDestinationAirport] = useState('');
  const [date, setDate] = useState('');

  // Обробка форми
  const onFormSubmit = e => {
    e.preventDefault();
    // Логіка для відправки запиту на API (якщо потрібно)
    e.target.reset();
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.target.closest('form');
      form.reset();
    }
  };

  // Функція для оновлення вибраного аеропорту
  const handleSelectOriginAirport = airport => {
    setOriginAirport(airport);
  };

  const handleSelectDestinationAirport = airport => {
    setDestinationAirport(airport);
  };

  return (
    <section className={css.section2}>
      <form className={css.formlFind} onSubmit={onFormSubmit}>
        <label className={css.labelFind}>
          Airport of Origin
          <input
            className={css.inputFind}
            type="text"
            name="searchKey"
            value={originAirport}
            onChange={e => setOriginAirport(e.target.value)}
            placeholder="Enter Origin Airport"
            onKeyDown={handleKeyDown}
          />
        </label>
        <button className={css.inputButton} type="submit">
          <span className={css.buttonLabel}></span>
          &#128269;
        </button>
      </form>

      {/* Компонент для вибору аеропорту відправлення */}
      <AirportSearch onSelectAirport={handleSelectOriginAirport} />

      <form className={css.formlFind} onSubmit={onFormSubmit}>
        <label className={css.labelFind}>
          Airport of Destination
          <input
            className={css.inputFind}
            type="text"
            name="searchKey"
            value={destinationAirport}
            onChange={e => setDestinationAirport(e.target.value)}
            placeholder="Enter Destination Airport"
            onKeyDown={handleKeyDown}
          />
        </label>
        <button className={css.inputButton} type="submit">
          <span className={css.buttonLabel}></span>
          &#128269;
        </button>
      </form>

      {/* Компонент для вибору аеропорту призначення */}
      <AirportSearch onSelectAirport={handleSelectDestinationAirport} />

      <form className={css.formlFind} onSubmit={onFormSubmit}>
        <label className={css.labelFind}>
          Date
          <input
            className={css.inputFind}
            type="text"
            name="searchKey"
            value={date}
            onChange={e => setDate(e.target.value)}
            placeholder="Enter Date"
            onKeyDown={handleKeyDown}
          />
        </label>
        <button className={css.inputButton} type="submit">
          <span className={css.buttonLabel}></span>
          &#128269;
        </button>
      </form>
    </section>
  );
};

export default Find;
