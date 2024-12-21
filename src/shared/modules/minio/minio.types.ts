export interface BufferedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  buffer: Buffer | string;
}

export interface StoredFile extends HasFile, StoredFileMetadata {}

export interface HasFile {
  file: Buffer | string;
}

export interface StoredFileMetadata {
  id: string;
  name: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  updatedAt: Date;
  fileSrc?: string;
}

export type AppMimeType =
  | 'image/png'
  | 'image/jpeg'
  | 'image/jpg'
  | 'application/pdf'
  | 'application/json'
  | 'application/json; charset=utf-8'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const AppMimeTypes =
  'image/png|image/jpeg|image/jpg|application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document|application/vnd.ms-excel|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|application/json; charset=utf-8|application/json';

export enum RemoteFileLocation {
  S3 = 'S3',
  MINIO = 'MINIO',
}
