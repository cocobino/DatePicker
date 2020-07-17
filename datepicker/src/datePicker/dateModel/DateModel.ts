import {observable} from "mobx";

export enum DatePickerMode {
    year ,
    month,
    date //default
}

class DateModel {
    @observable private _Date:Date;
    @observable private _pickDate:Date = new Date();
    @observable private _mode:DatePickerMode = DatePickerMode.date;

    constructor() {
        this._Date = new Date();
    }

    //IE, Chomre -> 데이터 받는 형식 확인하기
    setDate(newDate:string) {
        this._Date = new Date(newDate);
    }

    get getDate():Date {
        return this._Date;
    }

    setPickDate(pickDate:Date) {
        this._pickDate = pickDate;
    }

    get YYYYMMDD() :string{
        return [
            this._pickDate.getFullYear()+ '-',
            (this._pickDate.getMonth()+1>9 ? '' : '0') + (this._pickDate.getMonth()+1) + '-',
            (this._pickDate.getDate()>9 ? '' : '0') + this._pickDate.getDate()
        ].join('');
    }

    setDatePickerMode(mode:DatePickerMode) {
        this._mode = mode;
    }

    get getDatePickerMode() {
        return this._mode;
    }
}

export default new DateModel();