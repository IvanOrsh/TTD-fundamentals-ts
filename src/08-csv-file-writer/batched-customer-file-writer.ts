import path from "path";

import { Customer } from "./customer";
import { CustomerFileWriterInterface } from "./CustomerFileWriterInterface";

export class BatchedCustomerFileWriter implements CustomerFileWriterInterface {
  constructor(
    private customerFileWriter: CustomerFileWriterInterface,
    private batchSize: number = 10
  ) {}

  public writeCustomers(fileName: string, customers: Customer[]) {
    if (customers.length <= this.batchSize) {
      return this.customerFileWriter.writeCustomers(fileName, customers);
    }

    let batchNumber = 1;

    for (let i = 0; i < customers.length; i += this.batchSize) {
      const batch = customers.slice(i, i + this.batchSize);
      const batchName = this.getBatchName(fileName, batchNumber);
      this.customerFileWriter.writeCustomers(batchName, batch);
      batchNumber++;
    }
  }

  private getBatchName(fileName: string, batchNumber: number): string {
    const ext = path.extname(fileName);
    const basename = path.basename(fileName, ext);
    return `${basename}${batchNumber}${ext}`;
  }
}
