export interface AddUserRequest {
  emailAddress: string;
  userName: string;
}

export interface EmailService {
  sendWelcomeLetter(emailAddress: string): void;
}

export class RealEmailService implements EmailService {
  sendWelcomeLetter(emailAddress: string): void {
    // pretend this really sends an email
    throw new Error("not really implemented");
  }
}

export class AddUserUseCase {
  constructor(private emailService: EmailService) {}

  public execute(addUserRequest: AddUserRequest) {
    // check if user name is available
    // check if email address is available
    // add user
    this.emailService.sendWelcomeLetter(addUserRequest.emailAddress);
    this.emailService.sendWelcomeLetter("internal@chillisoft.co.uk");
  }
}
