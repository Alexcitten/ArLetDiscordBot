
module.exports=async (input,state,caller)=>{
  if (!input.qty) {
    throw new ContractError(`Invalid value for "qty". Must be an amount of Wilston (integer string)`);
  }
  input.qty = BigInt(input.qty);

  if(!input.receiversListTx){
      throw new ContractError(`"receiversListTx" must be arweave transaction with list of receivers`)
  }

  if(!state.balances[caller]){
      throw new ContractError("You don't have any ANO! Buy or receive some to make operations.")
  }

  state.balances[caller]=BigInt(state.balances[caller])
  if (state.balances[caller] < input.qty) {
    throw new ContractError(`Caller balance is not high enough to complete all transfers! Operation cancelled`);
  }

  let receivers=(await SmartWeave.unsafeClient.transactions.getData(receiversListTx,{decode: true, string: true})).split("\n")
  if(input.qty<0n||input.qty<BigInt(receivers.length)){
    throw new ContractError("Invalid quantity")
  }

  receivers.forEach(target=>{
    if(!state.balances[target]){
      state.balances[target]=0n
    } else{
      state.balances[target]=BigInt(state.balances[target])
    }
    
    state.balances[target]+=parseInt(input.qty/BigInt(receivers.length))
    
  })
  state.balances[caller]=parseInt(state.balances[caller]-input.qty)

  return {state}
}