let wilstonToANO=require("../helpers/wilstonToANO")
module.exports=async (input,state,caller)=>{
  let target = input.target;

  if (!input.qty) {
    throw new ContractError(`Invalid value for "qty". Must be an amount of Wilston (integer string) / Неверное значение для количества. Должно быть количество Wilston(целочисленная строка)`);
  }

  let qty = BigInt(input.qty);

  if(!state.balances[caller]){
      throw new ContractError("You don't have any ANO! Buy or receive some to make operations.")
  }

  state.balances[caller]=BigInt(state.balances[caller])
  
  if (!qty) {
    throw new ContractError(`Invalid value for "qty". Must be an amount of Wilston (integer string) / Неверное значение для количества. Должно быть количество Wilston(целочисленная строка)`);
  }
  
  if (!target) {
    throw new ContractError(`No target specified / Цель не найдена`);
  }

  if (qty <= 0n || caller == target) {
    throw new ContractError('Invalid token transfer / Недействительный токен перевода');
  }

  if (state.balances[caller] < qty) {
    throw new ContractError(`Caller balance not high enough to send ${wilstonToANO(qty)} ANO! / Баланс отправителя недостаточен для отправки ${wilstonToANO(qty)} ANO!`);
  }

 
  if(!state.balances[target]) {
    state.balances[target]=0n
  } else{
    state.balances[target]=BigInt(state.balances[target])
  }

  state.balances[caller]-=qty
  state.balances[target]+=qty
  state.balances[caller] = parseInt(state.balances[caller])
  state.balances[target] = parseInt(state.balances[target])
  
  return { state };
}