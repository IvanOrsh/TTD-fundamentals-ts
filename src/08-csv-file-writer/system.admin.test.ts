import { BatchedCustomerFileWriter } from "./batched-customer-file-writer";
import { CustomerCsvFileWriter } from "./customer-csv-file-writer";
import {
  createFileWriter,
  createRandomCustomers,
} from "./customer-test-helpers";
import { DeduplicatingCustomerFileWriter } from "./deduplicating-customer-file-writer";

describe("", () => {
  test("learning test", () => {
    const customers = createRandomCustomers(20000);

    const fileWriter = createFileWriter();
    const csvFileWriter = new CustomerCsvFileWriter(fileWriter);

    // 15000-batch, with deduplication
    const writer = new DeduplicatingCustomerFileWriter(
      new BatchedCustomerFileWriter(csvFileWriter, 15000)
    );

    // 20-batch, no deduplication
    const debugWriter = new BatchedCustomerFileWriter(csvFileWriter, 20);
  });
});
