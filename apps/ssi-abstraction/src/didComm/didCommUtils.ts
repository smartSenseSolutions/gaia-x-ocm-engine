import GenericBody from '@didComm/entities/GenericBody';
import { prepareInputData } from './utils/prepareData';

/**
 *
 * Handles the subMethods of responses
 *
 * @param response - generic response from the agent
 * @param path - the location of the subMethod within the response object ('.' notation)
 * @param context - subMethod on which the body.subMethod.subMethodData is applied on
 * @param prevContext - the object which contains the subMethod
 * @param body - arguments of the property method + subMethod name and arguments
 * @returns - the result from the applied subMethod arguments on the subMethod
 */
export function objectPathLoop(
  response: any,
  path: string[],
  context: any,
  prevContext: any,
  body: GenericBody,
) {
  let responseRe = response;
  let contextRe = context;
  let prevContextRe = prevContext;

  for (let i = 1; i < path.length; i += 1) {
    prevContextRe = contextRe;
    contextRe = contextRe[path[i]];
  }

  responseRe = contextRe;

  if (typeof contextRe === 'function' && body.subMethod) {
    responseRe = contextRe.apply(
      prevContextRe,
      prepareInputData(body.subMethod.subMethodData),
    ); // eslint-disable-line
  }

  return responseRe;
}

export default {
  objectPathLoop,
};
