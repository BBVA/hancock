import * as db from '../../../db/ethereum';
import { hancockDbError } from '../../../models/error';
import {
  IEthereumContractAbiDbModel,
  IEthereumSmartContractInvokeByQueryRequest,
  IEthereumSmartContractInvokeModel,
  IEthereumTokenTransferByQueryRequest,
  IEthereumTokenTransferRequest,
  TokenNames,
} from '../../../models/ethereum';
import { error } from '../../../utils/error';
import logger from '../../../utils/logger';
import { adaptContractInvoke  } from '../smartContract/common';
import { invokeByQuery } from '../smartContract/invoke';
import { hancockContractAbiError, hancockContractInvokeError } from '../smartContract/models/error';

export async function tokenTransfer(transferRequest: IEthereumTokenTransferRequest): Promise<any> {

  logger.info(`Token transfer`);
  let abi: IEthereumContractAbiDbModel | null;

  try {

    abi = await db.getAbiByName(TokenNames.ERC20);

  } catch (err) {

    throw error(hancockDbError, err);

  }

  if (abi) {

    const invokeModel: IEthereumSmartContractInvokeModel = {
      abi: abi.abi,
      action: 'send',
      from: transferRequest.from,
      method: 'transfer',
      params: [transferRequest.to, transferRequest.value],
      to: transferRequest.smartContractAddress,
    };

    try {

      return await adaptContractInvoke(invokeModel);

    } catch (err) {

      throw error(hancockContractInvokeError, err);

    }

  } else {

    throw error(hancockContractAbiError);

  }
}

export async function tokenTransferByQuery(addressOrAlias: string, transferRequest: IEthereumTokenTransferByQueryRequest): Promise<any> {

  logger.info(`Token transfer by query`);

  try {

    const invokeModel: IEthereumSmartContractInvokeByQueryRequest = {
      action: 'send',
      from: transferRequest.from,
      method: 'transfer',
      params: [transferRequest.to, transferRequest.value],
    };

    return await invokeByQuery(addressOrAlias, invokeModel);

  } catch (err) {

    throw error(hancockContractInvokeError, err);

  }
}
