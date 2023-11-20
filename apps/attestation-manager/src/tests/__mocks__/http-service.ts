import { Observable } from 'rxjs';

const HttpServiceMock = jest.fn().mockReturnValue({
  post: jest.fn().mockReturnValue(
    new Observable((subscriber) => {
      subscriber.next({
        data: {
          sample: 'data',
        },
      });
      subscriber.complete();
    }),
  ),
});

export default HttpServiceMock;
