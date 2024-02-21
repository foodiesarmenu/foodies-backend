import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerUi = new DocumentBuilder()
  .setTitle('foodies API')
  .setDescription('foodies is ar food menu app')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
