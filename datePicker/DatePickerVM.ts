import DateModel from "./dateModel/DateModel";

interface ICalendarData {
    type : string;
    value : string|number;
}


class DatePickerVM {
    private _calrendar:Array<ICalendarData> =[{type:'dayOfweek', value:'S'}, {type:'dayOfweek', value:'M'}, {type:'dayOfweek', value:'T'}, {type:'dayOfweek', value:'W'}, {type:'dayOfweek', value:'T'}, {type:'dayOfweek', value:'F'}, {type:'dayOfweek', value:'S'}];

    constructor(format:string) {
        this._drawCalrendar();
    }

    private _drawCalrendar() {
        const _setDate = new Date(DateModel.getDate.getFullYear(), DateModel.getDate.getMonth(), 1);
        const y =[31,_setDate.getFullYear() % 4 === 0 ? 28 : 29,31,30,31,30,31,31,30,31,30,31];

        this._calrendar.length > 7 ? this._calrendar.splice(7,this._calrendar.length-1) : '';
        let cnt=1;
        for(let week=0;week<6; week++) {
            for(let day=0;day<7;day++) {
                    this._calrendar.push((week===0 && day < _setDate.getDay() || cnt > y[_setDate.getMonth()]) ? {type: 'otherMonth', value: ''} : {type: 'curMonth', value: cnt++});
            }
        }
    }

    setPrevMonth() {
        DateModel.setDate(`${DateModel.getDate.getMonth() === 0 ? DateModel.getDate.getFullYear()-1 : DateModel.getDate.getFullYear()}-${(DateModel.getDate.getMonth() === 0 ? '12' : DateModel.getDate.getMonth())}`);
        this._drawCalrendar();
    }

    setNextMonth() {
        DateModel.setDate(`${DateModel.getDate.getMonth() === 11 ? DateModel.getDate.getFullYear()+1 : DateModel.getDate.getFullYear()}-${(DateModel.getDate.getMonth() === 11 ? '1' : DateModel.getDate.getMonth()+2)}`);
        this._drawCalrendar();
    }

    setPickDate(pickDate: Date) {
        DateModel.setPickDate(pickDate)
    }

    get getCalrendar() {
        return this._calrendar;
    }

    get getDate() {
        return DateModel.getDate;
    }

    get YYYYMMDD() {
        return DateModel.YYYYMMDD;
    }
}

export default new DatePickerVM('YMD');