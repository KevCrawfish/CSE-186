/**
 * CSE186 Assignment 3 - Basic
 */
class Templater {
  /**
   * Create a templater
   * @param {string} template - A {{ }} tagged table header and
   * data elements
   */
  constructor(template) {
  }

  /**
   * Replace the contents of {{ }} tagged table header and data
   * elements in document with values found in the supplied JSON
   * @param {object} document
   * @param {string} json with propeties matching tags in document
   */
  byTag(document, json) {
    let arr = document.getElementsByTagName('th');
    const map = JSON.parse(json);
    for (let i = 0; i < arr.length; i++) {
      let flag = true;
      for (const prop in map) {
        if ((map.hasOwnProperty(prop)) &&
          (prop != '') &&
            (prop == arr[i].textContent.match(/(?<=\{\{).+(?=\}\})/))) {
          arr[i].textContent = map[prop];
          flag = false;
          break;
        }
      }
      if(flag === true) {
        arr[i].textContent = '';
      }
    }

    arr = document.getElementsByTagName('td');
    for (let i = 0; i < arr.length; i++) {
      let flag = true;
      for (const prop in map) {
        if ((map.hasOwnProperty(prop)) &&
          (prop != '') &&
            (prop == arr[i].textContent.match(/(?<=\{\{).+(?=\}\})/))) {
          arr[i].textContent = map[prop];
          flag = false;
          break;
        }
      }
      if(flag === true) {
        arr[i].textContent = '';
      }
    }
  }

  /**
   * Replace the contents of table header and data elements in
   * in document with id'd content found in the supplied JSON
   * @param {object} document
   * @param {string} json with propeties matching element ids in document
   */
  byId(document, json) {
  }
}

// To satisfy linter rules
new Templater();
