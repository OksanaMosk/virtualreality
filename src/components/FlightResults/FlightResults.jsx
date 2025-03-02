import React from 'react';
import { useSelector } from 'react-redux';
import styles from './FlightResults.module.css'; // Імпортуємо стилі

const FlightResults = () => {
  const { flights, loading, error } = useSelector(state => state.flights);

  if (loading) return <div className={styles.loading}>Завантаження...</div>;
  if (error)
    return <div className={styles.error}>Сталася помилка: {error}</div>;
  if (!flights.length)
    return <div className={styles.noResults}>Рейси не знайдені.</div>;

  return (
    <div className={styles.resultsContainer}>
      <h2>Знайдені рейси</h2>
      <ul>
        {flights.map(flight => (
          <li key={flight.id}>
            <span>
              {flight.origin} → {flight.destination}
            </span>{' '}
            | {flight.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightResults;
