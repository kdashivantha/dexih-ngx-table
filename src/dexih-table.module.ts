import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMdModule } from 'ngx-md';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DexihTableCellComponent } from './dexih-table-cell.component';
import { DexihTableComponent } from './dexih-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgxMdModule, // .forRoot(),
    DragDropModule
  ],
  declarations: [
    DexihTableComponent,
    DexihTableCellComponent
  ],
  exports: [
    DexihTableComponent
  ],
  providers: []
})
export class DexihTableModule {

}
