function add(a,b) { return a+b; }
function subtract(a,b) { return a-b; }
function multiply(a,b) { return a*b; }
function divide(a,b) {
  if (b === 0) throw new RangeError('Nice try. You cannot divide by zero.');
  return a/b;
}
function operate(operator,a,b) {
  if (operator === '+') return add(a,b);
  if (operator === '-') return subtract(a,b);
  if (operator === '*') return multiply(a,b);
  if (operator === '/') return divide(a,b);
  throw new RangeError('Unknown operator.');
}
function formatResult(value) {
  if (!Number.isFinite(value)) throw new RangeError('That number is too large.');
  return String(Number(value.toPrecision(12)));
}

function createCalculator() {
  let display = '0';
  let firstNumber = null;
  let operator = null;
  let waitingForNumber = false;
  let resultShown = false;
  let error = '';
  function clear() {
    display='0'; firstNumber=null; operator=null;
    waitingForNumber=false; resultShown=false; error='';
  }
  function calculate() {
    try { display=formatResult(operate(operator,firstNumber,Number(display))); }
    catch (problem) { display='Error';error=problem.message;operator=null;firstNumber=null;waitingForNumber=false;resultShown=true;return false; }
    return true;
  }
  function digit(value) {
    if (!/^[0-9]$/.test(value)) return;
    if (error || (resultShown && !operator)) clear();
    if (waitingForNumber || resultShown) {
      display=value;waitingForNumber=false;resultShown=false;
    } else if (display === '0') display=value;
    else if (display.replace('-','').length<12) display+=value;
  }
  function decimal() {
    if (error || (resultShown && !operator)) clear();
    if (waitingForNumber || resultShown) { display='0.';waitingForNumber=false;resultShown=false; }
    else if (!display.includes('.') && display.length<12) display+='.';
  }
  function chooseOperator(nextOperator) {
    if (error || !['+','-','*','/'].includes(nextOperator)) return;
    if (operator && !waitingForNumber && !calculate()) return;
    firstNumber=Number(display);
    operator=nextOperator;
    waitingForNumber=true;
    resultShown=false;
  }
  function equals() {
    if (error || operator === null || waitingForNumber) return;
    if (!calculate()) return;
    firstNumber=null;operator=null;waitingForNumber=false;resultShown=true;
  }
  function backspace() {
    if (error) { clear();return; }
    if (waitingForNumber || resultShown) return;
    display=display.length>1?display.slice(0,-1):'0';
    if (display === '-') display='0';
  }
  function toggleSign() {
    if (error || waitingForNumber || display === '0') return;
    display=display.startsWith('-')?display.slice(1):'-'+display;
  }
  function snapshot() { return {display,firstNumber,operator,waitingForNumber,resultShown,error}; }
  return {digit,decimal,chooseOperator,equals,backspace,toggleSign,clear,snapshot};
}
if (typeof module !== 'undefined') module.exports={add,subtract,multiply,divide,operate,formatResult,createCalculator};
