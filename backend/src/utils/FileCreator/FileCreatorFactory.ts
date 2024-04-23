import CsvCreator from "./Csv/CsvCreator";

export enum CREATOR_TYPES {
  CSV,
}

class FileCreatorFactory {
  public create(type: CREATOR_TYPES) {
    switch (type) {
      case CREATOR_TYPES.CSV:
        return new CsvCreator();
      default:
        // для статической проверки покрытия всех опций кейсами
        let _: never = type;
        throw new Error(`Передан несуществующий тип ${type}`);
    }
  }
}

export default new FileCreatorFactory();
