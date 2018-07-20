import * as db from '../../../db/ethereum';
import {
  EthereumSmartContractNotFoundResponse,
  IEthereumContractAbiDbModel,
  IEthereumSmartContractInvokeByQueryRequest,
  IEthereumSmartContractInvokeModel,
  IEthereumTokenApproveTransferByQueryRequest,
  IEthereumTokenApproveTransferRequest,
} from '../../../models/ethereum';
import { adaptContractInvoke, retrieveContractAbiByAddressOrAlias  } from '../smartContract/common';
import { invokeByQuery } from '../smartContract/invoke';

export async function tokenApproveTransfer(transferRequest: IEthereumTokenApproveTransferRequest): Promise<any> {

  LOG.info(`Token approve transfer`);

  try {

    const abi: IEthereumContractAbiDbModel | null = await db.getAbiByName('erc20');

    if (abi) {

      const invokeModel: IEthereumSmartContractInvokeModel = {
        abi: abi.abi,
        action: 'send',
        from: transferRequest.from,
        method: 'approve',
        params: [transferRequest.spender, transferRequest.value],
        to: transferRequest.smartContractAddress,
      };

      return await adaptContractInvoke(invokeModel);

    } else {

      LOG.info('Contract not found');
      throw EthereumSmartContractNotFoundResponse;

    }

  } catch (e) {

    LOG.error(e);
    throw e;

  }
}

export async function tokenApproveTransferByQuery(query: string, transferRequest: IEthereumTokenApproveTransferByQueryRequest): Promise<any> {

  LOG.info(`Token approve transfer by query`);

  try {

    const invokeModel: IEthereumSmartContractInvokeByQueryRequest = {
      action: 'send',
      from: transferRequest.from,
      method: 'approve',
      params: [transferRequest.spender, transferRequest.value],
    };

    return await invokeByQuery(query, invokeModel);

  } catch (e) {

    LOG.error(e);
    throw e;

  }
}
