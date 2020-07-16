import React from 'react';
import {observer} from "mobx-react";

import classNames from 'classnames/bind';
import css from './Calendar.scss';
import DatePickerVM from "../DatePickerVM";
import {DatePickerMode} from "../dateModel/DateModel";

const cx = classNames.bind(css);



const Calendar = observer(() => {

    const onClickDate = (e : any) => { if(Array.from(e.target.classList).indexOf(cx('curMonth'))) DatePickerVM.setPickDate(new Date(DatePickerVM.getDate.getFullYear(), DatePickerVM.getDate.getMonth(), e.target.textContent)); };

    const Calrendar = DatePickerVM.getCalrendar.map((num, idx) => <div className={cx('date', (DatePickerVM.getDatePickerMode === DatePickerMode.date && idx % 7 === 0 ? 'sun':''), num.type)} key={idx} onClick={onClickDate} >{num.value}</div>);

    const setPrev = () => {DatePickerVM.setPrev()};

    const setNext = () => {DatePickerVM.setNext()};

    const setDatePickerMode = (e:any) => { DatePickerVM.setDatePickerMode(e.target.dataset.type) };

    return (
        <div className={cx('calendar')}>
            <div className={cx('header')}>
                <button type="button" onClick={setPrev}>&lt;</button>
                <span>
                    <button type="button" data-type={'year'} onClick={setDatePickerMode}>
                        {DatePickerVM.getDatePickerMode === DatePickerMode.year ? DatePickerVM.getYearModeHeader: DatePickerVM.getDate.getFullYear()}년
                    </button>
                    <button type="button" data-type={'month'} onClick={setDatePickerMode}>
                        {DatePickerVM.getDatePickerMode === DatePickerMode.date ? (DatePickerVM.getDate.getMonth()+1)+'월' : ''}
                    </button>
                </span>
                <button type="button" onClick={setNext}>&gt;</button>
            </div>
            <div className={cx('body')}>
                {Calrendar}
            </div>
        </div>
    )
});

export default Calendar;
