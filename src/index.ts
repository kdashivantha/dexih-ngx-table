import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';

import { DexihTableCellComponent } from './dexih-table-cell.component';
import { DexihTableComponent } from './dexih-table.component';

export { Column } from './dexih-table.models';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    DndModule.forRoot(),
  ],
  declarations: [
    DexihTableComponent,
    DexihTableCellComponent
  ],
  exports: [
    DexihTableComponent
  ]
})
export class DexihTableModule {
}
