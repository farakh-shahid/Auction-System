import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { MailServerController } from './mail.controller'
import { MailServerService } from './mail.service'

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          secure: false,
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASSWORD')
          }
        },
        defaults: {
          from: `<${configService.get('MAIL_FROM')}>`
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: true
          }
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [MailServerController],
  providers: [MailServerService],
  exports: [MailServerService]
})
export class MailServerModule {}
