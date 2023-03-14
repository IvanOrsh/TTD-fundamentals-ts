export interface EmailService {
  sendMessage(message: EmailMessage): void;
}

export interface EmailMessage {
  subject: string;
  mailTo: string;
  message: string;
}

export class ResetPasswordUseCase {
  public constructor(private emailService: EmailService) {}

  public Execute(emailAddress: string): void {
    const message: EmailMessage = {
      subject: "Password Reset",
      mailTo: emailAddress,
      message: "Please follow the link...",
    };

    this.emailService.sendMessage(message);
  }
}
