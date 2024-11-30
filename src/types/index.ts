import { HttpMethodEnum } from '@prisma/client';

export type HttpMethod = HttpMethodEnum;

export interface RequestData {
  id: string;
  method: HttpMethod;
  responseCode: number;
  uri: string;
  responseBody: string;
}
