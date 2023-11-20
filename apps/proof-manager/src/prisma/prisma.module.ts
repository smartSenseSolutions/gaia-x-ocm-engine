import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import PrismaService from '@DB/prisma.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export default class PrismaModule {}
