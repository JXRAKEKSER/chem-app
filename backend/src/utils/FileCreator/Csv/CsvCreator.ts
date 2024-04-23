import { IFileCreator } from '../types';

export type csvData = {
  headers: string[],
  rows: string[],
};

class CsvCreator implements IFileCreator<csvData> {

  private generateCsvContent(headers: string[], rows: string[]): string {
    const columnsCount = headers.length;
    const items = [...headers, ...rows];
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

  public createFile(data: csvData): Buffer {
    const { headers, rows } = data;
    const content = this.generateCsvContent(headers, rows);
    return Buffer.from(content, "utf-8");
  }
}

export default CsvCreator;
