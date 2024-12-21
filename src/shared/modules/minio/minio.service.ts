import { Injectable } from '@nestjs/common';
import { Client, CopyConditions } from 'minio';
import { BufferedFile } from './minio.types';
import { v4 as uuidv4 } from 'uuid';
import { turkishToEnglish } from './minio.helper';

@Injectable()
export class MinioService {
  private minio: Client;
  constructor() {
    this.minio = new Client({
      endPoint: process.env?.MINIO_ENDPOINT,
      port: parseInt(process.env?.MINIO_PORT),
      useSSL: process.env?.MINIO_USE_SSL === 'true',
      accessKey: process.env?.MINIO_ACCESS_KEY,
      secretKey: process.env?.MINIO_SECRET_KEY,
    });
  }

  async uploadFile(
    file: BufferedFile,
    unique = true,
    pathname = '',
  ): Promise<{
    statusCode: number;
    message: string;
  }> {
    const timestamp = Date.now().toString();
    const hashedFileName = uuidv4() + timestamp;
    file.originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    );
    if (pathname === '/') {
      pathname = process.env?.MINIO_ROOT_FOLDER + '/';
    }

    const extension = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );

    let fileName = pathname;
    if (unique) {
      fileName = fileName + hashedFileName + extension;
    } else {
      fileName = fileName + turkishToEnglish(file.originalname);
    }

    try {
      await this.minio.putObject(
        process.env.MINIO_BUCKET,
        fileName,
        file.buffer,
        file.size,
        {
          'Content-Type': file.mimetype,
        },
      );
    } catch (error) {
      console.log(error);
    }

    return {
      statusCode: 200,
      message: fileName,
    };
  }

  async createFolder(folderPath: string): Promise<any> {
    const ziroByteFile = Buffer.allocUnsafe(0);
    return await this.minio.putObject(
      process.env.MINIO_BUCKET,
      `${folderPath}/.dir`,
      ziroByteFile,
      0,
    );
  }

  async deleteObject(remoteBucket: string, uploadName: string): Promise<any> {
    try {
      if (uploadName.endsWith('.')) {
        return await this.minio.removeObject(remoteBucket, uploadName);
      } else {
        return await this.minio.removeObjects(
          remoteBucket,
          await this.getFolderData(uploadName),
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async renameObject(
    sourceBucket: string,
    newObject: string,
    oldObject: string,
  ): Promise<void> {
    const conditions = new CopyConditions();
    try {
      await this.minio.copyObject(
        sourceBucket,
        newObject,
        `/${sourceBucket}/${oldObject}`,
        conditions,
      );
      await this.deleteObject(sourceBucket, oldObject);
    } catch (error) {
      console.log(error);
    }
  }

  async getFile(bucket: string, objectName: string): Promise<any> {
    return await this.minio.getObject(bucket, objectName);
  }

  transformMinioDataToTarget(inputData: any) {
    const transformedItems = [];
    inputData.forEach(
      (item: {
        name: string;
        lastModified: Date;
        etag: string;
        size: number;
      }) => {
        if (item.name.startsWith(process.env?.MINIO_ROOT_FOLDER + '/')) {
          const parts = item.name.split('/');
          const itemName = parts.pop();
          let currentLevel = transformedItems;

          parts.forEach((part: any) => {
            let folder = currentLevel.find((folder) => folder.name === part);
            if (!folder) {
              folder = {
                name: part,
                isDirectory: true,
                items: [],
              };
              currentLevel.push(folder);
            }
            currentLevel = folder.items;
          });

          currentLevel.push({
            name: itemName,
            isDirectory: false,
            size: item.size,
            url: `${process.env.APP_URL}/api/openoffice/cdn/${process.env.MINIO_BUCKET}?filePath=${item.name}`,
          });
        }
      },
    );
    return transformedItems;
  }

  async listObjects(transformMinioDataToTarget = true): Promise<any> {
    try {
      const objectsStream = this.minio.listObjects(
        process.env.MINIO_BUCKET,
        '',
        true,
      );
      const objectsList = [];

      objectsStream.on('data', (obj) => {
        objectsList.push(obj);
      });
      let res = await new Promise((resolve, reject) => {
        objectsStream.on('end', () => {
          resolve(objectsList);
        });

        objectsStream.on('error', (err) => {
          reject(err);
        });
      });

      if (transformMinioDataToTarget)
        res = this.transformMinioDataToTarget(res);

      return res;
    } catch (err) {
      throw err;
    }
  }

  private async getFolderData(folderPath: string): Promise<any> {
    const getListObjects: {
      name: string;
      lastModified: Date;
      etag: string;
      size: number;
    }[] = await this.listObjects(false);

    return getListObjects.filter((item) => item.name.startsWith(folderPath));
  }
}
