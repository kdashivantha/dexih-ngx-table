/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { DexihTableModule }  from 'dexih-ngx-table';

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
      { name: 'intValue', title: 'Int Value', format: '' },
      { name: 'stringValue', title: 'String Value', format: '' },
      { name: 'dateValue', title: 'Date Value', format: 'Date' },
      { name: 'timeValue', title: 'Time Value', format: 'Time' },
      { name: 'boolValue', title: 'Bool Value', format: 'Boolean' },
      { name: 'codeValue', title: 'Code Value', format: 'Code' },
  ];

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
