import { CustomerFileWriterInterface } from "./CustomerFileWriterInterface";
import { Customer } from "./customer";
export class DeduplicatingCustomerFileWriter
  implements CustomerFileWriterInterface
{
  constructor(private customerFileWriter: CustomerFileWriterInterface) {}

  public writeCustomers(fileName: string, customers: Customer[]) {
    const distinctCustomers = customers.filter(
      (customer, idx, array) =>
        idx === array.findIndex((c) => c.name === customer.name)
    );

    this.customerFileWriter.writeCustomers(fileName, distinctCustomers);
  }
}
