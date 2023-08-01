function blobToFile(theBlob: Blob, fileName: string) {
  const b: any = theBlob;
  b.lastModifiedDate = new Date();
  b.name = fileName;
  return theBlob as File;
}

export default blobToFile;
