import CsvCreator from "./CsvCreator";

const RESULTS = {
  createEmptyFile: {
    name: "create empty file",
    expextedData: Buffer.from(""),
  },
  createFullFile: {
    name: "create file",
    expextedData: Buffer.from(`,name,age\n,Dima,23\n,Liza,25\n,Vasya,38\n`),
  },
};

describe("Generate CSV", () => {
  it(RESULTS.createEmptyFile.name, () => {
    const headers: string[] = [];
    const rows: string[] = [];
    const csvCreator = new CsvCreator();
    const file = csvCreator.createFile({ headers, rows });
    expect(file).toEqual(RESULTS.createEmptyFile.expextedData);
  });
  it(RESULTS.createFullFile.name, () => {
    const headers: string[] = ['name', 'age'];
    const rows: string[] = ['Dima', '23', 'Liza', '25', 'Vasya', '38'];
    const csvCreator = new CsvCreator();
    const file = csvCreator.createFile({ headers, rows });
    
    expect(file).toEqual(RESULTS.createFullFile.expextedData);
  });
});
