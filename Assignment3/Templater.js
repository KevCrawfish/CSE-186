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
      if (template === undefined) {
        return;
      }
      this.tag = template;
    }

  /**
   * Replace the contents of {{ }} tagged table header and data
   * elements in document with values found in the supplied JSON
   * @param {object} document
   * @param {string} json with propeties matching tags in document
   */
  byTag(document, json) {
    for (let i = 0; i < this.tag.length; i++){
      let str = this.tag[i].outerHTML.match(/(?<=\{\{)[\w]+(?=\}\})/);
      let regex = new RegExp('(?<=' + str + '\\"\\:\\")[\\w\\s]+(?=\\"\\,)', 'g');
      let find = json.match(regex);
      this.tag[i].innerHTML = this.tag[i].innerHTML.replace(/\{\{[\w]+\}\}/, find);
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

function funcByTag() {
  let t = new Templater(document.getElementsByTagName('th'));
  t.byTag(document, document.getElementById('json').value);
}

// To satisfy linter rules
new Templater();
