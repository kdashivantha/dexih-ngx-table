/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import {DndModule} from 'ng2-dnd';
import { NgxMdModule } from 'ngx-md';
import { NgModule, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Observable, BehaviorSubject } from 'rxjs';

// bug: uncomment this when running playground.
// import { DexihTableModule,  Column  }  from 'dexih-ngx-table';
// uncomment this when running tests.
import { DexihTableModule,  Column  }  from '../src';

class DataModel {
  constructor(
      public intValue: number,
      public stringValue: string,
      public footerValue: string,
      public headerValue: string,
      public dateValue: Date,
      public timeValue: Date,
      public boolValue: boolean,
      public codeValue: string,
      public toolTip: string,
      public icon: string,
      public markdown: string,
      public markdownFooter: string
  ) {}
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class AppComponent implements OnInit {
  title: string;

  columns = [
    { title: 'Icon', iconClass: 'icon', tooltip: 'toolTip', width: '1%', align: 'center' },
    { name: 'intValue', title: 'Int', format: '' },
    { name: 'stringValue', title: 'String', format: '', footer: 'footerValue', header: 'headerValue' },
    { name: 'dateValue', title: 'Countdown', format: 'Countdown' },
    { name: 'dateValue', title: 'Date/Time', format: 'DateTime' },
    { name: 'dateValue', title: 'Date', format: 'Date' },
    { name: 'timeValue', title: 'Time', format: 'Time' },
    { name: 'boolValue', title: 'Bool', format: 'Boolean' },
    { name: 'codeValue', title: 'Code', format: 'Code' },
    { name: 'codeValue', title: 'Html', format: 'Html' },
    { name: 'markdown', title: 'Markdown', format: 'Md', footer: 'markdownFooter' },
  ];

  private _tableData = new BehaviorSubject<Array<DataModel>>(null);
  tableData: Observable<Array<DataModel>> = this._tableData.asObservable();

  public dataEmpty: string[] = [];
  public delayedData: any[] = null;

  private _arrayData = new BehaviorSubject<string[][]>(null);
  arrayData: Observable<string[][]> = this._arrayData.asObservable();
  public arrayColumns: Array<any>;

  ngOnInit() {
    this.arrayColumns = [
      { name: 0, title: 'col1' },
      { name: 1, title: 'col2' },
      { name: 2, title: 'col3' },
    ];

    let arrayData = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
    this._arrayData.next(arrayData);

    let date = new Date();

    let data = new Array<DataModel>();
    data.push(new DataModel(1, 'row3', 'row 1 footer', 'row 1 header', new Date(date.getTime() + 30000), date,
      true, '<b>bold 1</b>', 'tip 1', 'fa fa-spin fa-cog', 'markdown **bold**', 'footer **bold**'));
    data.push(new DataModel(2, 'row2', 'row 2 footer', 'row 2 header', new Date(date.getTime() + 300000), date,
      true, '<b>bold 1</b>', 'tip 2', 'fa fa-spin fa-cog', null, null));
    data.push(new DataModel(3, 'row1', 'row 3 footer', 'row 3 header', new Date(date.getTime() + 3000000), date,
      true, '<b>bold 1</b>', 'tip 3', 'fa fa-spin fa-cog', 'markdown **bold 2** [link](http://google.com)',
        'footer2 **bold** [link](http://google.com)'));

    this._tableData.next(data);

    setTimeout(() => {
        this.delayedData = [];

        setTimeout(() => {
          this.delayedData = data;
        }, 5000);
    }, 5000);
  }

  public selectedItems(items: Array<DataModel>) {
    window.alert('selected ' + items.map(c => c.intValue).join(', ') )
  }

  public selectedItem(item:  DataModel) {
    window.alert('selected ' + item.intValue )
  }

  public dropped(item: any) {
    window.alert('dropped: ' + item.dragData);
  }
}


@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [ AppComponent ],
    imports: [
      BrowserModule,
      DexihTableModule,
      DndModule.forRoot(),
      NgxMdModule.forRoot()
    ]
  })
  class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
