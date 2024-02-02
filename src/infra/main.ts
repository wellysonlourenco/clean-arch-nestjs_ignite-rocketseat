import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //logger: true,
  });

  const configService = app.get<ConfigService<Env, true>>(ConfigService);
  const port = configService.get('PORT', { infer: true });
  await app.listen(port);

  console.log(
    `🚀 Aplicação está rodando: ${await app.getUrl()}`,
    //npx prisma studio
  );
}
bootstrap();
