import {
  AddUserUseCase,
  EmailService,
  RealEmailService,
} from "./add-user-usecase";

// we can create mock manually
class MockEmailService implements EmailService {
  public welcomeLetterEmailAddresses: string[] = [];
  public wasSendWelcomeLetterCalled = false;

  sendWelcomeLetter(emailAddress: string): void {
    this.wasSendWelcomeLetterCalled = true;
    this.welcomeLetterEmailAddresses.push(emailAddress);
  }
}

describe("add-user-usecase", () => {
  describe("execute", () => {
    test("should send welcome letter to user added - custom mock", () => {
      const expected = "peter@mail.com";
      // Arrange
      const addUserRequest = {
        userName: "peter",
        emailAddress: expected,
      };

      const mockEmailService = new MockEmailService();
      const sut = new AddUserUseCase(mockEmailService);

      // Act
      sut.execute(addUserRequest);

      // Assert
      expect(mockEmailService.wasSendWelcomeLetterCalled).toBeTruthy();
      expect(mockEmailService.welcomeLetterEmailAddresses).toContain(expected);
    });
  });

  // or use one that is provided by jest (jest.mock)
  describe("execute", () => {
    test("should send welcome letter to user added - jest.fn", () => {
      const expected = "peter@mail.com";
      // Arrange
      const addUserRequest = {
        userName: "peter",
        emailAddress: expected,
      };

      const welcomeLetterEmailAddresses: string[] = [];
      const mockEmailService = {
        sendWelcomeLetter: jest.fn((address) =>
          welcomeLetterEmailAddresses.push(address)
        ),
      };
      const sut = new AddUserUseCase(mockEmailService);

      // Act
      sut.execute(addUserRequest);

      // Assert
      expect(welcomeLetterEmailAddresses).toContain(expected);
    });
  });

  describe("execute", () => {
    test("should send welcome letter to user added - 'real' email service", () => {
      const expected = "peter@mail.com";
      // Arrange
      const addUserRequest = {
        userName: "peter",
        emailAddress: expected,
      };

      const welcomeLetterEmailAddresses: string[] = [];
      const mockEmailService = new RealEmailService();
      mockEmailService.sendWelcomeLetter = jest.fn((address) =>
        welcomeLetterEmailAddresses.push(address)
      );
      const sut = new AddUserUseCase(mockEmailService);

      // Act
      sut.execute(addUserRequest);

      // Assert
      expect(welcomeLetterEmailAddresses).toContain(expected);
    });
  });
});
