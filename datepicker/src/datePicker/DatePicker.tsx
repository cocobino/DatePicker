import React from 'react';
import {observer} from "mobx-react";

import css from './DatePicker.scss';
import classNames from 'classnames/bind';


import Calendar from './calendar/Calendar';
import DatePickerVM from "./DatePickerVM";

const cx = classNames.bind(css);


const DatePicker = observer((props:any) => {
    const onChange = () =>  {

    }

    return (
        <div className={cx('datepicker')}>
            <input type="text" value={DatePickerVM.YYYYMMDD} name={props['data-name']} onChange={onChange} readOnly/>
            <Calendar/>
       </div>
    )
});

export default DatePicker;
