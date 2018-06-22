import * as utils from '../../components/utils';
import { IEthereumTransferSendRequest } from '../../models/ethereum';

export async function sendTransfer(transfer: IEthereumTransferSendRequest): Promise<any> {

  if (transfer.data) {
    transfer.data = utils.strToHex(transfer.data);
  }

  return new Promise<any>((resolve, reject) => {

    LOG.info(`Sending Transfer`, transfer);

    ETH.web3.eth.sendTransaction(transfer, (err: any, result: any) => err
      ? reject()
      : resolve(result));

  });
}