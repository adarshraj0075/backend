// these two fun() and sum() are examples of custom
//modules

function fun(){
    for(let i=0;i<9;i++){
        console.log(i);
    }
}

function sum (a,b){
    return `the sum of two numbers is ${a+b}`;
}
//esm export method
// export {fun,sum};

//cjs export method
module.exports={fun,sum};