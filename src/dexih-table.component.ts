import {
    AfterViewInit,
    Component,
    ContentChild,
    DoCheck,
    ElementRef,
    EventEmitter,
    Input,
    KeyValueDiffers,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Column, ColumnOperations, TableItem } from './dexih-table.models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'dexih-table',
    templateUrl: './dexih-table.component.html',
    styleUrls: [ './dexih-table.component.scss' ]
})
export class DexihTableComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, DoCheck {
    @Input() public dataObservable: Observable<Array<any>>;
    @Input() public data: Array<any>;
    @Input() public enableToolbar = true;
    @Input() public enableMultiSelect: boolean;
    @Input() public enableCellValue = true;
    @Input() public enableManualSort = false;
    @Input() public enableSort = true;
    @Input() public enableFilter = true;
    @Input() public filterString: string;
    @Input() public enableHeaderRow = true;
    @Input() public columns: Array<Column>;
    @Input() public sortColumn: string;
    @Input() public selectedItems: Array<any>;
    @Input() public keyColumn: string;
    @Input() public selectedKeyColumn: string;
    @Input() public enableSaveCsv = false;
    @Input() public csvFileName = 'data.csv';
    @Input() public enableResponsive = true;
    @Input() public tableClass = 'table table-striped table-bordered table-hover m-0';
    @Input() public error: string;
    @Input() public heading: string;
    @Input() public dropListConnectedTo;
    @Input() public dropListEnterPredicate;
    @Input() public loadingMessage = 'Data is loading...';
    @Input() public hideTable = false;

    @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() onSelectedChange: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
    @Output() public onSortChanged: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
    @Output() public onDrop: EventEmitter<CdkDragDrop<string[]>> = new EventEmitter();

    @ContentChild('rowAction') public rowActionTemplate: TemplateRef<any>;
    @ContentChild('rowStatus') public rowStatusTemplate: TemplateRef<any>;
    @ContentChild('selectedItemsAction') public selectedItemsActionsTemplate: TemplateRef<any>;
    @ContentChild('selectedItemAction') public selectedItemActionsTemplate: TemplateRef<any>;
    @ContentChild('actions') public actionsTemplate: TemplateRef<any>;
    @ContentChild('cell') public cellTemplate: TemplateRef<any>;
    @ContentChild('tableHeader') public tableHeaderTemplate: TemplateRef<any>;

    @ViewChild('cdkDropList') public cdkDropList: ElementRef;

    public filterControl = new FormControl();
    public sortDirection = 1;
    public manualSort = false;

    public currentSelectedItems: Array<any>;

    public tableItems: Array<TableItem>;
    public currentColumns: Column[];

    // array containing column number of expanded nodes in each row
    public expandedNodes: Array<Number> = null;
    public tableColumns: number;

    public selectedItemsCount: number;
    private selectAllState: boolean;

    public columnCount = 1;
    public preventRowClick = false;

    private tableDataSubscription: Subscription;
    private filterSubscription: Subscription;
    private loadCompleted = false;
    private dataDiffer: any;
    private columnOperations = new ColumnOperations();

    constructor(public el: ElementRef, public differs: KeyValueDiffers) {
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
        } else if (this.data) {
            this.columnCount = this.data.keys.length;
        }

