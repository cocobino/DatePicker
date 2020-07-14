import React from 'react';
import {observer} from "mobx-react";

import classNames from 'classnames/bind';
import css from './Calendar.scss';
import DatePickerVM from "../DatePickerVM";

const cx = classNames.bind(css);



const Calendar = observer(() => {

    const onClickDate = (e : any) => { if(Array.from(e.target.classList).indexOf(cx('curMonth'))) DatePickerVM.setPickDate(new Date(DatePickerVM.getDate.getFullYear(), DatePickerVM.getDate.getMonth(), e.target.textContent)); };

    const Calrendar = DatePickerVM.getCalrendar.map((num, idx) => <div className={cx('date', idx % 7 === 0 ? 'sun':'', num.type)} key={idx} onClick={onClickDate} >{num.value}</div>);

    const prevMonth = () => {DatePickerVM.setPrevMonth()};

    const nextMonth = () => {DatePickerVM.setNextMonth()};

    return (
        <div className={cx('calendar')}>
            <div className={cx('header')}>
                <button type="button" onClick={prevMonth}>&lt;</button>
                <span> {DatePickerVM.getDate.getFullYear()}년 {(DatePickerVM.getDate.getMonth()+1)}월 </span>
                <button type="button" onClick={nextMonth}>&gt;</button>
            </div>
            <div className={cx('body')}>
                {Calrendar}
            </div>
        </div>
    )
});

export default Calendar;