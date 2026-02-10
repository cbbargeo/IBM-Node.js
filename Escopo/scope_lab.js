// Escopo global
var globalVar = "Eu sou uma variável global";
let globalLet = "Eu também sou global, mas com escopo de let";
const globalConst = "Eu sou uma constante global";


{
// Escopo de bloco
var blockVar = "Eu sou uma var com escopo de bloco";
let blockLet = "Eu sou um let com escopo de bloco";
const blockConst = "Eu sou um const com escopo de bloco";
}

// Escopo global
console.log(globalVar); // Saída: "Eu sou uma variável global"
console.log(globalLet); // Saída: "Eu também sou global, mas com escopo let"
console.log(globalConst); // Saída: "Eu sou uma constante global"

//Block Scope
//console.log(blockVar);
//console.log(blockLet);

function show(){
    var functionVar = "Sou uma var com escopo de bloco";
    let functionLet = "Sou um let com escopo de bloco";
    const functionConst = "Sou um const com escopo de bloco";
}
show();

console.log(functionVar); // Lança ReferenceError
console.log(functionLet); // Lança ReferenceError
console.log(functionConst); // Lança ReferenceError