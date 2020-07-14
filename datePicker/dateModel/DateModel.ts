import {observable} from "mobx";

class DateModel {
    @observable private _Date:Date;
    @observable private _pickDate:Date = new Date();

    constructor() {
        this._Date = new Date();
    }

    setDate(newDate:string) {
        this._Date = new Date(newDate);
    }

    setPickDate(pickDate:Date) {
        this._pickDate = pickDate;
    }

    get getDate():Date {
        return this._Date;
    }

    get YYYYMMDD() :string{
        return [
            this._pickDate.getFullYear()+ '-',
            (this._pickDate.getMonth()+1>9 ? '' : '0') + (this._pickDate.getMonth()+1) + '-',
            (this._pickDate.getDate()>9 ? '' : '0') + this._pickDate.getDate()
        ].join('');
    }
}

export default new DateModel();