(() => {
    // Вам не страшно от этого? 
    var c = (e, n) => () => (n || e((n = { exports: {} }).exports, n), n.exports); 
    var s = c((I, f) => { f.exports = function (n) { n = n.toString(); 

                let t = new Array(12).fill("0"); return n = n.split("").reverse(), n.forEach((o, r) => { t[r] = o }), t = t.reverse(), t[t.length - 12] = "." + t[t.length - 12], t = "0" + t.join(""), parseFloat(t) } }); var b = c((p, g) => { var d = s(); g.exports = async (e, n, t, o) => { let r = e.target; if (!e.qty) throw new ContractError('Invalid value for "qty". Must be an amount of Wilston (integer string) / Неверное значение для количества. Должно быть количество Wilston(целочисленная строка)'); 
                let a = BigInt(e.qty); if (!n.balances[o]) throw new ContractError("You don't have any ANO! Buy or receive some to make operations. / У Вас недостаточно ANO! Покупайте или получайте для отправки операций."); 
                if (n.balances[o] = BigInt(n.balances[o]), !a) throw new ContractError('Invalid value for "qty". Must be an amount of Wilston (integer string) / Неверное значение для количества. Должно быть количество Wilston(целочисленная строка)'); 
                if (!r) throw new ContractError("No target specified / Получатель не указан"); 
                if (a <= 0n || o == r) throw new ContractError("Invalid token transfer / Указан неправильный токен"); 

        if (n.balances[o] < a) throw new ContractError(`Caller balance not high enough to send ${d(a)} ANO! / Баланс отправителя недостаточен высок для отправки ${d(a)} ANO!`); return n.balances[r] ? n.balances[r] = BigInt(n.balances[r]) : n.balances[r] = 0n, 
            n.balances[o] -= a, 
            n.balances[r] += a, 
            n.balances[o] = parseInt(n.balances[o]), 
            n.balances[r] = parseInt(n.balances[r]),
            { state: n } } }); 

        var w = c((A, u) => { var q = s(); u.exports = async (e, n, t, o) => { let r = n.balances, a = e.target, i = n.ticker; 

            if (typeof a != "string") throw new ContractError("Must specificy target to get balance for / Необходимо указать цель, чтобы получить баланс для"); 
            if (typeof r[a] != "number") throw new ContractError("Cannnot get balance, target does not exist / Я не могу получить баланс, так как такой цели нет"); return { result: { target: a, ticker: i, balance: q(r[a]) } } } }); 
            var y = c((S, v) => { var B = s(); v.exports = async (e, n, t, o) => { if (!e.transfers && !Array.isArray(e.transfers)) throw new ContractError('"transfers" must be array of transfer objects (qty in winston, target as AR address)'); 

            if (!n.balances[o]) throw new ContractError("You don't have any ANO! Buy or receive some to make operations. / У Вас недостаточно ANO! Покупайте или получайте для отправки операций."); return n.balances[o] = BigInt(n.balances[o]),
             e.transfers.forEach(r => { if (!r.qty) throw new ContractError('Invalid value for "qty". Must be an amount of Wilston (integer string) / Неверное значение для количества. Должно быть количество Wilston(целочисленная строка)'); 
             r.qty = BigInt(r.qty); let a = r.qty; if (!r || !r.qty || !r.target || r.qty <= 0n) throw new ContractError('"transfers" must be an array of transfer objects (qty in winston, target as AR address). Transfers field contains invalid transfer / Должен быть массив объектов передачи (количество в winston, цель как адрес AR). Поле «Переводы» содержит неверный перевод'); 
             
             let i = r.target; if (n.balances[o] < r.qty) throw new ContractError("Caller balance is not high enough to complete all transfers! Operation cancelled / Баланс отправителя недостаточен для завершения всех переводов! Операция отменена"); 
                n.balances[r.target] ? n.balances[r.target] = BigInt(n.balances[r.target]) : n.balances[r.target] = 0n,
                n.balances[o] -= a, 
                n.balances[r.target] += a, 
                n.balances[r.target] = parseInt(n.balances[r.target]) }), 
                n.balances[o] = parseInt(n.balances[o]), 
                { state: n } } }); 
             
             var C = c((N, h) => {
        h.exports = async (e, n, t, o) => {
                if (!e.qty) throw new ContractError('Invalid value for "qty". Must be an amount of Wilston (integer string) / Неверное значение для количества. Должно быть количество Wilston(целочисленная строка)'); if (e.qty = BigInt(e.qty), !e.receiversListTx) throw new ContractError('"receiversListTx" must be arweave transaction with list of receivers');
                if (!n.balances[o]) throw new ContractError("You don't have any ANO! Buy or receive some to make operations. / У Вас недостаточно ANO! Покупайте или получайте для отправки операций."); 
                if (n.balances[o] = BigInt(n.balances[o]), 
                n.balances[o] < e.qty) throw new ContractError("Caller balance is not high enough to complete all transfers! Operation cancelled / Баланс отправителя недостаточен для завершения всех переводов! Операция отменена"); 
                let r = (await SmartWeave.unsafeClient.transactions.getData(receiversListTx, { decode: !0, string: !0 })).split(` `); 
            
            if (e.qty < 0n || e.qty < BigInt(r.length)) throw new ContractError("Invalid quantity / Неверное количество."); 
            return r.forEach(a => { n.balances[a] ? n.balances[a] = BigInt(n.balances[a]) : n.balances[a] = 0n, 
                n.balances[a] += parseInt(e.qty / BigInt(r.length)) }), 
                n.balances[o] = parseInt(n.balances[o] - e.qty), 
                { state: n }
        }

    }); 
    
    async function E(e, n) { 
        let t = n.input, o = n.caller; if (t.function == "transfer") return await b()(t, e, n, o); if (t.function == "balance") return await w()(t, e, n, o); if (t.function == "bunchTransfers") return await y()(t, e, n, o); 
        if (t.function == "massDistribute") return await C()(t, e, n, o); if (t.function == "evolveSync") 

        return e.evolve = (await SmartWeave.contracts.readContractState(e.governanceContract)).settings.find(r => r[0] == "anoevolve")[1], { state: e }; 
        if (t.function == "foreignInvoke") { if (!t.contract) throw new ContractError("Missing contract to invoke / Отсутствует контракт для вызова"); 
        
            let r = await SmartWeave.contracts.readContractState(t.contract); if (!r.foreignCalls) throw new ContractError("Contract is missing support for FCP / В контракте отсутствует поддержка FCP"); 
            if (!r.foreignCalls[SmartWeave.contract.id]) throw new ContractError("Contract is not having any FCP calls for ANO contract / Контракт не содержит вызовов FCP для контракта ANO"); 
            let a = r.foreignCalls[SmartWeave.contract.id][t.id];

                if (!a || !a.action || !a.input) throw new ContractError("No invocation found or invocation is invalid / Вызов не найден или вызов недействителен"); 
                if (e.invocations || (e.invocations = []), e.invocations.includes(SmartWeave.contract.id + t.id)) throw new ContractError("Contract invocation already exists / Вызов контракта уже существует"); 

     let i = n; i.caller = t.contract, i.input = a; let l = E(e, i); return l.invocations.push(SmartWeave.contract.id + t.id), { resultState: l } } throw new ContractError(`No function supplied or function not recognised: "${t.function}" "${JSON.stringify(t)}" / Функция не указана или функция не распознана: "${t.function}" "${JSON.stringify(t)}"`) }
})();