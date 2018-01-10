import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
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


describe('DexihTableComponentTest', () => {
  let comp:    DexihTableComponent;
  let fixture: ComponentFixture<DexihTableComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//         declarations: [DraggableComponent, DroppableComponent, DraggableHandleComponent, DexihTableComponent],
//         providers: [DragDropConfig, DragDropService]
//     });
//     TestBed.compileComponents();
// });

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

      de = fixture.debugElement.query(By.css('.no-padding'));
      el = de.nativeElement;
    });

    it('should display waiting', () => {
      fixture.detectChanges();
      const content = el.textContent;
      expect(el).toBeDefined();
    });

});

