import CredentialTypeDto from '@issueCredential/entities/credentialType.entity';
import schemaDto from '@src/schemas/tests/stubs/schema-dto';

const credentialsTypeDto = (): CredentialTypeDto => ({
  id: 'credential-type-id',
  schemaId: schemaDto().schemaID,
  type: 'type',
});

export default credentialsTypeDto;
