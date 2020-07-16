import DateModel, {DatePickerMode} from "./dateModel/DateModel";

interface ICalendarData {
    type : string;
    value : string|number;
}

interface IYear {
    cury:number;
    yset:number;
}

class DatePickerVM {
    private _calrendar:Array<ICalendarData> =[];
    private yset:IYear = {cury:0, yset:20};

    constructor(format:string) {
        this._drawDateMode();
    }

    private _drawDateMode() {
        this._calrendar = [{type:'dayOfweek', value:'S'}, {type:'dayOfweek', value:'M'}, {type:'dayOfweek', value:'T'}, {type:'dayOfweek', value:'W'}, {type:'dayOfweek', value:'T'}, {type:'dayOfweek', value:'F'}, {type:'dayOfweek', value:'S'}];
        const _setDate = new Date(DateModel.getDate.getFullYear(), DateModel.getDate.getMonth(), 1);
        const y =[31,_setDate.getFullYear() % 4 === 0 ? 28 : 29,31,30,31,30,31,31,30,31,30,31];
        let cnt=1, week=0;
        for(let i=0; i<42; i++,i%7==0 ? week++ : week) this._calrendar.push((week===0 && i < _setDate.getDay() || cnt > y[_setDate.getMonth()]) ? {type: 'otherMonth', value: ''} : {type: 'curMonth', value: cnt++});
    }

    private _drawMonthMode() {
        this._calrendar = [];
        for(let i=0; i<12; i++) this._calrendar.push({type:'month', value:(i+1)+'월'});
    }

    private  _drawYearMode() {
        this._calrendar = []; const ymod = DateModel.getDate.getFullYear()%this.yset.yset;
        this.yset.cury = ymod === 0 ? DateModel.getDate.getFullYear()/this.yset.yset : (DateModel.getDate.getFullYear()/this.yset.yset)+1;
        for(let y=this.yset.cury*this.yset.yset; y<(this.yset.cury+1)*this.yset.yset; y++) this._calrendar.push({type:'year', value:y+1});
    }

    get  getYearModeHeader() {
        return `${this.yset.cury*this.yset.yset}-${(this.yset.cury+1)*this.yset.yset}`;
    }

    setDatePickerMode(mode:string) {
        if(mode === 'month') {
            DateModel.setDatePickerMode(DatePickerMode.month);
            this._drawMonthMode();
        }  else if(mode === 'year') {
            DateModel.setDatePickerMode(DatePickerMode.year);
            this._drawYearMode();
        }
    }


    setPrev() {
        if(DateModel.getDatePickerMode === DatePickerMode.date) {
            DateModel.setDate(`${DateModel.getDate.getMonth() === 0 ? DateModel.getDate.getFullYear()-1 : DateModel.getDate.getFullYear()}-${(DateModel.getDate.getMonth() === 0 ? '12' : DateModel.getDate.getMonth())}`);
            this._drawDateMode();
        } else if(DateModel.getDatePickerMode === DatePickerMode.month) {
            DateModel.setDate(`${(DateModel.getDate.getFullYear()-1)}-${DateModel.getDate.getMonth()+1}`);
        } else if(DateModel.getDatePickerMode === DatePickerMode.year) {
            DateModel.setDate(`${(this.yset.cury*this.yset.yset)-this.yset.yset}-${DateModel.getDate.getMonth()+1}`);
            this._drawYearMode();
        }
    }

    setNext() {
        if(DateModel.getDatePickerMode === DatePickerMode.date) {
            DateModel.setDate(`${DateModel.getDate.getMonth() === 11 ? DateModel.getDate.getFullYear() + 1 : DateModel.getDate.getFullYear()}-${(DateModel.getDate.getMonth() === 11 ? '1' : DateModel.getDate.getMonth() + 2)}`);
            this._drawDateMode();
        } else if(DateModel.getDatePickerMode === DatePickerMode.month) {
            DateModel.setDate(`${(DateModel.getDate.getFullYear()+1)}-${DateModel.getDate.getMonth()+1}`);
        } else if(DateModel.getDatePickerMode === DatePickerMode.year) {
            DateModel.setDate(`${(this.yset.cury*this.yset.yset)+this.yset.yset}-${DateModel.getDate.getMonth()+1}`);
            this._drawYearMode();
        }
    }

    setPickDate(pickDate: Date) {
        DateModel.setPickDate(pickDate)
    }

    get getDatePickerMode() {
        return DateModel.getDatePickerMode;
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