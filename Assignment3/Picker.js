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
* @param {Date} date current date
*/
function setDate(document, months, date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0);
  const prevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
  document.getElementById('month').textContent = months[date.getMonth()];
  document.getElementById('year').textContent = date.getFullYear();
  let d = firstDay.getDay();
  let j = 0;
  const boundDay = new Date(date.getFullYear(), date.getMonth(), 1-d);
  for (let i = boundDay.getDate(); i <= prevMonth.getDate(); i++) {
    if (boundDay.getDate() != 1) {
      document.getElementById('d'+j).classList.add('grey');
    }
    document.getElementById('d'+j++).textContent = i;
  }
  for (let i = 1; i <= lastDay.getDate(); i++) {
    document.getElementById('d'+d++).textContent = i;
  }
  j = 1;
  for (d; d <=41; d++) {
    document.getElementById('d'+d).classList.add('grey');
    document.getElementById('d'+d).textContent = j++;
  }
}

/**
* Replace contents of innerHTML with next month
* @param {object} document
* @param {array} months array with list of months
* @param {Date} date current date
*/
function nextMonth(document, months, date) {
  for (let d = 0; d <= 41; d++) {
    document.getElementById('d'+d).removeAttribute('class');
  }
  const thisMonth = new Date(date.getFullYear(), date.getMonth()+1, 1);
  date.setDate(thisMonth.getDate());
  date.setMonth(thisMonth.getMonth());
  if (date.getFullYear() !== thisMonth.getFullYear()) {
    date.setFullYear(thisMonth.getFullYear());
  }
  setDate(document, months, date);
}

/**
* Replace contents of innerHTML with next month
* @param {object} document
* @param {array} months array with list of months
* @param {Date} date current date
*/
function prevMonth(document, months, date) {
  for (let d = 0; d <= 41; d++) {
    document.getElementById('d'+d).removeAttribute('class');
  }
  const thisMonth = new Date(date.getFullYear(), date.getMonth()-1, 1);
  date.setDate(thisMonth.getDate());
  date.setMonth(thisMonth.getMonth());
  if (date.getFullYear() !== thisMonth.getFullYear()) {
    date.setFullYear(thisMonth.getFullYear());
  }
  setDate(document, months, date);
}

window.addEventListener('DOMContentLoaded', function(e) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date();
  document.getElementById('d'+(date.getDate()+2)).classList.add('pick');
  setDate(document, months, date);
  document.getElementById('next').addEventListener('click', function(e) {
    nextMonth(document, months, date);
  });
  document.getElementById('next').className = 'enabledButton';
  document.getElementById('prev').addEventListener('click', function(e) {
    prevMonth(document, months, date);
  });
  document.getElementById('prev').className = 'enabledButton';
});

// To satisfy linter rules
new Picker();
