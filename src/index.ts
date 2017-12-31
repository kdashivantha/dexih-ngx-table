import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { BsDropdownModule } from 'ngx-bootstrap';
import { DexihTableComponent } from './dexih-table.component';
import { DexihTableCellComponent } from './dexih-table-cell.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    DndModule.forRoot(),
  ],
  declarations: [
    DexihTableComponent,
    DexihTableCellComponent,
  ],
  exports: [
    DexihTableComponent,
  ]
})
export class DexihTableModule {
}
