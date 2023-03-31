import * as React from 'react';
import { useEffect, useState } from 'react';
import { calculateTimeLeft } from '../utils/Utils';
import style from '../style/CountDown.module.scss';

export const Counter = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
  }, [timeLeft]);

  return (
    <div className={style.counter}>
      <div className={style['counter-item']}>
        <span className={style.value}>{String(timeLeft.days).padStart(2, '0')}</span>
        <span className={style.label}>Dias</span>
      </div>

      <div className={style['counter-item']}>
        <span className={style.value}>{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className={style.label}>Horas</span>
      </div>

      <div className={style['counter-item']}>
        <span className={style.value}>
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className={style.label}>Minutos</span>
      </div>

      <div className={style['counter-item']}>
        <span className={style.value}>
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className={style.label}>Segundos</span>
      </div>
    </div>
  );
};