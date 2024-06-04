import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  getHello(@Request() req): string {
    console.log(req.user.id);
    return this.appService.getHello();
  }
}
