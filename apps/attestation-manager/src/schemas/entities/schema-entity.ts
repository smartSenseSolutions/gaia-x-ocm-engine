import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export default class SchemaDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  schemaID: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  createdBy: string;

  @IsString()
  createdDate: Date;

  @IsString()
  updatedBy?: string;

  @IsString()
  updatedDate: Date;

  @IsString()
  @ApiProperty()
  version: string;

  @IsString()
  @ApiProperty()
  attributes: string[];

  @IsString()
  pageSize?: string;

  @IsString()
  page?: string;

  @IsString()
  @ApiPropertyOptional()
  type?: string;
}
