"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileCreator {
    constructor(headers, rows) {
        this.headers = headers;
        this.rows = rows;
    }
    generateCsvContent() {
        const columnsCount = this.headers.length;
        const items = [...this.headers, ...this.rows];
        let counter = 0;
        const content = items.reduce((labels, currentLabel) => {
            counter++;
            if (counter === columnsCount) {
                counter = 0;
                return `${labels},${currentLabel}\n`;
            }
            return `${labels},${currentLabel}`;
        }, "");
        return content;
    }
    createCsv() {
        const content = this.generateCsvContent();
        return Buffer.from(content, "utf-8");
    }
}
/* const fileCreator = new FileCreator(
  ["a", "b", "c"],
  ["dima", "kolya", "vpiska", "adad"]
); */
exports.default = FileCreator;
