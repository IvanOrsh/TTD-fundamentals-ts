import { ResetPasswordUseCase } from "./reset-password-usecase";

function createMockEmailService(captureFn: (emailAddress: string) => void) {
  return {
    sendMessage: jest.fn((message) => captureFn(message.mailTo)),
  };
}

class EmailServiceHelper {
  private messageSentTo: string[] = [];
  private emailService = createMockEmailService((email) =>
    this.messageSentTo.push(email)
  );
  public getEmailService() {
    return this.emailService;
  }
  public getMessagesSentTo() {
    return this.messageSentTo;
  }
}

describe("reset-password-usecase", () => {
  describe("execute", () => {
    test("should send message to correct email address", () => {
      // Arrange
      const resetEmail = "jane@mail.com";
      const emailServiceHelper = new EmailServiceHelper();

      //TODO: use builder/factory function instead of instantiating class
      const sut = new ResetPasswordUseCase(
        emailServiceHelper.getEmailService()
      );
      // Act
      sut.Execute(resetEmail);
      // Assert
      expect(emailServiceHelper.getMessagesSentTo()).toContainEqual(resetEmail);
    });
  });
});
