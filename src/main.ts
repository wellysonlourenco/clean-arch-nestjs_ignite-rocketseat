import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
      logger: false,
    });
  await app.listen(3333);
  console.log(
    `🚀 Aplicação está rodando: ${await app.getUrl()}`,
    //npx prisma studio
  )
}
bootstrap();
