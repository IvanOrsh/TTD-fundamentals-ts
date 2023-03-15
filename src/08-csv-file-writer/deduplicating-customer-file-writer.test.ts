import { DeduplicatingCustomerFileWriter } from "./deduplicating-customer-file-writer";

import {
  createCustomers,
  createCustomer,
  createFileWriter,
  MockFileWriter,
} from "./customer-test-helpers";

// TODO: think about removing helpers (for testing) to a separate file
import { createCustomerCsvFileWriter } from "./customer-csv-file-writer.test";

function createDeduplicatingCustomerFileWriter(fileWriter: MockFileWriter) {
  const csvFileWriter = createCustomerCsvFileWriter(fileWriter);
  return new DeduplicatingCustomerFileWriter(csvFileWriter);
}

describe("DeduplicatingCustomerFileWriter", () => {
  describe("writeCustomers", () => {
    describe("no duplicates", () => {
      test("should write al", () => {
        // arrange
        const customers = createCustomers(20);
        const fileWriter = createFileWriter();
        const sut = createDeduplicatingCustomerFileWriter(fileWriter);

        const fileName = "deduped.csv";
        // act
        sut.writeCustomers(fileName, customers);

        // assert
        fileWriter.assertCustomersWereWrittenToFile(fileName, customers);
      });
    });

    describe("one duplicate", () => {
      test("should write al", () => {
        // arrange
        const expected = createCustomer("Peter", "12");
        const customers = [expected, createCustomer("Peter", "123")];
        const fileWriter = createFileWriter();
        const sut = createDeduplicatingCustomerFileWriter(fileWriter);

        const fileName = "deduped.csv";
        // act
        sut.writeCustomers(fileName, customers);

        // assert
        fileWriter.assertCustomersWereWrittenToFile(fileName, [expected]);
        fileWriter.assertNumberOfCustomersWritten(1);
      });
    });

    describe("many duplicate", () => {
      test("should write only one entry of each duplicate", () => {
        // arrange
        const expected1 = createCustomer("Peter", "12");
        const expected2 = createCustomer("Jorge", "050");
        const expected3 = createCustomer("Mr Big", "707");
        const customers = [
          expected1,
          createCustomer("Peter", "123"),
          expected2,
          createCustomer("Jorge", "0504343"),
          expected3,
          createCustomer("Mr Big", "707313"),
        ];
        const fileWriter = createFileWriter();
        const sut = createDeduplicatingCustomerFileWriter(fileWriter);

        const fileName = "deduped.csv";
        // act
        sut.writeCustomers(fileName, customers);

        // assert
        fileWriter.assertCustomersWereWrittenToFile(fileName, [
          expected1,
          expected2,
          expected3,
        ]);
        fileWriter.assertNumberOfCustomersWritten(3);
      });
    });
  });
});
