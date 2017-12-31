import { Component, OnInit, Input } from '@angular/core';
import { TableItem, Column } from './dexih-table.models';
import { isNumeric } from 'rxjs/util/isNumeric';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'dexih-table-cell',
    templateUrl: 'dexih-table-cell.component.html'
})

export class DexihTableCellComponent implements OnInit {
    @Input() column: Column;
    @Input() row: any;

    public value: any;
    public formattedValue: any;
    public alignment: string;

    constructor() { }

    ngOnInit() {
        if (this.column.name || this.column.name === 0) {
            this.value = this.fetchFromObject(this.row, this.column.name);

            switch (this.column.format) {
                case 'Date':
                    this.formattedValue = (new Date(this.value).toDateString());
                    break;
                case 'Time':
                    this.formattedValue = (new Date(this.value).toTimeString());
                    break;
            }
        } else {
            this.value = '';
        }
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

