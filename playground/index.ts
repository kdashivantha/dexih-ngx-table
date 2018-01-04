/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { DexihTableModule,  Column  }  from '../src';

class DataModel {
  constructor(
      public intValue: number,
      public stringValue: string,
      public dateValue: Date,
      public timeValue: Date,
      public boolValue: boolean,
      public codeValue: string,
      public toolTip: string,
      public icon: string
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
    <Column> { name: 'intValue', title: 'Int', format: '' },
    <Column> { name: 'stringValue', title: 'String', format: '' },
    <Column> { name: 'dateValue', title: 'Countdown', format: 'Countdown' },
    <Column> { name: 'dateValue', title: 'Date/Time', format: 'DateTime' },
    <Column> { name: 'dateValue', title: 'Date', format: 'Date' },
    <Column> { name: 'timeValue', title: 'Time', format: 'Time' },
    <Column> { name: 'boolValue', title: 'Bool', format: 'Boolean' },
    <Column> { name: 'codeValue', title: 'Code', format: 'Code' },
    <Column> { name: 'codeValue', title: 'Html', format: 'Html' },
  ];

  private _tableData = new BehaviorSubject<Array<DataModel>>(null);
  tableData: Observable<Array<DataModel>> = this._tableData.asObservable();

  public dataEmpty: string[] = [];

  ngOnInit() {
    let date = new Date();

    let data = new Array<DataModel>();
    data.push(new DataModel(1, 'row3', new Date(date.getTime() + 30000), date,
      true, '<b>bold 1</b>', 'tip 1', 'fa fa-spin fa-cog'));
    data.push(new DataModel(2, 'row2', new Date(date.getTime() + 300000), date,
      true, '<b>bold 1</b>', 'tip 2', 'fa fa-spin fa-cog'));
    data.push(new DataModel(3, 'row1', new Date(date.getTime() + 3000000), date,
      true, '<b>bold 1</b>', 'tip 3', 'fa fa-spin fa-cog'));

    this._tableData.next(data);
  }

  public selectedItems(items: Array<DataModel>) {
    window.alert('selected ' + items.map(c => c.intValue).join(', ') )
  }

  public selectedItem(item:  DataModel) {
    window.alert('selected ' + item.intValue )
  }

}


@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [ AppComponent ],
    imports: [ BrowserModule, DexihTableModule ]
  })
  class AppModule {}

  platformBrowserDynamic().bootstrapModule(AppModule);
