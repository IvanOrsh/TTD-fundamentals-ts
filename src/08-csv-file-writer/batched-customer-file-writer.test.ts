import { BatchedCustomerFileWriter } from "./batched-customer-file-writer";
import {
  createRandomCustomers,
  MockFileWriter,
  createFileWriter,
} from "./customer-test-helpers";

// TODO: think about removing helpers (for testing) to a separate file
import { createCustomerCsvFileWriter } from "./customer-csv-file-writer.test";

function createBatchedCustomerFileWriter(fileWriter: MockFileWriter) {
  const csvFileWriter = createCustomerCsvFileWriter(fileWriter);
  return new BatchedCustomerFileWriter(csvFileWriter);
}

function createBatchedCustomerFileWriterWithBatchSize(
  fileWriter: MockFileWriter,
  batchSize: number
) {
  const csvFileWriter = createCustomerCsvFileWriter(fileWriter);
  return new BatchedCustomerFileWriter(csvFileWriter, batchSize);
}

describe("BatchedCustomerFileWriter", () => {
  describe("writeCustomers", () => {
    describe("given less than 10 customers", () => {
      test("should batch in 1 group", () => {
        // arrange
        const customers = createRandomCustomers(8);
        const fileWriter = createFileWriter();
        const sut = createBatchedCustomerFileWriter(fileWriter);

        const fileName = "batchedcust.csv";
        // act
        sut.writeCustomers(fileName, customers);

        // assert
        fileWriter.assertCustomersWereWrittenToFile(fileName, customers);
      });
    });

    describe("given more than 10 customers", () => {
      test("given 13 customers should batch in groups of 10, 3", () => {
        // arrange
        const customers = createRandomCustomers(13);
        const fileWriter = createFileWriter();
        const sut = createBatchedCustomerFileWriter(fileWriter);

        // act
        sut.writeCustomers("batchedcust.csv", customers);

        // assert
        fileWriter.assertNumberOfCustomersWritten(customers.length);
        fileWriter.assertCustomersWereWrittenToFile(
          "batchedcust1.csv",
          customers.slice(0, 10)
        );
        fileWriter.assertCustomersWereWrittenToFile(
          "batchedcust2.csv",
          customers.slice(10, 13)
        );
      });

      test("given 53 should batch in groups of 10, 10, 10, 10, 10, 3", () => {
        // arrange
        const customers = createRandomCustomers(53);
        const fileWriter = createFileWriter();
        const sut = createBatchedCustomerFileWriter(fileWriter);

        // act
        sut.writeCustomers("batchedcust.csv", customers);

        // assert
        fileWriter.assertNumberOfCustomersWritten(customers.length);
        fileWriter.assertCustomersWereWrittenToFile(
          "batchedcust1.csv",
          customers.slice(0, 10)
        );
        fileWriter.assertCustomersWereWrittenToFile(
          "batchedcust2.csv",
          customers.slice(10, 20)
        );
        fileWriter.assertCustomersWereWrittenToFile(
          "batchedcust3.csv",
          customers.slice(20, 30)
        );
        fileWriter.assertCustomersWereWrittenToFile(
          "batchedcust4.csv",
          customers.slice(30, 40)
        );
        fileWriter.assertCustomersWereWrittenToFile(
          "batchedcust5.csv",
          customers.slice(40, 50)
        );
        fileWriter.assertCustomersWereWrittenToFile(
          "batchedcust6.csv",
          customers.slice(50, 53)
        );
      });

      test("given many (200) should write all", () => {
        // arrange
        const customers = createRandomCustomers(200);
        const fileWriter = createFileWriter();
        const sut = createBatchedCustomerFileWriter(fileWriter);

        // act
        sut.writeCustomers("batchedcust.csv", customers);

        // assert
        fileWriter.assertNumberOfCustomersWritten(customers.length);
      });

      test("should name files correctly without extension", () => {
        // arrange
        const customers = createRandomCustomers(15);
        const fileWriter = createFileWriter();
        const sut = createBatchedCustomerFileWriter(fileWriter);

        // act
        sut.writeCustomers("noext", customers);

        // assert
        fileWriter.assertNumberOfCustomersWritten(customers.length);
        fileWriter.assertCustomersWereWrittenToFile(
          "noext1",
          customers.slice(0, 10)
        );
        fileWriter.assertCustomersWereWrittenToFile(
          "noext2",
          customers.slice(10, 13)
        );
      });
    });

    describe("different batch size", () => {
      test("should still batch in correctly sized groups", () => {
        // arrange
        const customers = createRandomCustomers(13);
        const fileWriter = createFileWriter();
        const sut = createBatchedCustomerFileWriterWithBatchSize(fileWriter, 5);

        // act
        sut.writeCustomers("batchedcust.csv", customers);

        // assert
        fileWriter.assertNumberOfCustomersWritten(customers.length);
        fileWriter.assertCustomersWereWrittenToFile(
          "batchedcust1.csv",
          customers.slice(0, 5)
        );
        fileWriter.assertCustomersWereWrittenToFile(
          "batchedcust2.csv",
          customers.slice(5, 10)
        );
        fileWriter.assertCustomersWereWrittenToFile(
          "batchedcust3.csv",
          customers.slice(10, 13)
        );
      });
    });

    // test("learning test", () => {
    //
    // });
  });
});
