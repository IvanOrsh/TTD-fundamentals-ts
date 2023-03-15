import { Customer } from "./customer";
import { FileWriter } from "./file-system";

export interface MockFileWriter extends FileWriter {
  assertCustomerWasWrittenToFile(fileName: string, customer: Customer): void;

  assertCustomersWereWrittenToFile(
    fileName: string,
    customers: Customer[]
  ): void;

  assertNumberOfCustomersWritten(numberOfCustomers: number): void;
}

export function createFileWriter(): MockFileWriter {
  return {
    writeLine: jest.fn(),
    assertCustomerWasWrittenToFile: function (
      fileName: string,
      customer: Customer
    ) {
      expect(this.writeLine).toHaveBeenCalledWith(
        fileName,
        `${customer.name},${customer.contactNumber}`
      );
    },
    assertCustomersWereWrittenToFile: function (
      fileName: string,
      customers: Customer[]
    ) {
      for (const customer of customers) {
        this.assertCustomerWasWrittenToFile(fileName, customer);
      }
    },
    assertNumberOfCustomersWritten: function (numberOfCustomers: number) {
      expect(this.writeLine).toHaveBeenCalledTimes(numberOfCustomers);
    },
  };
}

export function createCustomer(name: string, contactNumber: string): Customer {
  return new Customer(name, contactNumber);
}

export function createCustomers(numberOfCustomers: number): Customer[] {
  const customers: Customer[] = [];

  for (let i = 0; i < numberOfCustomers; i++) {
    customers.push(createCustomer(i.toString(), i.toString()));
  }

  return customers;
}

export function createRandomCustomers(numberOfCustomers: number): Customer[] {
  const generateRandomName = (length: number): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const generateRandomNumber = (length: number): number => {
    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const generateRandomCustomer = (): Customer =>
    createCustomer(generateRandomName(5), generateRandomNumber(6).toString());

  return Array.from({ length: numberOfCustomers }, () =>
    generateRandomCustomer()
  );
}
