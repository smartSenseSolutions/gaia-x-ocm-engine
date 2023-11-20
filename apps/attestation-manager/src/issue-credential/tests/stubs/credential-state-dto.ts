import CredentialStateDto from '@issueCredential/entities/credential.state.entity';
import credDefStub from '@src/credentialDef/tests/stubs/credDef.stub';
import credentialDto from './credential-dto';

const credentialStateDto = (): CredentialStateDto => ({
  id: 'credential-state-id',
  metadata: {
    '_internal/indyCredential': {
      credentialDefinitionId: credentialDto().credDefId,
      schemaId: credDefStub().schemaID,
    },
  },
  credDefId: credentialDto().credDefId,
  state: credentialDto().state,
  threadId: 'thread-id',
  connectionId: credentialDto().connectionId,
});

export default credentialStateDto;
