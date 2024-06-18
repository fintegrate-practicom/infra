import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { businessModule } from "./business/moudle/business.moudle";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthzModule } from "./authz/authz.module";
import { VerificationModule } from "./verification/vertification.module";
// import { VerificationModule } from "./verification/vertification.module";


@Module({
  imports: [
    AuthzModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    businessModule,
    VerificationModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get("MONGO_URI"),
      }),
      inject: [ConfigService],
    }),
    // AuthzModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
