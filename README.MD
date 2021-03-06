
# dexih-ngx-table

dexih-ngx-table is an Angular (2+) component for building data driven tables.

[![][dex-img]][dex]

[dex-img]: https://dataexpertsgroup.com/img/dex_web_logo.png
[dex]: https://dataexpertsgroup.com
[dexih-table-demo]: ./assets/dexih-table-demo-1.gif

[![npm version](https://badge.fury.io/js/dexih-ngx-table.svg)](https://www.npmjs.com/package/dexih-ngx-table)
[![Build Status](https://travis-ci.org/DataExperts/dexih-ngx-table.svg?branch=master)](https://travis-ci.org/DataExperts/dexih-ngx-table)

## Features

* Global Search/Filtering.
* Column sorting (ascending/descending)
* Custom column formatting (such as string, numeric, date, code etc.)
* Row single/multi selection with dynamic/hidden button selection.
* Multiple template sections for customization.
* Drag and drop re-ordering.
* Save to csv file.

## Releases Summary

### Release 0.4.0

* BREAKING - dependencies updated to use angular 7.x
* BREAKING - removed ng2-dnd dependency.  Drag and drop now uses Angular material drop-drop library (cdk).


### Release 0.3.12

* Added charArray formatting option, which will format an array ['a','b','c'] as 'abc'

### Release 0.3.11

* Added hideTable attribute, which can be used to hide the table and leave other controls visible.

### Release 0.3.8

* Added header property to cell data.

### Release 0.3.6

* Removed font-awesome dependency.  Icons now imbedded (c/o open iconic)
* Updated waiting animation.
* Moved status column to end.

### Release 0.3.2

* Updated: Toolbar to work with mobile size devices

### Release 0.3.1

* Updated: When links within markdown tags a clicked, a new window/tab will be opened.

### Release 0.3.0.

* **Breaking** - Updated for Angular 6.  This version will not work with any versions less than Angular 6 (use version 0.2.x if you need angular 5x compatibility).
* ngx-md library must be updated to version 6 (add "ngx-md": "^6.0.0" to package.json).  Note: the ngx-md library has breaking change an import module name change from `MarkdownModule` to `NgxMdModule`
* There are changes in angular 6 around decorators, so I had to remove the forRoot() declarations in the module.  This caused trouble when loading modules from systemjs.config.js, however seemed ok when using a bootstrap loader.  If you're getting injection or null errors, try adding DndModule.forRoot(), NgxMdModule.forRoot() to your modules import.

[Older release information](releases.md)

![][dexih-table-demo]

## Installation

To install this library, run:

```bash
$ npm install dexih-ngx-table --save
```

There are also a dependencies (for drag/drop) on the ng2-dnd library, and the ngx-md (for markdown formatting) library.  To install these run:

```bash
$ npm install ng2-dnd ngx-md --save
```

You will need also need bootstrap styles included (version 3/4).  For example add this to your index.html header:

```xml
<!-- index.html -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
```

## Example

Create an array of values containing the data:

```typescript
public sampleTable = [
  { cell1: 'r1 cell1', cell2: 'r1 cell2', cell3: 'r1 cell3'},
  { cell1: 'r2 cell1', cell2: 'r2 cell2', cell3: 'r2 cell3'},
  { cell1: 'r3 cell1', cell2: 'r3 cell2', cell3: 'r3 cell3'},
];
```

Populate this data into the table as follows:

```html
<dexih-table [data]="sampleTable">
</dexih-table>
```

For a quick demo and sample code refer to the following [plnkr](http://plnkr.co/edit/G3RNCVGMXhodH7Ap).

## Using the Table Component

From your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// ** Import the TableModule **
import { DexihTableModule } from 'dexih-ngx-table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // ** Import the TableModule **
    DexihTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once the library is imported, you can use it as follows:

```xml
<!-- Use the dexih-table selector to add the table to a template -->
<dexih-table [data]="sampleTable">
</dexih-table>
```

## Populating the Table

Data can be populated on the table through a static array or observable array.

For static array use the `Data` property as follows:

```typescript
public sampleTable = [
  { cell1: 'r1 cell1', cell2: 'r1 cell2', cell3: 'r1 cell3'},
  { cell1: 'r2 cell1', cell2: 'r2 cell2', cell3: 'r2 cell3'},
  { cell1: 'r3 cell1', cell2: 'r3 cell2', cell3: 'r3 cell3'},
];
```

```html
<dexih-table [data]="sampleTable">
</dexih-table>
```


For an observable array use the `tableData` property as follows:

```typescript
private _tableData = new BehaviorSubject<Array<DataModel>>(null);
tableData: Observable<Array<DataModel>> = this._tableData.asObservable();

ngOnInit() {
  let date = new Date();

  let data = new Array<DataModel>();
  data.push(new DataModel(1, 'row3', new Date('2001-01-01'), date, true, 'code ...', 'tip 1', 'fa fa-spin fa-cog'));
  data.push(new DataModel(2, 'row2', new Date('2001-01-01'), date, true, 'code ...', 'tip 2', 'fa fa-spin fa-cog'));
  data.push(new DataModel(3, 'row1', new Date('2001-01-01'), date, true, 'code ...', 'tip 3', 'fa fa-spin fa-cog'));

  this._tableData.next(data);
}
```

```html
<dexih-table [tableData]="tableData">
</dexih-table>
```

## Formatting columns

Columns can be formatted in the table by passing an array of type `Column` to the table component through the `columns` property.  If the `columns` property is not provided the columns will be the names of each property in in the data row.

The columns array can be constructed in your component as follows:

```typescript
import { DexihTableModule, Column }  from 'dexih-ngx-table';

...

columns = [
  <Column> { title: 'Icon', iconClass: 'icon', tooltip: 'toolTip', width: '1%', align: 'center' },
  <Column> { name: 'intValue', title: 'Int Value', format: '' },
  <Column> { name: 'stringValue', title: 'String Value', format: '' },
  <Column> { name: 'dateValue', title: 'Date Value', format: 'Date' },
  <Column> { name: 'timeValue', title: 'Time Value', format: 'Time' },
  <Column> { name: 'boolValue', title: 'Bool Value', format: 'Boolean' },
  <Column> { name: 'codeValue', title: 'Code Value', format: 'Code' },
];
```

Then add the columns property to the table definition:
```html
<dexih-table [data]="sampleTable" [columns]="columns">
</dexih-table>
```

The following properties can be hard coded in the column settings an apply to all rows:
- `title` - the title to place in the table header.
- `format` - if empty no formatting is done.  Otherwise use:
  - `Date` - formats as local date.
  - `Time` - formats as local time.
  - `DateTime` - formats as local date & time.
  - `Countdown` - runs a countdown timer to a future date/time.
  - `Boolean` - formats as a checkbox.
  - `Code` - formats code.
  - `Html` - renders a html snippet.
  - `Md` - renders markdown format.
  - 'CharArray' - formats an array of chars as a single string (i.e. ['a', 'b', 'c'] formatted as 'abc')
- `width` - the width to apply to the table column (e.g. 10%, 100px).
- `align` (`left`, `centre`, `right`) - the text alignment for the column.

The following properties reference an property in the data row and are defined on a row by row basis:
- `name` - value to populate the cell (this can be html formatted).
- `header` - value to place in "small" characters above the name.
- `footer` - value to place in "small" characters under the name.
- `toolTip` - value to use as a tooltip for the cell.
- `class` - value to use as a css class for the cell.
- `iconClass` - the data property to use as a icon (note: this will be placed before the `name`)

## Formatting the Table

Sorting properties:
- `enableSort` (`true` default, `false`) - Places a drop down at the top-right position of the table which allows column sorting selection.
- `enableManualSort` (`true`, `false` -  Adds a manual sort option, which when selected adds a dragable cell, which can be used to re-order rows.
- `sortColumn` - Default column name to sort by.

Search/Filter
- `enableFilter` (`true` default, `false`) - Adds a search box at the top-right position of the table.

Enabling item selection properties:
- `enableMultiSelect` (`true`, `false` default) - places a checkbox in the first column which can be used to select one or more rows.
- `selectedItems` - An array of the items to be pre-selected when the table is populated (note, `enableMultiSelect` must be `true`).
- `keyColumn` - The column property in the `Data` which is used to reference a selected item.
- `selectedKeyColumn` - The column property in the `selectedItems` which is used to reference the selected property (this is the `keyColumn` if not specified).

Saving as Csv file properties:
- `enableSaveCsv` (`true`, `false` default) - Adds a button to save the data to a local csv file.
- `csvFileName` (default `data.csv`) - Default name of the csv file.

Table styling:
- `enableResponsive` (`true` default, `false`) - Enable bootstrap responsive table (suitable for mobile devices).
- `tableClass` (default `table table-striped table-bordered table-hover`) - Css class to apply to the table;

Customizing Cells
- `error` (null default) - If set, displays the specified error message at the top of the table.
- `heading` (null default) - If set, displays the specified heading message at the top of the table.
- `cdkDropList`  - Reference to a cdkDropList for the table.  A drop will trigger the `onDrop` event.  See [material](https://material.angular.io/cdk/drag-drop/examples) for documentation on drag/drop.

The templates objects can be populated using `ng-template` tags within the `dexih-table` selection, as in the following sample:

```xml
<dexih-table 
    [enableMultiSelect]="true" 
    [columns]="columns" 
    [tableData]="tableData">

    <ng-template #actions let-items="items">
        <!-- items contains an array of selected items -->
        <button class="btn btn-primary" (click)="selectedItems(items)">any items</button>
    </ng-template>

    <ng-template #rowAction select="rowAction" let-item="item">
        <!-- item contains the current row -->
        <button class="btn btn-primary" (click)="selectedItems(items)">selected items</button>
    </ng-template>

    <ng-template #rowStatus select="rowStatus" let-item="item">
        <!-- item contains the current row -->
        row status - {{status[item]}}
    </ng-template>

    <ng-template #selectedItemAction select="selectedItemAction" let-item="item">
        <!-- item contains the selected row -->
        <button class="btn btn-primary" (click)="selectedItem(item)">single item</button>
    </ng-template>

    <ng-template #selectedItemsAction select="selectedItemsAction" let-items="items">
        <!-- items contains an array of the selected items -->
        <button class="btn btn-primary" (click)="selectedItems(items)">selected items</button>
    </ng-template>

    <ng-template #cell select="cell" let-item="item" let-column="column" let-value="value">
        <!-- items contains an array of the selected items, the column references the column & value is the formatted cell value -->
        {{value}}
    </ng-template>

</dexih-table>
```

## Table Events

The following events can be used to response to table actions:

- `rowClick` (item containing row) - called when a row is clicked (excluding: checkbox, rowAction, rowStatus) column
- `onSelectedChange` (item containing selected items) - called when a row selection changes.
- `onSortChanged` (array of sorted items) - called when a manual drag/drop sort is completed.
- `onSortChanged` (array of sorted items) - called when a manual drag/drop sort is completed.
- `onDrop` (drop data) - called when data is dropped on the table.  Passes the event data from the cdkDropList event.

Events are used as follows in the `dexih-table` declaration:

```xml
<dexih-table 
    (rowClick)="selectedItem($event)"
    (onSelectedChange)="selectedItem($event)"
    (onSortChanged)="selectedItem($event)"
    >
</dexih-table>
```

Drag and drop can be used as follows:

```xml
<div cdkDropList [cdkDropListConnectedTo]="[listOne.cdkDropList]" cdkDropListData="drop data">
    <div cdkDrag >
        <button class="btn btn-primary">
            drag this to table.
        </button>
    </div>
</div>

<dexih-table [dataObservable]="tableData" (onDrop)="dropped($event)" [enableSort]="true" [enableManualSort]="true" #listOne heading="droppable table">
 </dexih-table>
 ```
## Credits

Thanks to the following projects:

* [jvandemo/generator-angular2-library](https://github.com/jvandemo/generator-angular2-library) - used as the baseline to package and distribute this library.
* [ngx-md](https://github.com/dimpu/ngx-md) - used for rendering markdown text.

## License

MIT © [Data Experts Group](mailto:gholland@dataexpertsgroup.com)
