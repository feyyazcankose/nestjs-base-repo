import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import * as Handlebars from 'handlebars';
import axios from 'axios';
import { DocMenu, EDescription, EPath } from './docs.enum';

@Injectable()
export class DocService {
  public async getDocument(type?: string) {
    const template = this.getHandlebars();
    const title = `${this.capitalizeFirstLetter(type)} | ${
      process.env.APP_TITLE
    } Api Doc`;

    const swaggerJson = await this.getSwaggerJson();
    if (type !== 'filter') {
      swaggerJson.info = {
        title: title,
        description: EDescription[type],
      };
    }

    const enumType = EPath[type?.toLowerCase()];
    const jsonData = JSON.stringify(
      enumType ? this.filterByPath(swaggerJson, enumType) : swaggerJson,
    );

    const menu = (DocMenu?.[type] ?? []).map((item) => {
      return {
        ...item,
        active: item.key === type,
      };
    });

    const data = {
      jsonData,
      title,
      menuItems: menu,
      currentPath: `/api/doc/${type}`,
      key: type,
    };

    return template(data);
  }

  private getHandlebars(
    templateName = 'doc.hbs',
  ): HandlebarsTemplateDelegate<any> {
    const templateFile = fs.readFileSync(
      join(process.cwd(), 'src/shared/views', templateName),
      'utf8',
    );
    return Handlebars.compile(templateFile);
  }

  private async getSwaggerJson(): Promise<any> {
    const username = process.env.API_DOC_USER;
    const password = process.env.API_DOC_PASS;
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    const apiUrl = `${process.env.APP_URL}${process.env.API_DOC_PATH}-json`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Unable to fetch Swagger JSON');
    }
  }

  // Path'e göre Swagger dökümantasyonunu filtrele
  private filterByPath(swaggerJson: any, pathKey: string): any {
    const filteredPaths = {};

    Object.keys(swaggerJson.paths).forEach((path) => {
      // Eğer path, enum'daki değeri içeriyorsa ekle
      if (path.includes(pathKey)) {
        filteredPaths[path] = swaggerJson.paths[path];
      }
    });

    return { ...swaggerJson, paths: filteredPaths };
  }

  private capitalizeFirstLetter(type: string | null) {
    if (type) return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
    return '';
  }
}
