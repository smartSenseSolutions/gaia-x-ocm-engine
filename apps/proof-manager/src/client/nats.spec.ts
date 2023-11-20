// import { ClientProxy } from '@nestjs/microservices';
import NatsClientService from './nats.client';

describe('Check if the nats client is working', () => {
  //   let natsClient: NatsClientService;
  //   let client: ClientProxy;

  //   beforeEach(() => {
  //     natsClient = new NatsClientService(client);
  //   });

  //   jest.mock('rxjs', () => {
  //     const original = jest.requireActual('rxjs');

  //     return {
  //       ...original,
  //       lastValueFrom: () => new Promise((resolve, reject) => {
  //         resolve(true);
  //       }),
  //     };
  //   });

  it('should be defined', () => {
    expect(NatsClientService).toBeDefined();
  });

  // it('should call the offer membership credential endpoint', async () => {
  //     const data = {
  //         status: 'complete',
  //         connectionId: 'connectionId',
  //         theirLabel: 'theirLabel',
  //         participantId: 'participantId',
  //         participantDID: 'participantDID'
  //     };
  //     jest.spyOn(client, 'send').mockReturnValue(of(data));
  //     const response = await natsClient.OfferMembershipCredential(data);
  //     expect(response).toBeTruthy();
  // });
});
