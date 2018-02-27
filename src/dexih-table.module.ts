import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { MarkdownModule } from 'ngx-md';

import { DexihTableCellComponent } from './dexih-table-cell.component';
import { DexihTableComponent } from './dexih-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    DndModule.forRoot(),
    MarkdownModule.forRoot(),
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
