import logger from '@src/utils/logger';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  NATSServices,
  Principal,
  Attestation,
  ProofManager,
} from '@common/constants';
import ResponseType from '@common/response';
import ConnectionSubscriptionEndpointDto from '@connections/entities/connectionSubscribeEndPoint.entity';

@Injectable()
export default class NatsClientService {
  constructor(@Inject(NATSServices.SERVICE_NAME) private client: ClientProxy) {}

  sendConnectionStatusPrincipalManager(
    status: string,
    connectionId: string,
    theirLabel: string,
    participantDID: string,
    theirDid: string,
  ) {
    const pattern = {
      endpoint: `${Principal.NATS_ENDPOINT}/${Principal.CONNECTION_COMPLETE_STATUS}`,
    };
    const payload = {
      status,
      connectionId,
      theirLabel,
      participantDID,
      theirDid,
    };
    logger.info(`before nats call to principal manager ${payload}`);
    return lastValueFrom(this.client.send<ResponseType>(pattern, payload));
  }

  getIssueCredentials(connectionId: string) {
    const pattern = {
      endpoint: `${Attestation.NATS_ENDPOINT}/${Attestation.GET_ISSUE_CREDENTIALS}`,
    };
    const payload = {
      connectionId,
    };
    return lastValueFrom(this.client.send<ResponseType>(pattern, payload));
  }

  sendMembershipProofRequestToProofManager(connectionId: string) {
    const pattern = {
      endpoint: `${ProofManager.NATS_ENDPOINT}/${ProofManager.SEND_MEMBERSHIP_PROOF_REQUEST}`,
    };
    const payload = {
      connectionId,
    };
    return lastValueFrom(this.client.send<ResponseType>(pattern, payload));
  }

  getPresentProofs(connectionId: string) {
    const pattern = {
      endpoint: `${ProofManager.NATS_ENDPOINT}/${ProofManager.GET_PRESENT_PROOFS}`,
    };
    const payload = {
      connectionId,
    };
    return lastValueFrom(this.client.send<ResponseType>(pattern, payload));
  }

  publishConnection(data: ConnectionSubscriptionEndpointDto) {
    this.client.emit(
      `${NATSServices.SERVICE_NAME}/${NATSServices.CONNECTION_SUBSCRIBER_ENDPOINT}`,
      data,
    );
  }
}
