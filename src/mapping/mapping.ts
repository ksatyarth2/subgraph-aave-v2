import { BigInt } from "@graphprotocol/graph-ts"
import {
  LendingPool,
  Borrow,
  Deposit,
  FlashLoan,
  LiquidationCall,
  Paused,
  RebalanceStableBorrowRate,
  Repay,
  ReserveDataUpdated,
  ReserveUsedAsCollateralDisabled,
  ReserveUsedAsCollateralEnabled,
  Swap,
  Unpaused,
  Withdraw
} from "../../generated/LendingPool/LendingPool"

import { EventTypeRef, getHistoryEntityId, getHistoryId } from '../utils/id-generations';
import { getOrInitReserve, getOrInitUser, getOrInitUserReserve } from "../helpers/initializers";
import { Deposit as DepositAction } from "../../generated/schema"

// export function handleBorrow(event: Borrow): void {
//   // Entities can be loaded from the store using a string ID; this ID
//   // needs to be unique across all entities of the same type
//   let entity = ExampleEntity.load(event.transaction.from.toHex())

//   // Entities only exist after they have been saved to the store;
//   // `null` checks allow to create entities on demand
//   if (!entity) {
//     entity = new ExampleEntity(event.transaction.from.toHex())

//     // Entity fields can be set using simple assignments
//     entity.count = BigInt.fromI32(0)
//   }

//   // BigInt and BigDecimal math are supported
//   entity.count = entity.count + BigInt.fromI32(1)

//   // Entity fields can be set based on event parameters
//   entity.reserve = event.params.reserve
//   entity.user = event.params.user

//   // Entities can be written to the store with `.save()`
//   entity.save()

//   // Note: If a handler doesn't require existing field values, it is faster
//   // _not_ to load the entity from the store. Instead, create it fresh with
//   // `new Entity(...)`, set the fields that should be updated and save the
//   // entity back to the store. Fields that were not set or unset remain
//   // unchanged, allowing for partial updates to be applied.

//   // It is also possible to access smart contracts from mappings. For
//   // example, the contract that has emitted the event can be connected to
//   // with:
//   //
//   // let contract = Contract.bind(event.address)
//   //
//   // The following functions can then be called on this contract to access
//   // state variables and other data:
//   //
//   // - contract.FLASHLOAN_PREMIUM_TOTAL(...)
//   // - contract.LENDINGPOOL_REVISION(...)
//   // - contract.MAX_NUMBER_RESERVES(...)
//   // - contract.MAX_STABLE_RATE_BORROW_SIZE_PERCENT(...)
//   // - contract.getAddressesProvider(...)
//   // - contract.getConfiguration(...)
//   // - contract.getReserveData(...)
//   // - contract.getReserveNormalizedIncome(...)
//   // - contract.getReserveNormalizedVariableDebt(...)
//   // - contract.getReservesList(...)
//   // - contract.getUserAccountData(...)
//   // - contract.getUserConfiguration(...)
//   // - contract.paused(...)
//   // - contract.repay(...)
//   // - contract.withdraw(...)
// }

/////////// abi of deposit event////
// "inputs": [
//   {
//     "indexed": true,
//     "internalType": "address",
//     "name": "reserve",
//     "type": "address"
//   },
//   {
//     "indexed": false,
//     "internalType": "address",
//     "name": "user",
//     "type": "address"
//   },
//   {
//     "indexed": true,
//     "internalType": "address",
//     "name": "onBehalfOf",
//     "type": "address"
//   },
//   {
//     "indexed": false,
//     "internalType": "uint256",
//     "name": "amount",
//     "type": "uint256"
//   },
//   {
//     "indexed": true,
//     "internalType": "uint16",
//     "name": "referral",
//     "type": "uint16"
//   }
// ],
// "name": "Deposit",
// "type": "event"
// },
export function handleDeposit(event: Deposit): void {
  let poolReserve = getOrInitReserve(event.params.reserve, event);
  let userReserve = getOrInitUserReserve(event.params.user, event.params.reserve, event);
  let depositedAmount = event.params.amount;

  let id = getHistoryId(event, EventTypeRef.Deposit);
  if (DepositAction.load(id)) {
    id = id + '0';
  }

  let deposit = new DepositAction(id);
  deposit.pool = poolReserve.pool;
  deposit.user = userReserve.user;
  // deposit.onBehalfOf = event.params.onBehalfOf.toHexString();
  // deposit.userReserve = userReserve.id;
  // deposit.reserve = poolReserve.id;
  deposit.amount = depositedAmount;
  deposit.timestamp = event.block.timestamp.toI32();
  // if (event.params.referral) {
  //   let referrer = getOrInitReferrer(event.params.referral);
  //   deposit.referrer = referrer.id;
  // }
  deposit.save();
}
// export function handleDeposit(event: Deposit): void {
//  let id = event.transaction.hash.toHexString()
//  let caller = event.params.user;
//   let user = event.params.onBehalfOf;
//   let depositedAmount = event.params.amount;
//   // let poolReserve = getOrInitReserve(event.params.reserve, event);
//   let userReserve = getOrInitUserReserve(, event.params.reserve, event);
// //  let deposit = DepositAction.load(id)
// //  if (deposit == null){
// //    deposit = new DepositAction(id)
// //  }
//  let deposit = new DepositAction(getHistoryEntityId(event));
//   // deposit.pool = poolReserve.pool;
//   deposit.user = userReserve.user;
//   deposit.caller = getOrInitUser(caller).id;
//   deposit.amount = depositedAmount;
//   deposit.timestamp = event.block.timestamp.toI32();
// deposit.save()
// }

// export function handleFlashLoan(event: FlashLoan): void {}

// export function handleLiquidationCall(event: LiquidationCall): void {}

// export function handlePaused(event: Paused): void {}

// export function handleRebalanceStableBorrowRate(
//   event: RebalanceStableBorrowRate
// ): void {}

// export function handleRepay(event: Repay): void {}

// export function handleReserveDataUpdated(event: ReserveDataUpdated): void {}

// export function handleReserveUsedAsCollateralDisabled(
//   event: ReserveUsedAsCollateralDisabled
// ): void {}

// export function handleReserveUsedAsCollateralEnabled(
//   event: ReserveUsedAsCollateralEnabled
// ): void {}

// export function handleSwap(event: Swap): void {}

// export function handleUnpaused(event: Unpaused): void {}

// export function handleWithdraw(event: Withdraw): void {}
