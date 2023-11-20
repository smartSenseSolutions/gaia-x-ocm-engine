import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export default class CredentialDefReqDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  schemaID: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  credDefId: string;

  @IsBoolean()
  supportRevocation?: boolean;

  @IsBoolean()
  @ApiProperty()
  isRevokable: boolean;

  @IsBoolean()
  @ApiProperty()
  isAutoIssue: boolean;

  @IsString()
  @ApiProperty()
  // Number of hours of Credential validity
  expiryHours: string;

  @IsString()
  @ApiProperty()
  createdBy: string;

  @IsString()
  createdDate: Date;

  @IsString()
  updatedBy: string;

  @IsString()
  updatedDate: Date;

  @IsString()
  tag?: string;
}
