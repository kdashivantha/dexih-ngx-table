## Releases Summary

### Release 0.3.1

* Updated: When links within markdown tags a clicked, a new window/tab will be opened.

### Release 0.3.0.

* **Breaking** - Updated for Angular 6.  This version will not work with any versions less than Angular 6 (use version 0.2.x if you need angular 5x compatibility).
* ngx-md library must be updated to version 6 (add "ngx-md": "^6.0.0" to package.json).  Note: the ngx-md library has breaking change an import module name change from `MarkdownModule` to `NgxMdModule`
* There are changes in angular 6 around decorators, so I had to remove the forRoot() declarations in the module.  This caused trouble when loading modules from systemjs.config.js, however seemed ok when using a bootstrap loader.  If you're getting injection or null errors, try adding DndModule.forRoot(), NgxMdModule.forRoot() to your modules import.

### Release 0.2.0.

* Removed beta tag.
* Fixed minor version inconsistencies.

### Release 0.1.38-beta.

* Added support for Font Awesome v5.0.  For icons to appear in table either Font Awsome 5.0 or 4.7 must be referenced as per [issue](https://github.com/DataExperts/dexih-ngx-table/issues/2)
* Fixed issue with filter/sort as per [issue](https://github.com/DataExperts/dexih-ngx-table/issues/4)

### Release 0.1.37-beta.

* Breaking  - Remove enableActions, enableRowActions, enableRowStatus, enableRowStatus, enableMultiSelectActions, enableSingleSelectActions.  These sections now automatically appear when the template is declared

### Release 0.1.36-beta.

* Breaking  - Remove enableActions, enableRowActions, enableRowStatus, enableRowStatus, enableMultiSelectActions, enableSingleSelectActions.  These sections now automatically appear when the template is declared

### Release 0.1.33-beta.

* Fixed bootstrap 4 issues

### Release 0.1.32-beta.

* Fixed search for data in footer.

### Release 0.1.31-beta.

* Added footer property to cells.  

### Release 0.1.29-beta.

* Add double quotes around string values when exporting to csv.

### Release 0.1.28-beta.

* Fix issue when Md format is null

### Release 0.1.27-beta.

* Important: run `npm install ngx-md --save` when updating from previous version to add the markdown library to your project.
* Added markdown format.  

### Release 0.1.26-beta.

* Breaking: changed event name selectedItemsChange -> onSelectedChange
* Added drop functionality to table.

### Release 0.1.25-beta.

* Fix issue where "Loading" animation remained when loading to a zero row table.

### Release 0.1.24-beta.

* Breaking property change - [tableData] is now [dataObservable]
* Table now responsive (set enableResponsive = false for non-responsive table).


### Release 0.1.23-beta.

* Library is now AOT compatible.  Projects can now build with `ng build --prod` or `ng build --aot`.
* Added error and heading properties. 

### Release 0.1.22-beta.

This is the first `beta` tag and the library is not AOT compatible.  We will be staying with the `beta` tag until test coverage is completed over the next few months.