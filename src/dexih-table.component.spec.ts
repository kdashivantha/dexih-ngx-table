import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { DexihTableComponent } from './dexih-table.component';

describe('DexihTableComponent', () => {

  let comp:    DexihTableComponent;
  let fixture: ComponentFixture<DexihTableComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DexihTableComponent ], // declare the test component
    });

    fixture = TestBed.createComponent(DexihTableComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('Should be false', () => {
    expect(false).toBe(true);
  });
});
