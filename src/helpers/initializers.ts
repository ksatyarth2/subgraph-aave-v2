import { Address, Bytes, ethereum, log } from '@graphprotocol/graph-ts';
import {
    User, 
  UserReserve,
    Reserve,
    ContractToPoolMapping
} from '../../generated/schema';

import { getReserveId, getUserReserveId } from '../utils/id-generations';
export function getOrInitUser(address: Bytes): User {
    let user = User.load(address.toHexString());
    if (!user) {
      user = new User(address.toHexString());
      user.save();
    }
    return user as User;
  }


  function initUserReserve(
    underlyingAssetAddress: Bytes,
    userAddress: Bytes,
    poolId: string,
    
  ): UserReserve {
    let userReserveId = getUserReserveId(userAddress, underlyingAssetAddress, poolId);
    let userReserve = UserReserve.load(userReserveId);
    if (userReserve === null) {
      userReserve = new UserReserve(userReserveId);
      userReserve.pool = poolId
      let user = getOrInitUser(userAddress);
    userReserve.user = user.id;

    // userReserve.reserve = reserveId;
  }
  return userReserve as UserReserve;
}
  
// export function getOrInitUserReserve(
//     _user: Bytes,
//     _underlyingAsset: Bytes,
//     event: ethereum.Event
//   ): UserReserve {
//     let poolId = getPoolByContract(event);
//     let reserve = getOrInitReserve(_underlyingAsset, event);
//     return initUserReserve(_underlyingAsset, _user, poolId, reserve.id);
//   }

export function getPoolByContract(event: ethereum.Event): string {
  let contractAddress = event.address.toHexString();
    let contractToPoolMapping = ContractToPoolMapping.load(contractAddress);
    if (contractToPoolMapping === null) {
      // throw new Error(contractAddress + 'is not registered in ContractToPoolMapping');
      contractToPoolMapping = new ContractToPoolMapping(contractAddress);
      contractToPoolMapping.pool = '0';
      contractToPoolMapping.save();
    }
    return contractToPoolMapping.pool;
  }
  export function createMapContractToPool(_contractAddress: Address, pool: string): void {
    let contractAddress = _contractAddress.toHexString();
    let contractToPoolMapping = ContractToPoolMapping.load(contractAddress);
  
    if (contractToPoolMapping) {
      log.error('contract {} is already registered in the protocol', [contractAddress]);
      throw new Error(contractAddress + 'is already registered in the protocol');
    }
    contractToPoolMapping = new ContractToPoolMapping(contractAddress);
    contractToPoolMapping.pool = pool;
    contractToPoolMapping.save();
  }
  

export function getOrInitUserReserve(
    _user: Bytes,
    _underlyingAsset: Bytes,
    event: ethereum.Event
  ): UserReserve {
    let poolId = getPoolByContract(event);
    // let reserve = getOrInitReserve(_underlyingAsset, event);
    return initUserReserve(_underlyingAsset, _user, poolId);
}
  
export function getOrInitReserve(underlyingAsset: Address, event: ethereum.Event): Reserve {
  let poolId = getPoolByContract(event);
  let reserveId = getReserveId(underlyingAsset, poolId);
  let reserve = Reserve.load(reserveId);
  if (reserve === null) {
    reserve = new Reserve(reserveId);
    reserve.underlyingAsset = underlyingAsset;
    reserve.pool = poolId;
    reserve.symbol = '';
    reserve.name = '';
  }
  return reserve as Reserve;
}