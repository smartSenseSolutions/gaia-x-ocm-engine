import { AutoAcceptCredential } from '@aries-framework/core/build/modules/credentials/CredentialAutoAcceptType';
import * as process from 'process';

interface Config {
  agentHost: string;
  port: number;
  afjExtPort: number;
  jwtSecret: string;

  nats: {
    url: string;
  },

  agent: {
    name: string;
    walletId: string;
    walletKey: string;
    ledgerIds: string[] | undefined;
    host: string;
    peerPort: string;
    path: string;
    publicDidSeed: string;
    autoAcceptConnection: boolean;
    autoAcceptCredential: AutoAcceptCredential;
    idUnionKey: string;
    basicUser: string,
    basicPass: string
  },
}

const config = (): Config => ({
  agentHost: process.env.AGENT_HOST || '',
  port: Number(process.env.PORT),
  afjExtPort: Number(process.env.AFJ_EXT_PORT),
  jwtSecret: process.env.JWT_SECRET || '',

  nats: {
    url: process.env.NATS_URL || '',
  },

  agent: {
    name: process.env.AGENT_NAME || '',
    walletId: process.env.AGENT_WALLET_ID || '',
    walletKey: process.env.AGENT_WALLET_KEY || '',
    ledgerIds: process.env.AGENT_LEDGER_ID?.split(',') || undefined,
    host: process.env.AGENT_HOST || '',
    peerPort: process.env.AGENT_PEER_PORT || '',
    path: process.env.AGENT_URL_PATH || '',
    publicDidSeed: process.env.AGENT_PUBLIC_DID_SEED || '',
    autoAcceptConnection: process.env.AGENT_AUTO_ACCEPT_CONNECTION === 'true',
    autoAcceptCredential: process.env.AGENT_AUTO_ACCEPT_CREDENTIAL as AutoAcceptCredential,
    idUnionKey: process.env.AGENT_ID_UNION_KEY || '',
    basicUser: process.env.BASIC_USER!,
    basicPass: process.env.BASIC_PASS!,
  },
});

export default config;
