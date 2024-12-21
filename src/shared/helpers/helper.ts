import { Request } from 'express';
import * as os from 'os';

import { RouteTree } from '@nestjs/core';

export function firstUpperCase(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export async function getRepository(entity) {
  return entity;
}

export function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

export function isMobile(userAgent: string) {
  if (
    userAgent.match(
      '@(iPad|iPod|iPhone|Android|BlackBerry|SymbianOS|SCH-Md+|Opera Mini|Windows CE|Nokia|SonyEricsson|webOS|PalmOS)@',
    )
  ) {
    return true;
  }
  return false;
}

export function getClientIP(request: Request): string {
  const xForwardedFor = request.headers['x-forwarded-for'];
  const xRealIP = request.headers['x-real-ip'];

  let clientIP = '';

  if (xForwardedFor) {
    // X-Forwarded-For başlığını kullanabilirsiniz
    clientIP = xForwardedFor.toString().split(',')[0];
  } else if (xRealIP) {
    // X-Real-IP başlığını kullanabilirsiniz
    clientIP = xRealIP.toString();
  } else {
    // Direkt olarak istemci IP'sini alabilirsiniz
    clientIP = request.ip;
  }

  return clientIP.split('::ffff:')[1] ?? '';
}

export function getMacAddress(): string {
  const networkInterfaces = os.networkInterfaces();
  const interfaces = Object.values(networkInterfaces);
  for (const iface of interfaces) {
    const macAddress = iface.find(
      (info) => info.mac !== '00:00:00:00:00:00' && !info.internal,
    );
    if (macAddress) {
      return macAddress.mac;
    }
  }
  throw new Error('MAC address not found.');
}

export function getClientAgent(request: Request): string {
  return request.get('User-Agent');
}

export function dateFormatter(date = null) {
  if (!date) date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function dateFormatterBt(year: any, day: any, month: any) {
  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;

  return `${year}-${month}-${day}`;
}

export const dateFormatBt = (day, month, year, hours, minutes) => {
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedHour = hours < 10 ? '0' + hours : hours;
  const formattedMinute = minutes < 10 ? '0' + minutes : minutes;

  return `${year}/${formattedMonth}/${formattedDay} ${formattedHour}:${formattedMinute}`;
};

export function getLangCode(request: Request) {
  const types = ['tr', 'en'];
  const lang = request.headers['accept-language'] ?? 'tr';
  return types.includes(lang) ? lang : 'tr';
}

export function maskMiddleCharacters(input: string): string {
  if (input?.length <= 5) {
    return input;
  }

  const prefixLength = Math.floor((input?.length - 5) / 2);
  const suffixLength = input?.length - 5 - prefixLength;

  const prefix = input?.substring(0, prefixLength);
  const suffix = input?.substring(input?.length - suffixLength);

  const maskedMiddle = '*'.repeat(5);

  return prefix + maskedMiddle + suffix;
}

export function generateRandomString(length = 10): string {
  const characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * charactersLength),
    );
  }
  return randomString;
}

export function removeNullItems(obj: any) {
  if (Array.isArray(obj)) {
    for (let i = obj.length - 1; i >= 0; i--) {
      if (!obj[i]?.name) {
        obj.splice(i, 1);
      } else {
        removeNullItems(obj[i]);
      }
    }
  } else if (typeof obj === 'object') {
    for (const key in obj) {
      if (obj[key]?.name) {
        delete obj[key];
      } else {
        removeNullItems(obj[key]);
      }
    }
  }

  return obj;
}

export function convertToSnakecase(name: string, replaces: string[]) {
  let rname = name;
  replaces.forEach((replace) => {
    rname = rname.replace(replace, '');
  });
  return rname
    .split(/(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('-');
}

export function moduleToRoute(
  mainPath: string,
  modules: any[],
  moduleM: any,
  converter: string[] = [''],
): RouteTree {
  return {
    path: mainPath,
    module: moduleM,
    children: [
      ...modules.map((m) => {
        if (m['route']) {
          return m['route'];
        }
        return {
          path: convertToSnakecase(m.name, ['Module', ...converter]),
          module: m,
        };
      }),
    ],
  };
}

export function isObjectEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function priceTextifier(number: number) {
  return number.toLocaleString('tr-TR', {
    style: 'decimal',
    minimumFractionDigits: 2,
  });
}

export const formatCurrency = (
  value: number,
  style: 'currency' | 'decimal' | 'percent',
) => {
  return new Intl.NumberFormat('tr-TR', {
    style: style,
    currency: 'TRY',
    minimumFractionDigits: 2,
  })
    .format(value)
    .split(',00')[0];
};
