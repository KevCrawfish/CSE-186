/**
 * CSE186 Assignment 3 - Advanced
 */
class Picker {
  /**
   * Create a date picker
   * @param {string} containerId id of a node the Picker will be a child of
   */
  constructor(containerId) {
  }
}

/**
* Replace contents of picker with current month
* @param {object} document
* @param {array} months array with list of months
*/
function currentMonth(document, months) {
  const date = new Date();
  const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0);
  const lastMDay = new Date(date.getFullYear(), date.getMonth(), 0);
  document.getElementById('month').textContent = months[date.getMonth()];
  document.getElementById('year').textContent = date.getFullYear();
  date.setDate(1);
  let d = date.getDay();
  let j = 0;
  const boundDay = new Date(date.getFullYear(), date.getMonth(), 1-d);
  for (i = boundDay.getDate(); i <= lastMDay.getDate(); i++) {
    document.getElementById('d'+j++).textContent = i;
  }

  for (i = 1; i <= lastDay.getDate(); i++) {
    document.getElementById('d'+d++).textContent = i;
  }
}

/**
* Replace contents of innerHTML with next month
* @param {object} document
* @param {array} months array with list of months
*/
function nextMonth(document, months) {
  console.log('ok');
}

/**
* Replace contents of innerHTML with next month
* @param {object} document
* @param {array} months array with list of months
*/
function prevMonth(document, months) {
  console.log('yeah');
}

window.addEventListener('DOMContentLoaded', function(e) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  currentMonth(document, months);
  document.getElementById('next').addEventListener('click', function(e) {
    nextMonth(document, months);
  });
  document.getElementById('next').className = 'enabledButton';
  document.getElementById('prev').addEventListener('click', function(e) {
    prevMonth(document, months);
  });
  document.getElementById('prev').className = 'enabledButton';
});

// To satisfy linter rules
new Picker();
