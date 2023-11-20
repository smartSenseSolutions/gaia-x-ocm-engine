import CredentialDto from '@issueCredential/entities/credential.entity';
import credDefStub from '@src/credentialDef/tests/stubs/credDef.stub';
import AttestationService from '@src/issue-credential/services/service';

const credentialDto = (): CredentialDto => ({
  credentialId: 'credential-id',
  credDefId: credDefStub().id,
  principalDid: 'principal-did',
  threadId: 'thread-id',
  state: AttestationService.status.OFFER_SENT,
  connectionId: 'connection-id',
});

export default credentialDto;
