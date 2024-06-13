import { emailTemplate } from './emailTemplate.js';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
@Injectable()
export class EmailService {

    constructor(private readonly mailerService: MailerService) { }

    private readonly logger = new Logger(EmailService.name);

    handleError(error: any) {
        this.logger.error(error);
        throw error;
    }

    async sendEmail({ email, code }) {
        try {
            console.log(email, code);

            await this.mailerService.sendMail({
                to: email,
                subject: 'Verify your email',
                html: emailTemplate(code),
            });
            console.log('Email sent to: ', email);
        } catch (error) {
            this.handleError(error)
        }
    }



}

