import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  
    //this is for testing
  async downloadExcel() {
    const citylist = await this.busAvailabilityRepository.getCityList();

    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('City List');

    // Define column headers
    worksheet.columns = [
      { header: 'City Name', key: 'name', width: 20 },
      { header: 'state Name', key: 'state', width: 15 },
      { header: 'latitude', key: 'latitude', width: 15 },
    ];

    // Add data to the worksheet
    citylist.forEach((city) => {
      worksheet.addRow({
        name: city.name,
        state: city.state,
        latitude: city.latitude,
      });
    });

    // Set response headers
    // For example, if you're using NestJS, you can return the generated Excel file as an attachment
    return {
      filename: 'city_list.xlsx',
      buffer: await workbook.xlsx.writeBuffer(),
    };
  }
}
