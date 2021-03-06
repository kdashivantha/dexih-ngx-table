/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgxMdModule } from 'ngx-md';
import { NgModule, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Observable, BehaviorSubject } from 'rxjs';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';

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
      public markdownFooter: string,
      public charArray: string[],
      public childNodes: ChildModel[]
  ) {}
}

class ChildModel {
  constructor(
    public child1: string,
    public child2: string,
    public child3: string
  ) {}
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class AppComponent implements OnInit, AfterViewInit {
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
    { name: 'charArray', title: 'Char Array', format: 'CharArray'},
    { name: 'childNodes', title: 'Node', format: 'Node', childColumns: [
      { name: 'child1', title: 'child1', format: '' },
      { name: 'child2', title: 'child2', format: '' },
      { name: 'child3', title: 'child3', format: '' },
    ]}
  ];

  private _tableData = new BehaviorSubject<Array<DataModel>>(null);
  tableData: Observable<Array<DataModel>> = this._tableData.asObservable();

  public dataEmpty: string[] = [];
  public delayedData: any[] = null;

  private _arrayData = new BehaviorSubject<string[][]>(null);
  arrayData: Observable<string[][]> = this._arrayData.asObservable();
  public arrayColumns: Array<any>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.arrayColumns = [
      { name: 0, title: 'col1' },
      { name: 1, title: 'col2' },
      { name: 2, title: 'col3' },
    ];

    let arrayData = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
    this._arrayData.next(arrayData);

    let date = new Date();

    let childNodes = [new ChildModel('child1', 'child2', 'child3'), new ChildModel('r2child1', 'r2child2', 'r2child3')];

    let data = new Array<DataModel>();
    data.push(new DataModel(1, 'row3', 'row 1 footer', 'row 1 header', new Date(date.getTime() + 30000), date,
      true, '<b>bold 1</b>', 'tip 1', 'fa fa-spin fa-cog', 'markdown **bold**', 'footer **bold**', ['a', 'b', 'c'],
      childNodes));
    data.push(new DataModel(2, 'row2', 'row 2 footer', 'row 2 header', new Date(date.getTime() + 300000), date,
      true, '<b>bold 1</b>', 'tip 2', 'fa fa-spin fa-cog', null, null, ['a', 'b', 'c'], childNodes));
    data.push(new DataModel(3, 'row1', 'row 3 footer', 'row 3 header', new Date(date.getTime() + 3000000), date,
      true, '<b>bold 1</b>', 'tip 3', 'fa fa-spin fa-cog', 'markdown **bold 2** [link](http://google.com)',
        'footer2 **bold** [link](http://google.com)', ['a', 'b', 'c'], childNodes));

    this._tableData.next(data);

    setTimeout(() => {
        this.delayedData = [];

        setTimeout(() => {
          this.delayedData = data;
        }, 5000);
    }, 5000);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  public selectedItems(items: Array<DataModel>) {
    window.alert('selected ' + items.map(c => c.intValue).join(', ') )
  }

  public selectedItem(item:  DataModel) {
    window.alert('selected ' + item.intValue )
  }

  dropped(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      alert('ISSUE: same container');
    } else {
      alert(`insert row: ${event.currentIndex} data: ${event.previousContainer.data}`);
    }
  }
}



@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [ AppComponent ],
    imports: [
      BrowserModule,
      DexihTableModule,
      NgxMdModule.forRoot(),
      DragDropModule
    ]
  })
  class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
