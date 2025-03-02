import React, { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { PsychologistsList } from 'components/AirportSearch/AirportSearch';
import { Navigate } from 'react-router-dom';
import Filter from 'components/Filter/Filter';
import Loader from 'components/Loader/Loader';

import { selectAuthenticated } from '../../redux/auth/auth.selector';

import { selectError } from 'redux/flights/flights.selector';

import css from './Psychologists.module.css';

const Psychologists = {};

export default Psychologists;
