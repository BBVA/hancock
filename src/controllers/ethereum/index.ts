import { NextFunction, Request, Response } from 'express';
import * as domain from '../../domain/ethereum';
import { ethereumErrorResponse, ethereumOkResponse } from '../../models/ethereum';
import * as utils from '../../utils/utils';

export async function getBalance(req: Request, res: Response, next: NextFunction) {

  const address: string = req.params.address;

  return domain
    .getBalance(address)
    .then((balance: number) => utils.createReply(res, ethereumOkResponse, { balance }))
    .catch(() => utils.createReply(res, ethereumErrorResponse));

}

export * from './transfer';
export * from './smartContract';
export * from './token';
