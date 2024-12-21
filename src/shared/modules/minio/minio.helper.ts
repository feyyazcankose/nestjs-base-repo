import { BufferedFile } from './minio.types';

export function getFileInfo(
  buffer: Buffer | string,
  fileName: string,
): BufferedFile {
  const encoding = detectEncoding(buffer);
  const size = buffer.length;

  return {
    fieldname: fileName.split('.')[0],
    originalname: fileName,
    encoding,
    mimetype: 'application/json',
    size,
    buffer: buffer,
  };
}

function detectEncoding(buffer) {
  // Buffer'ın içindeki bazı popüler encodingleri kontrol edelim
  if (buffer.indexOf(Buffer.from('\u00ff\u00fe')) === 0) {
    return 'utf-16le';
  } else if (buffer.indexOf(Buffer.from('\u00fe\u00ff')) === 0) {
    return 'utf-16be';
  } else if (buffer.indexOf(Buffer.from('\u0000\u00ff\u0000\u00fe')) === 0) {
    return 'utf-32le';
  } else if (buffer.indexOf(Buffer.from('\u00fe\u0000\u00ff\u0000')) === 0) {
    return 'utf-32be';
  } else {
    return 'utf-8'; // Varsayılan olarak utf-8 kabul edelim
  }
}

export function turkishToEnglish(input: string) {
  return input
    .replace(/Ğ/gim, 'G')
    .replace(/Ü/gim, 'u')
    .replace(/Ş/gim, 's')
    .replace(/İ/gim, 'i')
    .replace(/Ö/gim, 'o')
    .replace(/Ç/gim, 'c')
    .replace(/ğ/gim, 'g')
    .replace(/ü/gim, 'u')
    .replace(/ş/gim, 's')
    .replace(/ı/gim, 'i')
    .replace(/ö/gim, 'o')
    .replace(/ç/gim, 'c')
    .replace(/ /gim, '_');
}
