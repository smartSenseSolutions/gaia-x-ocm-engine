import { Injectable } from '@nestjs/common';
import RestClientService from '@src/client/rest.client';

export interface PolicyReturnType {
  success: boolean;
  returnData?: any; // replace with actual structure when ready
}

export interface PolicyResult {
  allow: boolean;
  data?: any;
}

@Injectable()
export default class TSAClientService {
  constructor(private readonly restClient: RestClientService) {}

  async getPolicy(policyUrl: string) {
    try {
      const policyResponse: PolicyResult = await this.restClient.get(policyUrl);

      if (
        policyResponse &&
        policyResponse.allow &&
        typeof policyResponse.allow === 'boolean'
      ) {
        return {
          success: true,
          returnData: Boolean(policyResponse?.allow),
        } as PolicyReturnType;
      }

      // Add condition when policy returns data other than boolean
      return {
        success: false,
        returnData: 'Unable to fetch policy data.',
      } as PolicyReturnType;
    } catch (error: any) {
      let returnData = 'Something went wrong!';

      if (error?.isAxiosError) {
        returnData = `${error?.response?.status} ${error?.response?.statusText}`;
      }

      return {
        success: false,
        returnData,
      } as PolicyReturnType;
    }
  }
}
