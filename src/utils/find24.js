"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find24 = void 0;
function find24(number) {
    function getPermutations(stringNumbers) {
        if (stringNumbers.length === 1) {
            return [stringNumbers];
        }
        let perms = [];
        for (let i = 0; i < stringNumbers.length; i++) {
            let first = stringNumbers[i];
            let rest = stringNumbers.slice(0, i).concat(stringNumbers.slice(i + 1));
            let restPerms = getPermutations(rest);
            restPerms.forEach((subPerm) => {
                perms.push([first].concat(subPerm));
            });
        }
        return perms;
    }
    function permutationOperators(operators) {
        let permutations = [];
        operators.forEach((op1) => {
            operators.forEach((op2) => {
                operators.forEach((op3) => {
                    permutations.push([op1, op2, op3]);
                });
            });
        });
        return permutations;
    }
    function generateExpressions(numbers, ops) {
        let [number1, number2, number3, number4] = numbers;
        let [op1, op2, op3] = ops;
        return [
            `(${number1} ${op1} ${number2}) ${op2} (${number3} ${op3} ${number4})`,
            `((${number1} ${op1} ${number2}) ${op2} ${number3}) ${op3} ${number4}`,
            `${number1} ${op1} ((${number2} ${op2} ${number3}) ${op3} ${number4})`,
            `${number1} ${op1} (${number2} ${op2} (${number3} ${op3} ${number4}))`,
            `(${number1} ${op1} (${number2} ${op2} ${number3})) ${op3} ${number4}`,
        ];
    }
    let formulas = new Set();
    let permutations = getPermutations(number.split(''));
    permutations.forEach((permutation) => {
        let operators = permutationOperators(["+", "-", "*", "/"]);
        operators.forEach((ops) => {
            let expressions = generateExpressions(permutation, ops);
            expressions.forEach((expr) => {
                if (eval(expr) === 24) {
                    formulas.add(expr);
                }
            });
        });
    });
    return Array.from(formulas);
}
exports.find24 = find24;
