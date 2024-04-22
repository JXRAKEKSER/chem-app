interface IFileCreator<T> {
    createFile(data: T): Buffer;
};

export { IFileCreator };
