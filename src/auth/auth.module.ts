import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from '@nestjs/passport';
import { Env } from "src/env";


@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory(config: ConfigService<Env, true>) {
                //console.log(config.get('JWT_SECRET', { infer: true }))
                const secret = config.get('JWT_SECRET', { infer: true })
                return {
                    secret,
                }
            },
        }),
    ],
    controllers: [],
    providers: [],
    exports: [],

})
export class AuthModule { }