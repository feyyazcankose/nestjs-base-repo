import { Controller } from '@nestjs/common';

export function DashboardController(prefix: string): ClassDecorator {
  return Controller(`api/dashboard/${prefix}`);
}

export function MobileController(prefix: string): ClassDecorator {
  return Controller(`api/mobile/${prefix}`);
}
