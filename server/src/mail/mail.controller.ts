import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { MailServerService } from './mail.service'

@Controller('/mail')
export class MailServerController {
  constructor(private readonly mailServer: MailServerService) {}

  @Post('service')
  testEMail(@Body() createEmailServerDto) {
    return this.mailServer.sendEmail(createEmailServerDto)
  }
}
