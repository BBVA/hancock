import * as db from '../../../db/ethereum';
import { hancockDbError } from '../../../models/error';
import {
  IEthereumContractDbModel,
} from '../../../models/ethereum/smartContract';
import { error } from '../../../utils/error';
import logger from '../../../utils/logger';
import { retrieveContractAbiByAddressOrAlias } from '../smartContract/common';
import { hancockContractRetrieveError } from './models/error';

export async function find(): Promise<IEthereumContractDbModel[]> {

  try {

    const contractDbModel: IEthereumContractDbModel[] = await db.getAllSmartContracts();
    logger.info(`Listing all resources`);
    return contractDbModel;

  } catch (err) {

    throw error(hancockDbError, err);

  }
}

export async function findOne(addressOrAlias: string): Promise<IEthereumContractDbModel> {

  try {

    const contractDbModel: IEthereumContractDbModel = await retrieveContractAbiByAddressOrAlias(addressOrAlias);
    logger.info('One contract found', contractDbModel);
    return contractDbModel;

  } catch (err) {

    throw error(hancockContractRetrieveError, err);

  }
}
