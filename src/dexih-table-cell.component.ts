import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TableItem, Column, ColumnOperations } from './dexih-table.models';
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
    public formattedValue: string;
    public alignment: string;

    private columnOperations = new ColumnOperations();

    constructor() { }

    ngOnInit() {
        if (this.column.name || this.column.name === 0) {
            this.value = this.columnOperations.fetchFromObject(this.row, this.column.name);
            this.formattedValue = this.columnOperations.formatValue(this.column, this.value);
            this.alignment = this.setAlignment(this.value)

            if (this.column.format === 'Countdown') {
                this._startTimer();
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
            if (this.value instanceof Date) {
                this.formattedValue = this.columnOperations.countDown(this.value);
            } else {
                this.formattedValue = this.columnOperations.countDown(new Date(this.value));
            }
        }, 1000);
    }

    private _stopTimer() {
        clearInterval(this._interval);
        this._interval = undefined;
    }


    setAlignment(value): string {
        if (this.column.format === 'Date' ||
            this.column.format === 'Time' ||
            this.column.format === 'DateTime' ||
            value instanceof Date ||
            isNumeric(value)
        ) {
            return 'right';
        } else if (this.column.format === 'Boolean') {
            return 'center';
        }

        return '';
    }
}

