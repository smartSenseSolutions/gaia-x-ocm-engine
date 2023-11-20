import OfferCredentialDto from '@src/issue-credential/entities/entity';
import schemaDto from '@src/schemas/tests/stubs/schema-dto';
import credentialDto from './credential-dto';

const offerCredentialDto = (): OfferCredentialDto => ({
  connectionId: credentialDto().connectionId,
  credentialDefinitionId: credentialDto().credDefId,
  comment: 'Test Comment!!',
  attributes: schemaDto().attributes.map((attr: string) => ({
    name: attr,
    value: attr,
  })),
  autoAcceptCredential: 'never',
});

export default offerCredentialDto;
