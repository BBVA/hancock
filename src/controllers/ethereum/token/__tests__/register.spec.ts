
import 'jest';
import * as domain from '../../../../domain/ethereum';
import { ethereumTokenRegisterSuccessResponse } from '../../../../models/ethereum';
import * as utils from '../../../../utils/utils';
import * as ethereumTokenRegisterController from '../register';

jest.mock('../../../../domain/ethereum');
jest.mock('../../../../domain/ethereum/token');
jest.mock('../../../../utils/utils');

describe('tokenRegisterController', async () => {

  let req: any;
  let res: any;
  let next: any;

  const utilsCreateReplyMock = (utils.createReply as jest.Mock);
  const domainTokenRegisterMock = (domain.tokenRegister as jest.Mock);

  beforeEach(() => {

    req = {
      body: {
        address: 'mockedAddress',
        alias: 'mockedAlias',
      },
    };

    res = {
      send: jest.fn(),
    };

    next = jest.fn();

    utilsCreateReplyMock.mockReset();
    domainTokenRegisterMock.mockReset();

  });

  it('should call domain.tokenRegister and return the response', async () => {

    domainTokenRegisterMock.mockResolvedValue('mockedResult');

    await ethereumTokenRegisterController.tokenRegister(req, res, next);

    expect(domainTokenRegisterMock).toHaveBeenCalledWith('mockedAlias', 'mockedAddress');
    expect(utilsCreateReplyMock).toHaveBeenCalledWith(res, ethereumTokenRegisterSuccessResponse, 'mockedResult');

  });

  it('should call domain.tokenRegister and fail if there is a problem', async () => {

    const errThrowed = new Error('Boom!');
    domainTokenRegisterMock.mockRejectedValue(errThrowed);

    await ethereumTokenRegisterController.tokenRegister(req, res, next);

    expect(domainTokenRegisterMock).toHaveBeenCalledWith('mockedAlias', 'mockedAddress');
    expect(next).toHaveBeenCalledTimes(1);

  });

});
