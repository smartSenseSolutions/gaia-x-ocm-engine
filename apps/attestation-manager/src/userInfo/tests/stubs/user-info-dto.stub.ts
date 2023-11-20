import credentialDto from '@issueCredential/tests/stubs/credential-dto';
import offerCredentialDto from '@issueCredential/tests/stubs/offer-credential-dto';
import schemaDto from '@schemas/tests/stubs/schema-dto';
import UserInfoDto from '@userInfo/entities/userInfo.entity';

const userInfo = (): UserInfoDto => ({
  autoAcceptCredential: offerCredentialDto().autoAcceptCredential,
  connectionId: credentialDto().connectionId,
  userInfo: {
    ...schemaDto().attributes.map((attr) => ({ [attr]: attr })),
  },
});

export default userInfo;
