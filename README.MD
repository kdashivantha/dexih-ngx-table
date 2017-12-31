# dexih-ngx-table

dexih-ngx-table is an Angular component for adding data driven tables to applications.

## Features

* Search filtering across the table.
* Column sorting (ascdending/descending)
* Column formatting (such as string, numeric, date, code etc.)
* Row single/multi selection with dynamic/hidden button selection.
* Drap and drop row sorting.
* Automatic save to csv file.


## Installation

To install this library, run:

```bash
$ npm install dexih-ngx-table --save
```

## Sample

For a quick demo and sample code see the plnkr here:
http://plnkr.co/edit/uyPfy4930iI0E0aPv0Mi?p=preview
 
## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install dexih-ngx-table
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { DexihTableModule } from 'dexih-ngx-table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Import the TableModule
    DexihTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<sampleComponent></sampleComponent>
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Gary Holland](mailto:gholland@dataexpertsgroup.com)
