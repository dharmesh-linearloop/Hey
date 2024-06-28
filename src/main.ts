import { HttpService, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@salesahandy/observability';
import { addBaggageToHeaders } from './sh-logger/baggage';
import { ApiRequestInterceptor } from './shared/interceptors/api-request.interceptor';
import { AppConfigService } from './app-config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const appConfigService = app.get(AppConfigService);

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(helmet());
  app.use(cookieParser());

  app.useGlobalInterceptors(new ApiRequestInterceptor());

  const swaggerEndpoint = 'api';

  if (appConfigService.env !== 'PRODUCTION') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('SalesHandy Admin')
      .setDescription('SalesHandy Admin')
      .setVersion('0.0.1')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(swaggerEndpoint, app, document);
  }

  const httpService = app.get(HttpService);
  httpService.axiosRef.interceptors.request.use(
    (config) => {
      addBaggageToHeaders(config);
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  await app.listen(appConfigService.port ?? 3000);

  console.log(`Nest App Started on ${appConfigService.port ?? 3000}`);
  console.log(
    `http://localhost:${appConfigService.port ?? 3000}/${swaggerEndpoint}/`,
  );
}
bootstrap();
