import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TableItem, Column } from './dexih-table.models';
import { isNumeric } from 'rxjs/util/isNumeric';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'dexih-table-cell',
    templateUrl: 'dexih-table-cell.component.html'
})

export class DexihTableCellComponent implements OnInit, OnDestroy {
    @Input() column: Column;
    @Input() row: any;

    private _interval;

    public value: any;
    public formattedValue: any;
    public alignment: string;

    constructor() { }

    ngOnInit() {
        if (this.column.name || this.column.name === 0) {
            this.value = this.fetchFromObject(this.row, this.column.name);

            switch (this.column.format) {
                case 'Date':
                    this.formattedValue = (new Date(this.value).toLocaleDateString());
                    break;
                case 'Time':
                    this.formattedValue = (new Date(this.value).toLocaleTimeString());
                    break;
                case 'DateTime':
                    this.formattedValue = (new Date(this.value).toLocaleDateString()) + ' ' + (new Date(this.value).toLocaleTimeString());
                    break;
                case 'Countdown':
                    this.formattedValue = this.countDown(new Date(this.value));
                    this._startTimer();
                    break;
            }
        } else {
            this.value = '';
        }
    }

    ngOnDestroy() {
        if (this._interval) {
            this._stopTimer();
        }
    }

    private _startTimer() {
        this._stopTimer();
        this._interval = setInterval(() => {
            this.formattedValue = this.countDown(new Date(this.value));
        }, 1000);
      }

    private _stopTimer() {
        clearInterval(this._interval);
        this._interval = undefined;
    }

    countDown(date: Date): string {
        let currentDate = new Date();
        // seconds between the two dates
        let delta = Math.max(0, Math.floor((date.getTime() - currentDate.getTime()) / 1000));
        let days, hours, minutes, seconds;

        let time: string;

        days = Math.floor(delta / 86400);
        delta -= days * 86400;
        hours = Math.floor(delta  / 3600) % 24;
        delta -= hours * 3600;
        minutes = Math.floor(delta  / 60) % 60;
        delta -= minutes * 60;
        seconds = delta % 60;

        time = days > 0 ? days + ' days ' : '';
        time = time + (hours > 0 ? hours + ' hours ' : '');
        time = time + (minutes > 0 && days === 0 ? minutes + ' minutes ' : '');
        time = time + (seconds > 0 && days === 0 && hours === 0 ? seconds + ' seconds ' : '');

        if (!time) {
            time = 'Complete';
        }

        return time;
      }

    // return the property value from any object.
    fetchFromObject(obj, prop): any {
        if (typeof obj === 'undefined' || typeof prop === 'undefined') {
            return false;
        }

        let propType = typeof prop;
        if (propType !== 'number') {
            // if the proerty has a "." recurse to the next nesting.
            let _index = prop.indexOf('.');
            if (_index > -1) {
                return this.fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
            }
        }

        if (this.column.format === 'Date' || this.column.format === 'Time') {
            this.alignment = 'right';
        }
        if (this.column.format === 'Boolean') {
            this.alignment = 'right';
        }

        let value = obj[prop];

        if (!value && value !== false && value !== 0) {
            return '';
        } else if (value instanceof Boolean) {
            this.alignment = 'centre';
            return value;
        } else if (isNumeric(value)) {
            this.alignment = 'right';
            return value;
        } else if (value instanceof Date) {
            this.alignment = 'right';
            return value.toLocaleDateString() + ' ' + value.toLocaleTimeString();
        } else if (Object.keys(value).length === 0 && value.constructor === Object) {
            return '(null)';
        } else {
            return value;
        }
    }
}

