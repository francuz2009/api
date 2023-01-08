import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';

async function start() {
  const PORT = process.env.API_PORT || 5000;
  const app = await NestFactory.create(AppModule)

  //Документация
  const config = new DocumentBuilder()
    .setTitle('CMS BACKEND')
    .setDescription('Документация rest API')
    .setVersion('1.0.0')
    .addTag('FRANC')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs/', app, document)
  //Документация

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => {
    console.log(`It's alive on ${PORT}!=)`)
  })
}

start()