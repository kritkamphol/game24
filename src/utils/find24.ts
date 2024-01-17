export function find24(number: string): string[] {
    function getPermutations(stringNumbers: string[]): string[][] {   // ใช้เพื่อแยกตัวเลขออกมาเป็นกลุ่มยกเว้นเลขที่ตรงกับ index 
        if (stringNumbers.length === 1) {
            return [stringNumbers]
        }
        let perms: string[][] = []
        for (let i = 0; i < stringNumbers.length; i++) {
            let first: string = stringNumbers[i]
            let rest: string[] = stringNumbers.slice(0, i).concat(stringNumbers.slice(i + 1))
            let restPerms: string[][] = getPermutations(rest)
            restPerms.forEach((subPerm: string[]) => {
                perms.push([first].concat(subPerm))
            })
        }
        return perms
    }

    function permutationOperators(operators: string[]): string[][] {  // ใช้ในการนำเครื่องหมายไปใส่ให้ครบทุกรูปแบบ
        let permutations: string[][] = []
        operators.forEach((op1: string) => {
            operators.forEach((op2: string) => {
                operators.forEach((op3: string) => {
                    permutations.push([op1, op2, op3])
                })
            })
        })
        return permutations
    }

    function generateExpressions(numbers: string[], ops: string[]): string[] {   //  ใช้ในการจัดรูปแบบโดย ()
        let [number1, number2, number3, number4] = numbers
        let [op1, op2, op3] = ops

        return [
            `(${number1} ${op1} ${number2}) ${op2} (${number3} ${op3} ${number4})`,
            `((${number1} ${op1} ${number2}) ${op2} ${number3}) ${op3} ${number4}`,
            `${number1} ${op1} ((${number2} ${op2} ${number3}) ${op3} ${number4})`,
            `${number1} ${op1} (${number2} ${op2} (${number3} ${op3} ${number4}))`,
            `(${number1} ${op1} (${number2} ${op2} ${number3})) ${op3} ${number4}`,
        ]
    }
    let formulas: Set<string> = new Set()
    let permutations: string[][] = getPermutations(number.split(''))   // ใช้เพื่อแยกตัวเลขออกมาเป็นกลุ่มยกเว้นเลขที่ตรงกับ index 
    permutations.forEach((permutation: string[]) => {
        let operators: string[][] = permutationOperators(["+", "-", "*", "/"])  // ใช้ในการนำเครื่องหมายไปใส่ให้ครบทุกรูปแบบ
        operators.forEach((ops: string[]) => {
            let expressions: string[] = generateExpressions(permutation, ops)  //  ใช้ในการจัดรูปแบบโดย ()
            expressions.forEach((expr: string) => {
                if (eval(expr) === 24) {
                    formulas.add(expr)
                }
            })
        })
    })

    return Array.from(formulas)
}



