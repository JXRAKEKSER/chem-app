import multer from "multer";

const storage = multer.memoryStorage();

const formDataParser = multer({ storage });

const oneFieldParser = (fieldName: string, isMultiparse = false) => {
  // isMultiparse - опция для парсинга нескольких изображений на одном поле
  if (isMultiparse) {
    return formDataParser.array(fieldName);
  }
  return formDataParser.single(fieldName);
};

export { oneFieldParser };
