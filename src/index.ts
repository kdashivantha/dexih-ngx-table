import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { DexihTableComponent } from './dexih-table.component';
import { DexihTableCellComponent } from './dexih-table-cell.component';
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
