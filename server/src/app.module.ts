import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { PrismaModule } from '@/prisma/prisma.module'
import { UsersModule } from '@/modules/users/users.module'
import { AuthModule } from '@/auth/auth.module'
import { LoggerMiddleware } from '@/middleware/logger.middleware'
import { ProductsModule } from '@/modules/products/products.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '@/common/guards/auth.guard'
import { RolesGuard } from '@/common/guards/role.guard'
import { AuctionsModule } from '@/modules/auctions/auctions.module'
import { BidsModule } from '@/modules/bids/bids.module'
import { ScheduleModule } from '@nestjs/schedule'
import { ReviewModule } from './modules/review/review.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { MailServerModule } from './mail/mail.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    MailServerModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    AuctionsModule,
    BidsModule,
    ReviewModule,
    CloudinaryModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
