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
* Replace contents of innerHTML with next month
* @param {object} document
* @param {array} months array with list of months
* @param {Date} date current date
*/
function setDate(document, months, date) {
  if (document.getElementsByClassName('today')[0] != undefined) {
    document.getElementsByClassName('today')[0].classList.remove('today');
  }
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0);
  const prevMonth = new Date(date.getFullYear(), date.getMonth(), 0);

  document.getElementById('display').textContent = months[date.getMonth()] + ' ' + date.getFullYear();

  let d = firstDay.getDay();
  let j = 0;
  const boundDay = new Date(date.getFullYear(), date.getMonth(), 1-d);
  for (let i = boundDay.getDate(); i <= prevMonth.getDate(); i++) {
    if (boundDay.getDate() != 1) {
      document.getElementById('d'+j).classList.add('grey', 'before');
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
  Array.from(document.getElementsByClassName('grey'))
      .forEach(x => x.classList.remove('grey', 'before'));

  date.setMonth(date.getMonth()+1);
  setDate(document, months, date);
}

/**
* Replace contents of innerHTML with next month
* @param {object} document
* @param {array} months array with list of months
* @param {Date} date current date
*/
function prevMonth(document, months, date) {
  Array.from(document.getElementsByClassName('grey'))
      .forEach(x => x.classList.remove('grey', 'before'));

  date.setDate(1);
  date.setMonth(date.getMonth()-1);
  setDate(document, months, date);
}

/**
* Replace contents of innerHTML with next month
* @param {object} document
* @param {array} months array with list of months
* @param {Date} date current date
* @param {Integer} dn current #dn
*/
function pickDate(document, months, date, dn) {
  if (document.getElementById('d'+dn).classList.contains('grey')) {
    if (document.getElementById('d'+dn).classList.contains('before')) {
      cur = document.getElementById('d'+dn).textContent;
      prevMonth(document, months, date);
      date.setDate(cur);
      for (let i = 0; i <= 41; i++) {
        if ((document.getElementById('d'+i).textContent == date.getDate()) &&
            (!document.getElementById('d'+i).classList.contains('grey'))) {
          document.getElementById('d'+i).classList.add('today');
          break;
        }
      }
    } else {
      cur = document.getElementById('d'+dn).textContent;
      nextMonth(document, months, date);
      date.setDate(cur);
      for (let i = 0; i <= 41; i++) {
        if ((document.getElementById('d'+i).textContent == date.getDate()) &&
            (!document.getElementById('d'+i).classList.contains('grey'))) {
          document.getElementById('d'+i).classList.add('today');
          break;
        }
      }
    }
  } else {
    if (document.getElementsByClassName('today')[0] != undefined) {
      document.getElementsByClassName('today')[0].classList.remove('today');
    }
    date.setDate(document.getElementById('d'+dn).textContent);
    document.getElementById('d'+dn).classList.add('today');
  }
  console.log(date);
}

window.addEventListener('DOMContentLoaded', function(e) {
  // initial setup for calendar
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date();
  setDate(document, months, date);
  for (let i = date.getDate(); i <= 41; i++) {
    if (document.getElementById('d'+i).textContent == date.getDate()) {
      // set highlight on today's date, change class for css
      document.getElementById('d'+i).classList.add('today');
      break;
    }
  }

  // add functionality for next button
  document.getElementById('next').addEventListener('click', function(e) {
    nextMonth(document, months, date);
  });
  // add functionality for prev button
  document.getElementById('prev').addEventListener('click', function(e) {
    prevMonth(document, months, date);
  });
  // add functionality for returning to today's date
  document.getElementById('display').addEventListener('click', function(e) {
    const today = new Date();
    for (let d = 0; d <= 41; d++) {
      document.getElementById('d'+d).removeAttribute('class');
    }
    date.setDate(today.getDate());
    date.setMonth(today.getMonth());
    date.setFullYear(today.getFullYear());
    setDate(document, months, date);
    for (let i = date.getDate(); i <= 41; i++) {
      if (document.getElementById('d'+i).textContent == date.getDate()) {
        // set highlight on today's date, change class for css
        document.getElementById('d'+i).classList.add('today');
        break;
      }
    }
  });

  // add functionality for picking date
  for (let i = 0; i <= 41; i++) {
    document.getElementById('d'+i).addEventListener('click', function(e) {
      pickDate(document, months, date, i);
    });
  }
});

// To satisfy linter rules
new Picker();
