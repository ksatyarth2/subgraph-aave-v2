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
} from "../generated/LendingPool/LendingPool"
import { Deposit as DepositAction } from "../generated/schema"

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

export function handleDeposit(event: Deposit): void {
 let id = event.transaction.hash.toHexString()
 let deposit = DepositAction.load(id)
 if (deposit == null){
   deposit = new DepositAction(id)
 }
deposit.save()
}

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
