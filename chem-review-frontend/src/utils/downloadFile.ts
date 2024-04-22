const downloadFile = (
  data: string | Blob,
  fileType: 'text/csv',
  fileName: string
) => {
  const fileBlob = new Blob([data], { type: fileType });
  const semLink = URL.createObjectURL(fileBlob);

  const downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  downloadLink.href = semLink;
  downloadLink.click();
  downloadLink.remove();

  URL.revokeObjectURL(semLink);
};

export { downloadFile };
