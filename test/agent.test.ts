import { Agent } from '../src';

const agent = new Agent(
  '3f125b5c9100c8ee234f5309ab58f83eb9bdedc9ecc14feb2cdf2fd733b1b5b8',
  1
);

describe('Agent', () => {
  it('dump', async () => {
    expect(
      await new Promise((resolve, reject) => {
        agent.dump(
          {
            clientId: 1,
            type: 0,
            text: 'hello',
            isCall: false,
          },
          {
            onSuccess(msg, utterance) {
              resolve({ msg, utterance });
            },
            onError(_, response) {
              reject(response);
            },
          }
        );
      })
    ).toBeTruthy();
  });

  it('feed', async () => {
    expect(
      await new Promise((resolve, reject) => {
        agent.feed({
          onSuccess: resolve,
          onError: reject,
        });
      })
    ).toBeTruthy();
  });

  it('rating', async () => {
    expect(
      await new Promise((resolve, reject) => {
        agent.rating('JupitaV1', {
          onSuccess: resolve,
          onError: reject,
        });
      })
    ).toBeTruthy();
  });
});
