export enum NATSServices {
  SERVICE_NAME = 'PRINCIPAL_MANAGER_SERVICE',
}

export enum LoggerConfig {
  FILE_PATH = 'logs/log.json',
  lOG_DIR = './logs',
}

export enum Attestation {
  NATS_ENDPOINT = 'ATTESTATION_MANAGER_SERVICE',
  OFFER_MEMBERSHIP_CREDENTIALS = 'offerMemberShipCredentials',
}

export const ConnectionManagerUrl = process.env.CONNECTION_MANAGER_URL;

export const CreateMemberConnection = 'v1/invitation-url?alias=member';

export const AttestationManagerUrl = process.env.ATTESTATION_MANAGER_URL;

export const SaveUserInfo = 'v1/userInfo';
