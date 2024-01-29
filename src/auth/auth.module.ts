import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from '@nestjs/passport';
import { Env } from "src/env";
import { JwtStrategy } from "./jwt.strategy";


@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            global: true,
            useFactory(config: ConfigService<Env, true>) {
                //console.log(config.get('JWT_SECRET', { infer: true }))
                const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
                const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

                return {
                    signOptions: { algorithm: 'RS256'},
                    privateKey: Buffer.from(privateKey, 'base64'),
                    publicKey: Buffer.from(publicKey, 'base64'),
                }
            },
        }),
    ],
    controllers: [],
    providers: [JwtStrategy,],
    exports: [],

})
export class AuthModule { }