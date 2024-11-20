import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
    //fot test
  @Get('excel-download')
  async downloadExcel(@Res() res: Response) {
    const { filename, buffer } =
      await this.busAvailabilityService.downloadExcel();
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename=${filename}`,
    });

    res.send(buffer);
  }
}
