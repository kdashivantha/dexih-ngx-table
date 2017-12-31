import { Component, Input, Output, ElementRef, OnInit, AfterViewInit,
    OnChanges, SimpleChanges, OnDestroy, ContentChild, TemplateRef, EventEmitter, DoCheck, KeyValueDiffers } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';
import { TableItem, Column } from './dexih-table.models';

@Component({
    selector: 'dexih-table',
    templateUrl: './dexih-table.component.html',
    styleUrls: [
        'dexih-table.component.scss'
      ]
})
export class DexihTableComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, DoCheck {
    @Input() public tableData: Observable<Array<any>>;
    @Input() public data: Array<any>;
    @Input() public enableMultiSelect: boolean;
    @Input() public enableRowActions: boolean;
    @Input() public enableRowStatus: boolean;
    @Input() public enableMultiSelectActions: boolean;
    @Input() public enableSingleSelectActions = true;
    @Input() public enableManualSort = false;
    @Input() public enableSort = true;
    @Input() public enableFilter = true;
    @Input() public columns: Array<Column>;
    @Input() public sortColumn: string;
    @Input() public selectedItems: Array<any>;
    @Input() public keyColumn: string;
    @Input() public selectedKeyColumn: string;
    @Input() public enableSaveCsv = false;
    @Input() public csvFileName = 'data.csv';
    @Input() public enableResponsive = true;
    @Input() public tableClass = 'table table-striped table-bordered table-hover';

    @Output() rowClick: EventEmitter<any>
        = new EventEmitter<any>();
    @Output() selectedItemsChange: EventEmitter<Array<any>>
        = new EventEmitter<Array<any>>();
    @Output() public onSortChanged: EventEmitter<Array<any>>
        = new EventEmitter<Array<any>>();

    @ContentChild('rowAction') rowActionTemplate: TemplateRef<any>;
    @ContentChild('rowStatus') rowStatusTemplate: TemplateRef<any>;
    @ContentChild('selectedItemsAction') selectedItemsActionsTemplate: TemplateRef<any>;
    @ContentChild('selectedItemAction') selectedItemActionsTemplate: TemplateRef<any>;
    @ContentChild('actions') actionsTemplate: TemplateRef<any>;

    filterString: string;
    filterControl = new FormControl();
    sortDirection = 1;

    manualSort = false;

    currentSelectedItems: Array<any>;

    tableItems: Array<TableItem>;

    selectedItemsCount: number;
    private selectAllState: boolean;

    columnCount = 1;

    private tableDataSubscription: Subscription;
    private filterSubscription: Subscription;

    private loadCompleted = false;

    private dataDiffer;

    constructor(private el: ElementRef, differs: KeyValueDiffers) {
        this.dataDiffer = differs.find({}).create();
    }

    ngOnInit() {
        this.currentSelectedItems = this.selectedItems;
        this.loadTableData();
    }

