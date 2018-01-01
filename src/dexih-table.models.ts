export class TableItem {
    constructor(
        public index,
        public sortValue: any,
        public isSelected: boolean,
        public isFiltered: boolean) {
    }
}

export class Column {
    public name: any;
    public title: string;
    public format: string;
    public alignment: string;
    public class: string;
    public control: string;
    public iconClass: string;
}
