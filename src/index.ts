import { Constants } from './Constants';
import { fetcher, FetcherBaseParams } from './fetcher';

interface DumpRequest extends FetcherBaseParams {
  clientId: string | number;
  type: 0 | 1;
  text: string;
  isCall: boolean;
}
interface DumpResponse {
  message: string;
  score: number;
}

interface ErrorListener {
  onError: (
    statusCode: string,
    response: Record<string, unknown> | null
  ) => void;
}

interface DumpListener extends ErrorListener {
  onSuccess: (msg: string, utterance: number) => void;
}

interface FeedListener extends ErrorListener {
  onSuccess: (week: {}) => void;
}

interface RatingRequest extends FetcherBaseParams {
  model: string;
}

interface RatingResponse {
  rating: number;
}

interface RatingListener extends ErrorListener {
  onSuccess: (rating: number) => void;
}

export class Agent {
  public static readonly AGENT = 0;
  public static readonly CLIENT = 1;
  public static readonly JUPITAV1 = 'JupitaV1';
  public static readonly JUPITAV2 = 'JupitaV2';

  constructor(private token: string, private agentId: string | number) {}

  dump(
    {
      type,
      text,
      clientId,
      isCall,
    }: Omit<DumpRequest, keyof FetcherBaseParams>,
    { onSuccess, onError }: DumpListener
  ): void {
    if (type !== Agent.AGENT && type !== Agent.CLIENT) {
      throw new Error('Use either Agent or Client type');
    }
    const jsonData = {
      token: this.token,
      'agent id': this.agentId,
      'client id': clientId,
      'message type': type,
      text,
      isCall,
    };
    fetcher<
      DumpResponse,
      Omit<DumpRequest, 'clientId' | 'type'> & {
        'client id': string | number;
        'message type': 0 | 1;
      }
    >(Constants.dumpEndpoint, jsonData, {
      onSuccess: res => onSuccess(res.message, res.score),
      onError,
    });
  }

  feed({ onSuccess, onError }: FeedListener): void {
    const jsonData = {
      token: this.token,
      'agent id': this.agentId,
    };
    fetcher<DumpResponse>(Constants.feedEndpoint, jsonData, {
      onSuccess,
      onError,
    });
  }

  rating(modelName: string, { onSuccess, onError }: RatingListener): void {
    if (modelName !== Agent.JUPITAV1) {
      throw new Error('Only Jupita v1 is supported');
    }
    const jsonData = {
      token: this.token,
      'agent id': this.agentId,
      model: modelName,
    };
    fetcher<RatingResponse, RatingRequest>(Constants.ratingEndpoint, jsonData, {
      onSuccess: res => onSuccess(res.rating),
      onError,
    });
  }
}
