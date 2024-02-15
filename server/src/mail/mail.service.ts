import { Inject, Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { OnEvent } from '@nestjs/event-emitter'

@Injectable()
export class MailServerService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService
  ) {}

  async sendEmail(inviteEmails) {
    // const inviteLink = this.configService.get<string>('INVITE_LINK')
    const messages = inviteEmails.email.map(async email => {
      //   const hashEmail = encryptData(email.email)
      //   const link = `${inviteLink}/${hashEmail}`
      return {
        to: email,
        subject: 'Congratulations',
        template: './mail',
        context: { name: email }
      }
    })
    const results = await Promise.allSettled(
      messages.map(async message => this.mailerService.sendMail(await message))
    )
    return results
  }

  @OnEvent('user.verify-email')
  async verifyEmail(data) {
    console.log(data)
    const { name, email, otp } = data

    const subject = `Company: OTP To Verify Email`

    const res = await this.mailerService.sendMail({
      to: email,
      subject,
      template: './verifyEmail',
      context: {
        otp,
        name
      }
    })
    console.log(res)
  }
}
