let wilstonToANO = require("../helpers/wilstonToANO")
module.exports=async (input,state)=>{
    let balances = state.balances;
    let target = input.target;
    let ticker = state.ticker;
    
    if (typeof target !== 'string') {
      throw new ContractError(`Must specificy target to get balance for`);
    }

    if (typeof balances[target] !== 'number') {
      throw new ContractError(`Cannot get balance, target does not exist`);
    }

    return { result: { target, ticker, balance: wilstonToANO(balances[target] )} };
}