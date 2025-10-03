let globalVariable = "I am a global variable";

function showScope() {
	let localVariable = "I am a local variable";
	console.log(localVariable)
}

console.log(globalVariable);
console.log(localVariable);

showScope();