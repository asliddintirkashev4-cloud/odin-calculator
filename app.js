const calculator = createCalculator();
const displayElement = document.querySelector('#display');
const expression = document.querySelector('#expression');
const symbols = {'+':'+','-':'−','*':'×','/':'÷'};
function render() {
  const state=calculator.snapshot();
  displayElement.textContent=state.display;
  displayElement.style.fontSize=state.display.length>12?'27px':'39px';
  expression.textContent=state.operator?`${state.firstNumber} ${symbols[state.operator]}`:' ';
  document.querySelector('#error').textContent=state.error;
  document.querySelector('[data-action="decimal"]').disabled=state.display.includes('.')&&!state.waitingForNumber&&!state.resultShown;
}
function press(action,value) {
  if(action==='digit') calculator.digit(value);
  if(action==='operator') calculator.chooseOperator(value);
  if(action==='decimal') calculator.decimal();
  if(action==='equals') calculator.equals();
  if(action==='clear') calculator.clear();
  if(action==='backspace') calculator.backspace();
  if(action==='sign') calculator.toggleSign();
  render();
}
document.querySelector('.keys').addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(button) press(button.dataset.action,button.dataset.value);
});
document.addEventListener('keydown',event=>{
  if(event.ctrlKey||event.metaKey||event.altKey) return;
  if(event.target.matches('input,textarea,select')) return;
  let action;
  let value=event.key;
  if(/^[0-9]$/.test(event.key)) action='digit';
  if(['+','-','*','/'].includes(event.key)) action='operator';
  if(event.key==='.') action='decimal';
  if(event.key==='='||event.key==='Enter') action='equals';
  if(event.key==='Backspace') action='backspace';
  if(event.key==='Escape'||event.key.toLowerCase()==='c') action='clear';
  if(action){event.preventDefault();press(action,value);}
});
render();