    ngOnDestroy() {
        if (this.tableDataSubscription) { this.tableDataSubscription.unsubscribe(); }
        if (this.filterSubscription) { this.filterSubscription.unsubscribe(); }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.columns) {
            this.columnCount = this.columns.length;
            if (this.enableMultiSelect) { this.columnCount++; }
            if (this.enableRowActions) { this.columnCount++; }
            if (this.enableRowStatus) { this.columnCount++; }
        }
    }

    ngDoCheck() {
        if (!this.tableData && this.data) {
            let changes = this.dataDiffer.diff(this.data); // check for changes
            if (changes) {
                this.doLoadData(this.data);
            }
        }
      }

    ngAfterViewInit() {
        this.loadCompleted = true;
    }

    loadTableData() {
        // use the observable for loading the table as first preference.
        if (this.tableData) {
            if (this.tableDataSubscription) { this.tableDataSubscription.unsubscribe(); }
            this.tableDataSubscription = this.tableData.subscribe(data => {
                this.doLoadData(data);
            });
        } else {
            // otherwise load from the static data.
            this.doLoadData(this.data);
        }
    }

    doLoadData(data: Array<any>) {
        if (data) {
            this.data = data;

            // reset the tableItems array.
            this.tableItems = new Array(this.data.length);
            this.data.forEach((item, index) => {
                let isSelected = false;
                if (this.keyColumn && this.selectedItems) {
                    let keyValue = this.fetchFromObject(item, this.keyColumn);
                    let selectedKeyColumn = this.selectedKeyColumn ? this.selectedKeyColumn : this.keyColumn;
                    let selected = this.selectedItems.findIndex( c => this.fetchFromObject(c, selectedKeyColumn) === keyValue);
                    isSelected = selected >= 0 ? true : false;
                }
                this.tableItems[index] = new TableItem(index, null, isSelected, false);
            });

            // update the data each time the source changes.
            this.updateFilter();


            // monitor changes to the filter control, and update if updated after 500ms.
            if (this.filterSubscription) { this.filterSubscription.unsubscribe(); }
            this.filterSubscription = this.filterControl.valueChanges
                .debounceTime(500)
                .subscribe(newValue => {
                    this.filterString = newValue;
                    this.updateFilter();
                });
        } else {
            this.data = null;
            this.tableItems = null;
        }
    }

    // direction = -1 desc, 1 asc.
    sortChange(sortColumn, direction) {
        if (sortColumn === 'manual1235135490543') {
            this.manualSort = true;
            this.filterString = '';
        } else if (this.data) {
            this.manualSort = false;
            this.sortColumn = sortColumn;
            this.sortDirection = direction;

            this.updateFilter();
        }
    }

    manualSortChange() {
        let newData = new Array<any>();

        this.tableItems.forEach((tableItem, index) => {
            newData.push(this.data[tableItem.index]);
        });

        this.onSortChanged.emit(newData);
    }

    selectRowClick(row: any) {
        this.rowClick.emit(row);
    }

    private updateFilter() {
        if (this.tableItems) {
            if (this.filterString) {
                let filter = this.filterString.toLowerCase();

                this.data.forEach((row, index) => {
                    let isMatch = false;
                    this.columns.forEach(column => {
                        if (String(this.fetchFromObject(row, column.name)).toLowerCase().includes(filter)) {
                            isMatch = true;
                        }
                    });

                    this.tableItems[index].isFiltered = !isMatch;
                });
            } else {
                this.tableItems.forEach(item => item.isFiltered = false);
            }

            if (this.sortColumn) {
                // add the sorted value to each of the table items.
                this.tableItems.forEach(item => item.sortValue = this.fetchFromObject(this.data[item.index], this.sortColumn));
            } else {
                // if no sort colunn, sort to original order
                this.tableItems.forEach(item => item.sortValue = item.index);
            }

            this.tableItems = this.tableItems.sort((a, b) => {
                let result = (a.sortValue < b.sortValue) ? -1 : (a.sortValue > b.sortValue) ? 1 : 0;
                return result * this.sortDirection;
            });

            this.itemSelected(false);
        }
    }

    itemSelected(raiseEvent = false) {
        if (this.data) {
            this.selectedItemsCount = this.tableItems.filter(t => t.isSelected === true).length;
            this.currentSelectedItems = [];
            this.tableItems.filter(t => t.isSelected).forEach(item => {
                this.currentSelectedItems.push(this.data[item.index]);
            });
        } else {
            this.selectedItemsCount = 0;
            this.currentSelectedItems = [];
        }

        if (this.loadCompleted && raiseEvent) {
            this.selectedItemsChange.emit(this.currentSelectedItems);
        }
    }

    selectAll(event) {
        this.tableItems.forEach(item => item.isSelected = this.selectAllState);
        this.itemSelected(true);
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

        let value = obj[prop];

        if (!value) {
            return '';
        } else if (value instanceof Date) {
            return value.toLocaleDateString() + ' ' + value.toLocaleTimeString();
        } else if (Object.keys(value).length === 0 && value.constructor === Object) {
            return '(null)';
        } else {
            return value;
        }

        // if (typeof  obj[prop] === 'object' || !obj[prop]) {
        //     return '';
        // } else {
        //     return obj[prop];
        // }
    }

    saveCsv() {
        // create a header row.
        let csvContent = this.columns.map(c => '"' + c.title + '"').join(',') + '\n';

        this.data.forEach(row => {
            csvContent += this.processRow(row);
        });

        let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, this.csvFileName);
        } else {
            let link = document.createElement('a');
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                let url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', this.csvFileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }

    }

    private processRow(row: Array<any>) {
        let finalVal = '';
        for (let j = 0; j < row.length; j++) {
            let innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            let result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0) {
                result = '"' + result + '"';
            }
            if (j > 0) {
                finalVal += ',';
            }
            finalVal += result;
        }
        return finalVal + '\n';
    };

}


