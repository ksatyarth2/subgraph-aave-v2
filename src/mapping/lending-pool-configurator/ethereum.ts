/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ReserveInitialized } from '../../../generated/templates/LendingPoolConfigurator/LendingPoolConfigurator';
import { IERC20Detailed } from '../../../generated/templates/LendingPoolConfigurator/IERC20Detailed';
import { IERC20DetailedBytes } from '../../../generated/templates/LendingPoolConfigurator/IERC20DetailedBytes';

import {
    createMapContractToPool,
//   createMapContractToPool,
  getOrInitReserve,
} from '../../helpers/initializers';

// import { saveReserve, updateInterestRateStrategy } from './lending-pool-configurator';

export function handleReserveInitialized(event: ReserveInitialized): void {
    let underlyingAssetAddress = event.params.asset; //_reserve;
    let reserve = getOrInitReserve(underlyingAssetAddress, event);
  
    let ERC20ATokenContract = IERC20Detailed.bind(event.params.aToken);
    let ERC20ReserveContract = IERC20Detailed.bind(underlyingAssetAddress);
    let ERC20DetailedBytesContract = IERC20DetailedBytes.bind(underlyingAssetAddress);
  
    let nameStringCall = ERC20ReserveContract.try_name();
    if (nameStringCall.reverted) {
        let bytesNameCall = ERC20DetailedBytesContract.try_name();
        if (bytesNameCall.reverted) {
            reserve.name = '';
        } else {
            reserve.name = bytesNameCall.value.toString();
        }
    } else {
        reserve.name = nameStringCall.value;
    }
  
    reserve.symbol = ERC20ATokenContract.symbol().slice(1);
  
    reserve.decimals = ERC20ReserveContract.decimals();
    createMapContractToPool(event.params.aToken, reserve.pool);

    reserve.save();
}