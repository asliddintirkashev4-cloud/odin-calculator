const test=require('node:test');
const assert=require('node:assert/strict');
const {operate,createCalculator}=require('./calculator.js');
function run(sequence) {
  const c=createCalculator();
  for(const key of sequence){
    if(/^[0-9]$/.test(key)) c.digit(key);
    else if(['+','-','*','/'].includes(key)) c.chooseOperator(key);
    else if(key==='=') c.equals();
    else if(key==='.') c.decimal();
    else if(key==='C') c.clear();
    else if(key==='B') c.backspace();
  }
  return c.snapshot();
}
test('four operations and explicit divide-by-zero error',()=>{
  assert.equal(operate('+',3,5),8);assert.equal(operate('-',3,5),-2);
  assert.equal(operate('*',3,5),15);assert.equal(operate('/',15,3),5);
  assert.throws(()=>operate('/',2,0),RangeError);
});
test('evaluates pairs from left to right',()=>{
  assert.equal(run('12+7-1=').display,'18');
  assert.equal(run('2+3*4=').display,'20');
});
test('consecutive operators replace the pending operator',()=>{
  assert.equal(run('2++').display,'2');
  assert.equal(run('2+*3=').display,'6');
  assert.equal(run('2+=').display,'2');
  assert.equal(run('=').display,'0');
});
test('decimals are unique, rounded and work after a result',()=>{
  assert.equal(run('1..2+0.1=').display,'1.3');
  assert.equal(run('0.1+0.2=').display,'0.3');
  assert.equal(run('1/3=').display,'0.333333333333');
  assert.equal(run('2+2=.5+1=').display,'1.5');
});
test('fresh digits, clearing and backspace reset the correct state',()=>{
  assert.equal(run('2+3=7').display,'7');
  assert.equal(run('99+3C8=').display,'8');
  assert.equal(run('123B').display,'12');
  assert.equal(run('1B').display,'0');
});
test('division by zero is recoverable and does not produce infinity',()=>{
  assert.equal(run('8/0=').display,'Error');
  assert.match(run('8/0=').error,/zero/);
  assert.equal(run('8/0=7+1=').display,'8');
});
