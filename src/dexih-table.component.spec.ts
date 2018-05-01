import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, inject, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DexihTableModule,  Column  }  from '.';
import { DexihTableComponent  }  from './dexih-table.component';
import {
    DndModule,
    DragDropConfig,
    DragDropService,
    DraggableComponent,
    DraggableHandleComponent,
    DroppableComponent,
} from 'ng2-dnd';
import { Observable } from 'rxjs';


describe('DexihTableComponentTest', () => {
  let comp:    DexihTableComponent;
  let fixture: ComponentFixture<DexihTableComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      providers: [
      ],
      imports: [ BrowserModule, DexihTableModule ]
      })
    .compileComponents();  // compile template and css
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(DexihTableComponent);
      comp = fixture.componentInstance; // DexihTableComponent test instance
      fixture.detectChanges();
    });

    it('test - display data is loading', () => {

      // check the data is loading animation is visible
      de = fixture.debugElement.query(By.css('[name="dexih-data-loading"]'));
      expect(de).not.toBeNull();
      el = de.nativeElement;
      expect(el.textContent).toBe('Data is loading...');

      // check the table is not shown
      de = fixture.debugElement.query(By.css('[name="dexih-table"]'));
      expect(de).toBeNull();
    });

    describe('Tests with data', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(DexihTableComponent);
        comp = fixture.componentInstance; // DexihTableComponent test instance

        let arrayData = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
        comp.data = arrayData;
        fixture.detectChanges();
      });

      it('test - table is shown when data is available', () => {
        // check the data is loading animation is not visible
        de = fixture.debugElement.query(By.css('[name="dexih-data-loading"]'));
        expect(de).toBeNull();

        // check the table is shown
        de = fixture.debugElement.query(By.css('[name="dexih-table"]'));
        expect(de).not.toBeNull();
      });

      it('test - check column headings', () => {
        // check the column headings have default values
        let headings = de.queryAll(By.css('[name="dexih-column-heading"]'));
        expect(headings.length).toEqual(3);
        expect(headings[0].nativeElement.innerText.trim()).toEqual('[0]');
        expect(headings[1].nativeElement.innerText.trim()).toEqual('[1]');
        expect(headings[2].nativeElement.innerText.trim()).toEqual('[2]');
      });

      it('test - check data', () => {
        // check the column headings have default values
        let rows = de.queryAll(By.css('[name="dexih-table-row"]'));
        expect(rows.length).toEqual(3);
        let row = rows[0];
        let cells = row.queryAll(By.css('[name="dexih-table-cell"]'));
        expect(cells.length).toEqual(3);

        expect(cells[0].nativeElement.innerText.trim()).toEqual('a');
        expect(cells[1].nativeElement.innerText.trim()).toEqual('b');
        expect(cells[2].nativeElement.innerText.trim()).toEqual('c');
      });

      it('test - filter data', done => {
        de = fixture.debugElement.query(By.css('input[name="filterString"]'));
        expect(de).not.toBeNull();

        // adds an 'a' to the filter
        let input = de.nativeElement;
        input.value = 'a';
        input.dispatchEvent(new Event('input'));

        // delay before check, as the filter waits short period before updating table.
        Observable.interval(1000).first().subscribe(() => {
          fixture.detectChanges();

          // check the filter makes 1 row
          de = fixture.debugElement.query(By.css('[name="dexih-table"]'));
          let rows = de.queryAll(By.css('[name="dexih-table-row"]'));
          expect(rows.length).toEqual(1);

          // remove the filter, to check table returns to normal
          input.value = '';
          input.dispatchEvent(new Event('input'));

          Observable.interval(1000).first().subscribe(() => {
            fixture.detectChanges();
            let table = fixture.debugElement.query(By.css('[name="dexih-table"]'));
            rows = table.queryAll(By.css('[name="dexih-table-row"]'));
            expect(rows.length).toEqual(3);
            done();
          });
        });
      });

    });



});

