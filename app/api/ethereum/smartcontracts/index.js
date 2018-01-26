'use strict';

const express = require('express');
const validate = require('express-jsonschema').validate;
const router = express.Router();

const TransactionDeployModel = require(`${CONF.raml}/schemas/ethereum/smartContracts/transactionDeploy.json`);
const TransactionInvokeModel = require(`${CONF.raml}/schemas/ethereum/smartContracts/transactionInvoke.json`);
const RegisterSmartContractModel = require(`${CONF.raml}/schemas/ethereum/smartContracts/register.json`);
const TransactionInvokeParamModel = require(`${CONF.raml}/schemas/ethereum/smartContracts/transactionInvokeByParam.json`);
const smartContractDeploy = require('./controller/deploy');
const smartContractInvoke = require('./controller/invoke');
const smartContractRegister = require('./controller/register');


router.route('/deploy').post(validate({body: TransactionDeployModel}), smartContractDeploy.deploy);
router.route('/invoke').post(validate({body: TransactionInvokeModel}), smartContractInvoke.invoke);
router.route('/register').post(validate({body: RegisterSmartContractModel}), smartContractRegister.register);
router.route('/:query').post(validate({body: TransactionInvokeParamModel}), smartContractInvoke.invokeByQuery);

//router.get('/:name', contract.contractInfo(request, reply, next));

// Healthcheck
router.get('/', (req, res) => {
  res.json({
    status: 'OK',
    app: 'Ethereum Smart Contracts'
  });
});

module.exports = router;