        if (this.enableMultiSelect) { this.columnCount++; }
        if (this.rowActionTemplate) { this.columnCount++; }
        if (this.rowStatusTemplate) { this.columnCount++; }
        if (this.enableManualSort) { this.columnCount++; }
    }

    ngDoCheck() {
        if (!this.dataObservable && this.data) {
            let changes = this.dataDiffer.diff(this.data); // check for changes

            // the data.length === 0 is checked also as dataDiffer doesn't detect from null to empty
            if (changes || (this.data && this.data.length === 0)) {
                this.doLoadData(this.data);
            }
        }
    }

    ngAfterViewInit() {
        this.loadCompleted = true;
    }

    loadTableData() {
        // use the observable for loading the table as first preference.
        if (this.dataObservable) {
            if (this.tableDataSubscription) { this.tableDataSubscription.unsubscribe(); }
            this.tableDataSubscription = this.dataObservable.subscribe(data => {
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
            this.expandedNodes = new Array(data.length);

            // console.debug(`key length ${data[0].keys.length}`);
            // if column formatting not specified, then create
            if (this.columns) {
                this.currentColumns = this.columns;
            } else {
                this.currentColumns = [];
                if (data.length > 0) {
                    let dataItem = data[0];
                    if (dataItem instanceof Array) {
                        let dataArray = <Array<any>>dataItem;
                        for (let i = 0; i < dataArray.length; i++) {
                            this.currentColumns.push(<Column>{ name: i, title: `[${i}]` });
                        }
                    } else {
                        let properties = Object.getOwnPropertyNames(data[0]);
                        properties.forEach(property => {
                            this.currentColumns.push(<Column>{ name: property, title: property });
                        });
                    }
                }
            }

            this.columnCount = this.currentColumns.length +
                (this.enableMultiSelect ? 1 : 0) +
                (this.enableManualSort ? 1 : 0) +
                (this.rowActionTemplate ? 1 : 0) +
                (this.rowStatusTemplate ? 1 : 0);


            // reset the tableItems array.
            this.tableItems = new Array(this.data.length);
            this.data.forEach((item, index) => {
                let isSelected = false;
                if (this.keyColumn && this.selectedItems) {
                    let keyValue = this.columnOperations.fetchFromObject(item, this.keyColumn);
                    let selectedKeyColumn = this.selectedKeyColumn ? this.selectedKeyColumn : this.keyColumn;
                    let selected = this.selectedItems
                        .findIndex(c => this.columnOperations.fetchFromObject(c, selectedKeyColumn) === keyValue);
                    isSelected = selected >= 0 ? true : false;
                }
                this.tableItems[index] = new TableItem(index, null, isSelected, false);
            });

            // update the data each time the source changes.
            this.updateFilter();


            // monitor changes to the filter control, and update if updated after 500ms.
            if (this.filterSubscription) { this.filterSubscription.unsubscribe(); }
            this.filterSubscription = this.filterControl.valueChanges
                .pipe(debounceTime(500))
                .subscribe(newValue => {
                    this.filterString = newValue;
                    this.updateFilter();
                });
        } else {
            this.data = null;
            this.tableItems = null;
        }
    }

    sort(sortColumn: string) {
        if (this.data) {
            this.manualSort = false;
            if (this.sortColumn === sortColumn) {
                if (this.sortDirection === 1) {
                    this.sortDirection = -1;
                } else {
                    this.sortColumn = null;
                    this.sortDirection = 1;
                }
            } else {
                this.sortColumn = sortColumn;
                this.sortDirection = 1;
            }
            this.updateFilter();
        }
    }

    manualSortChange(event: CdkDragDrop<string[]>) {
        if (event.container === event.previousContainer) {
            moveItemInArray(this.tableItems, event.previousIndex, event.currentIndex);

            let newData = new Array<any>();

            this.tableItems.forEach((tableItem, index) => {
                newData.push(this.data[tableItem.index]);
            });

            this.onSortChanged.emit(newData);
        } else {
            this.onDrop.emit(event);
        }
    }

    selectRowClick(row: any) {
        if (!this.preventRowClick) {
            // if there is a selection don't raise the event.
            let selection = window.getSelection();
            if (selection.type !== 'Range') {
                this.rowClick.emit(row);
            }
        }
        this.preventRowClick = false;

    }

    private updateFilter() {
        if (this.tableItems) {
            if (this.filterString) {
                let filter = this.filterString.toLowerCase();

                this.tableItems.forEach((row, index) => {
                    let isMatch = false;
                    const dataRow = this.data[this.columnOperations.fetchFromObject(row, 'index')];
                    this.currentColumns.forEach(column => {
                        const columnNameValue = this.columnOperations.fetchFromObject(dataRow, column.name);
                        const columnFooterValue = this.columnOperations.fetchFromObject(dataRow, column.footer);
                        const columnHeaderValue = this.columnOperations.fetchFromObject(dataRow, column.header);
                        if ((columnNameValue != null && String(columnNameValue).toLowerCase().includes(filter)) ||
                            (columnFooterValue != null && String(columnFooterValue).toLowerCase().includes(filter)) ||
                            (columnHeaderValue != null && String(columnHeaderValue).toLowerCase().includes(filter)) ) {
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
                this.tableItems.forEach(item => item.sortValue =
                        this.columnOperations.fetchFromObject(this.data[item.index], this.sortColumn));
            } else {
                // if no sort column, sort to original order
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
            this.onSelectedChange.emit(this.currentSelectedItems);
        }
    }

    selectAll(event: any) {
        this.tableItems.forEach(item => item.isSelected = this.selectAllState);
        this.itemSelected(true);
    }

    public saveCsv() {
        // create a header row.
        let csvContent = this.currentColumns.map(c => '"' + c.title + '"').join(',') + '\n';

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

    private processRow(row: any): string {
        let finalVal = '';

        return this.currentColumns.map(column => {
            let value = this.columnOperations.fetchFromObject(row, column.name);
            let formattedValue = this.columnOperations.formatValue(column, value);

            if (typeof(formattedValue) === 'string') {
                formattedValue = '"' + formattedValue + '"';
            }

            if (formattedValue instanceof String) {
                let result = formattedValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0) {
                    result = '"' + result + '"';
                }
                return result;
            } else {
                return formattedValue;
            }
        }).join(',') + '\n';
    }

    public nodeClick(row: number, column: number) {
        this.preventRowClick = true;

        if (this.expandedNodes[row] === column) {
            this.expandedNodes[row] = -1;
        } else {
            this.expandedNodes[row] = column;
        }
    }

    public nodeClose(row: number) {
        this.preventRowClick = true;
        this.expandedNodes[row] = -1;
    }

}


