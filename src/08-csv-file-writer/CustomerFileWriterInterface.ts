import { Customer } from "./customer";

export interface CustomerFileWriterInterface {
  writeCustomers(
    filename: string,
    customers: Customer[],
    batchSize?: number
  ): void;
}
