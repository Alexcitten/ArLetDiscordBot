module.exports = async (input,state,caller) => {
  if(!input.transfers&&!Array.isArray(input.transfers)){
      throw new ContractError(`"transfers" must be an array of transfer objects (qty in winston, target as AR address). Transfers field contains invalid transfer`)
  }

  if(!state.balances[caller]){
      throw new ContractError("You don\'t have ANO.")
  }

  state.balances[caller] = BigInt(state.balances[caller])

  input.transfers.forEach(transfer => {
      if (!transfer.qty) {
          throw new ContractError(`Invalid value for "qty". Must be an amount of Wilston (integer string)`);
        }

        transfer.qty = BigInt(transfer.qty);

        let qty = transfer.qty
        
      if(!transfer || !transfer.qty || !transfer.target || transfer.qty<=0n){
          throw new ContractError(`"transfers" must be an array of transfer objects (qty in winston, target as AR address). Transfers field contains invalid transfer`)
      }

      let target = transfer.target
      if (state.balances[caller] < transfer.qty) {
          throw new ContractError(`Caller balance is not high enough to complete all transfers! Operation cancelled`);
        }
        if(!state.balances[transfer.target]){
          state.balances[transfer.target]=0n
        }else{
          state.balances[transfer.target] = BigInt(state.balances[transfer.target])
        }

        state.balances[caller]-=qty
        state.balances[transfer.target]+=qty
        
        state.balances[transfer.target]= parseInt(state.balances[transfer.target])
  })

  state.balances[caller] = parseInt( state.balances[caller])
  return {state}
}