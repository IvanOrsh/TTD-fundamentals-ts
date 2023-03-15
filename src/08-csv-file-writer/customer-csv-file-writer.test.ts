// SOLID
// SRP
// OCP
// LSP
// ISP
// DI

import { Customer } from "./customer";
import { CustomerCsvFileWriter } from "./customer-csv-file-writer";
import {
  createCustomer,
  createFileWriter,
  MockFileWriter,
} from "./customer-test-helpers";

export function createCustomerCsvFileWriter(
  fileWriter: MockFileWriter
): CustomerCsvFileWriter {
  return new CustomerCsvFileWriter(fileWriter);
}

describe("CustomCsvFileWriter", () => {
  describe("writeCustomers", () => {
    describe("filename and/or customers are not specified", () => {
      test("should throw an error if filename is an empty string", () => {
        const customers = [
          createCustomer("Peter Wiles", "12345697123"),
          createCustomer("Brendon Page", "456686950"),
          createCustomer("John Doe", "123459381"),
        ];
        const fileWriter = createFileWriter();
        const fileName = "";
        const sut = createCustomerCsvFileWriter(fileWriter);

        expect(() => sut.writeCustomers(fileName, customers)).toThrowError(
          "filename is empty string"
        );
      });

      test("should not write any line if no customers are given", () => {
        const customers: Customer[] = [];
        const fileWriter = createFileWriter();
        const fileName = "customers.csv";
        const sut = createCustomerCsvFileWriter(fileWriter);

        sut.writeCustomers(fileName, customers);

        fileWriter.assertCustomersWereWrittenToFile(fileName, customers);
      });

      test("should throw an argument exception if null is given as customers", () => {
        const customers = null;
        const fileWriter = createFileWriter();
        const fileName = "customers.csv";
        const sut = createCustomerCsvFileWriter(fileWriter);

        expect(() => sut.writeCustomers(fileName, customers!)).toThrowError(
          "customers is null"
        );
      });
    });

    describe("one customer", () => {
      test.each([
        {
          customer: createCustomer("Peter Wiles", "12345697123"),
        },
        {
          customer: createCustomer("Brendon Page", "456686950"),
        },
      ])("customer: $customer", ({ customer }) => {
        // arrange
        const fileWriter = createFileWriter();
        const fileName = "customers.csv";
        const sut = createCustomerCsvFileWriter(fileWriter);

        // act
        sut.writeCustomers(fileName, [customer]);

        // assert
        fileWriter.assertNumberOfCustomersWritten(1);
        fileWriter.assertCustomerWasWrittenToFile(fileName, customer);
      });
    });

    describe("many customers", () => {
      test("should write all customers", () => {
        // arrange
        const customers = [
          createCustomer("Peter Wiles", "12345697123"),
          createCustomer("Brendon Page", "456686950"),
          createCustomer("John Doe", "123459381"),
        ];
        const fileWriter = createFileWriter();
        const fileName = "customers.csv";
        const sut = createCustomerCsvFileWriter(fileWriter);

        // act
        sut.writeCustomers(fileName, customers);

        // assert
        fileWriter.assertCustomersWereWrittenToFile(fileName, customers);
        fileWriter.assertNumberOfCustomersWritten(customers.length);
      });
    });
  });
});
