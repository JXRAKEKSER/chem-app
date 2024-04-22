class FileCreator {
  private headers: string[];
  private rows: string[];
  constructor(headers: string[], rows: string[]) {
    this.headers = headers;
    this.rows = rows;
  }

  private generateCsvContent(): string {
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

  public createCsv(): Buffer {
    const content = this.generateCsvContent();
    return Buffer.from(content, "utf-8");
  }
}

/* const fileCreator = new FileCreator(
  ["a", "b", "c"],
  ["dima", "kolya", "vpiska", "adad"]
); */

export default FileCreator;
