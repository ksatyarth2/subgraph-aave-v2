import { Bytes, ethereum, log } from '@graphprotocol/graph-ts';
import {
    User, 
    UserReserve,
    ContractToPoolMapping
} from '../../generated/schema';

import { getUserReserveId } from '../utils/id-generations';
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
      throw new Error(contractAddress + 'is not registered in ContractToPoolMapping');
    }
    return contractToPoolMapping.pool;
  }


export function getOrInitUserReserve(
    _user: Bytes,
    _underlyingAsset: Bytes,
    event: ethereum.Event
  ): UserReserve {
    let poolId = getPoolByContract(event);
    //let reserve = getOrInitReserve(_underlyingAsset, event);
    return initUserReserve(_underlyingAsset, _user, poolId);
  }