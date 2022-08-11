export async function handle(state, action) {

  let input = action.input;
  let caller = action.caller;

  if (input.function == 'transfer') {
    return await (require("./functions/transfer"))(input, state, action, caller)
  } else if (input.function == 'balance') {
    return await (require("./functions/balance"))(input, state, action, caller)

  } else if (input.function == "bunchTransfers") {
    return await (require("./functions/bunchTransfers"))(input, state, action, caller)
  }else if(input.function=="massDistribute"){
    return await (require("./functions/massDistribute"))(input,state,action,caller)
  }

  else if(input.function=="evolveSync"){
    state.evolve=(await SmartWeave.contracts.readContractState(state.governanceContract)).settings.find(setting=>setting[0]=="anoevolve")[1]
    return {state}

  }else if(input.function=="foreignInvoke"){
    if (!input.contract) {
      throw new ContractError(`Missing contract to invoke / Отсутствует контракт для вызова`);
    }
    const foreignState = await SmartWeave.contracts.readContractState(input.contract);
    
    if (!foreignState.foreignCalls) {
      throw new ContractError(`Contract is missing support for FCP / В контракте отсутствует поддержка FCP`);
    }
    if(!foreignState.foreignCalls[SmartWeave.contract.id]){
      throw new ContractError(`Contract is not having any FCP calls for ANO contract / Контракт не содержит вызовов FCP для контракта ANO`);
    }
 
    const invocation = foreignState.foreignCalls[SmartWeave.contract.id][input.id];
    if(!invocation||!invocation.action||!invocation.input){
      throw new ContractError(`No invocation found or invocation is invalid / Вызов не найден или вызов недействителен`);
    }

    if(!state.invocations){
      state.invocations=[]
    }

    if (state.invocations.includes(SmartWeave.contract.id+input.id)) {
      throw new ContractError(`Contract invocation already exists / Вызов контракта уже существует`);
    }

      const foreignAction = action;
      foreignAction.caller = input.contract;
      foreignAction.input = invocation;

      const resultState = handle(state, foreignAction);
      resultState.invocations.push(SmartWeave.contract.id+input.id)
      return { resultState };
  }
  throw new ContractError(`No function supplied or function not recognised: "${input.function}" "${JSON.stringify(input)}" / Функция не указана или функция не распознана: "${input.function}" "${JSON.stringify(input)}"`);
}

