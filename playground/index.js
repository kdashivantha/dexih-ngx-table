"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is only for local test
 */
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var Rx_1 = require("rxjs/Rx");
var src_1 = require("../src");
var DataModel = /** @class */ (function () {
    function DataModel(intValue, stringValue, dateValue, timeValue, boolValue, codeValue, toolTip, icon) {
        this.intValue = intValue;
        this.stringValue = stringValue;
        this.dateValue = dateValue;
        this.timeValue = timeValue;
        this.boolValue = boolValue;
        this.codeValue = codeValue;
        this.toolTip = toolTip;
        this.icon = icon;
    }
    return DataModel;
}());
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.columns = [
            { title: 'Icon', iconClass: 'icon', tooltip: 'toolTip', width: '1%', align: 'center' },
            { name: 'intValue', title: 'Int', format: '' },
            { name: 'stringValue', title: 'String', format: '' },
            { name: 'dateValue', title: 'Countdown', format: 'Countdown' },
            { name: 'dateValue', title: 'Date/Time', format: 'DateTime' },
            { name: 'dateValue', title: 'Date', format: 'Date' },
            { name: 'timeValue', title: 'Time', format: 'Time' },
            { name: 'boolValue', title: 'Bool', format: 'Boolean' },
            { name: 'codeValue', title: 'Code', format: 'Code' },
            { name: 'codeValue', title: 'Html', format: 'Html' },
        ];
        this._tableData = new Rx_1.BehaviorSubject(null);
        this.tableData = this._tableData.asObservable();
        this.dataEmpty = [];
        this._arrayData = new Rx_1.BehaviorSubject(null);
        this.arrayData = this._arrayData.asObservable();
    }
    AppComponent.prototype.ngOnInit = function () {
        this.arrayColumns = [
            { name: 0, title: 'col1' },
            { name: 1, title: 'col2' },
            { name: 2, title: 'col3' },
        ];
        var arrayData = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
        this._arrayData.next(arrayData);
        var date = new Date();
        var data = new Array();
        data.push(new DataModel(1, 'row3', new Date(date.getTime() + 30000), date, true, '<b>bold 1</b>', 'tip 1', 'fa fa-spin fa-cog'));
        data.push(new DataModel(2, 'row2', new Date(date.getTime() + 300000), date, true, '<b>bold 1</b>', 'tip 2', 'fa fa-spin fa-cog'));
        data.push(new DataModel(3, 'row1', new Date(date.getTime() + 3000000), date, true, '<b>bold 1</b>', 'tip 3', 'fa fa-spin fa-cog'));
        this._tableData.next(data);
    };
    AppComponent.prototype.selectedItems = function (items) {
        window.alert('selected ' + items.map(function (c) { return c.intValue; }).join(', '));
    };
    AppComponent.prototype.selectedItem = function (item) {
        window.alert('selected ' + item.intValue);
    };
    AppComponent = __decorate([
        core_2.Component({
            selector: 'app-root',
            templateUrl: 'app.html'
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [AppComponent],
            declarations: [AppComponent],
            imports: [platform_browser_1.BrowserModule, src_1.DexihTableModule]
        })
    ], AppModule);
    return AppModule;
}());
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
