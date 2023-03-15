import { Customer } from "./customer";
import { CustomerFileWriterInterface } from "./CustomerFileWriterInterface";
import { FileWriter } from "./file-system";

export class CustomerCsvFileWriter implements CustomerFileWriterInterface {
  constructor(private fileWriter: FileWriter) {}

  public writeCustomers(fileName: string, customers: Customer[]) {
    if (!fileName || fileName.length < 1) {
      throw new Error("filename is empty string");
    }

    if (customers === null) {
      throw new Error("customers is null");
    }

    for (const customer of customers) {
      this.fileWriter.writeLine(fileName, this.formatAsCsvRow(customer));
    }
  }

  private formatAsCsvRow(customer: Customer): string {
    return `${customer.name},${customer.contactNumber}`;
  }
}
