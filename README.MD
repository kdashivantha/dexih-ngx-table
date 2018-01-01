# dexih-ngx-table

dexih-ngx-table is an Angular (2+) component for building data driven tables.

## Features

* Global Search/Filtering.
* Column sorting (ascdending/descending)
* Custom column formatting (such as string, numeric, date, code etc.)
* Row single/multi selection with dynamic/hidden button selection.
* Multiple template sections for user customization.
* Drap and drop row ordering.
* Automatic save to csv file.


## Installation

To install this library, run:

```bash
$ npm install dexih-ngx-table --save
```

## Example

Create an array containing the data:

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

For a quick demo and sample code refer to the following [plnkr](http://plnkr.co/edit/uyPfy4930iI0E0aPv0Mi?p=preview).

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install dexih-ngx-table
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { DexihTableModule } from 'dexih-ngx-table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Import the TableModule
    DexihTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
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

Columns can be formatted in the table by passing an array of type `Column` to the table component through the `columns` property.  If the `columns` property is not set the columns will be the names of each property in in the data row.

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
- `format` - if empty no formatting is done.  Otherwise:
  - `Date` - formats as local date/time.
  - `Time` - formats as local time.
  - `Boolean` - formats as a checkbox.
  - `Code` - formats code.
- `width` - the width to apply to the table column (e.g. 10%, 100px).
- `align` (`left`, `centre`, `right`) - the text alignment for the column.

The following properties reference an property in the data row and are defined on a row by row basis:
- `name` - value populate the cell (this can be html formatted).
- `toolTip` - value use as a tooltip for the cell.
- `class` - value to use as a css class for the cell.
- `iconClass` - the data property to use as a icon (note: this will be place before the `name`)

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

The following properties can be used enable `template` areas of the table which can be customized with user controls:

- `enableActions` (`true` default) - Displays a row actions section which is the first position on the top left of the table.  This can be used for actions such as `New`.
- `enableMultiSelectActions` (`true`, `false` default) - Displays a mutli-select section on the top left of the table, when one (or more) items are selected.  This can be used for actions allowed on multiple items such as `Delete`.
- `enableSingleSelectActions` (`true` default, `false`) - Displays a single-select section on the top left of the table, when one item is selected.  This can be used for actions allowed one row only such as `Open`.
- `enableRowActions` (`true`, `false` default) - Enables a section on the first cell (or after the checkbox) of the table, which can be used for custom controls.
- `enableRowStatus` (`true`, `false` default) - Enables a section (after the rowAction) which can be used for custom controls.

The templates objects can be populated using `ng-template` tags within the `dexih-table` selection, as in the following sample:

```xml
<dexih-table 
    [enableMultiSelect]="true" 
    [enableRowActions]="false" 
    [enableRowStatus]="true" 
    [enableSingleSelectActions]="true" 
    [enableMultiSelectActions]="true" 
    [columns]="columns" 
    [tableData]="tableData">

    <ng-template #actions let-items="items">
        <!-- items contains an array of selected items -->
        <button class="btn btn-primary" (click)="selectedItems(items)">any items</button>
    </ng-template>

    <ng-template #rowAction select="rowAction" let-item="item">
        <!-- item contains the current row -->
        <button class="btn btn-primary" (click)="selectedItems(items)">seleted items</button>
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
        <button class="btn btn-primary" (click)="selectedItems(items)">seleted items</button>
    </ng-template>

</dexih-table>
```

## Table Events

The following events can be used to response to table actions:

- `rowClick` (item containing row) - called when a row is clicked (excluding: checkbox, rowAction, rowStatus) column
- `selectedItemsChange` (item containing selected items) - called when a row selection changes.
- `onSortChanged` (array of sorted items) - called when a manual drag/drop sort is completed.

Events are used as follows in the `dexih-table` declaration:

```xml
<dexih-table 
    (rowClick)="selectedItem($event)"
    (selectedItemsChange)="selectedItem($event)"
    (onSortChanged)="selectedItem($event)"
    >
</dexih-table>
```

## Credits

Thanks to the [jvandemo/generator-angular2-library](https://github.com/jvandemo/generator-angular2-library) which was used as the baseline to package and distribute this library.

## License

MIT © [Data Experts Group](mailto:gholland@dataexpertsgroup.com)
