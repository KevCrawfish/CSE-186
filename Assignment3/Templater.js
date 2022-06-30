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
    for (let i = 0; i < this.tag.length; i++) {
      const str = this.tag[i].outerHTML.match(/(?<=\{\{)[\w]+(?=\}\})/);
      const regex = new RegExp(
          '(?<=' + str + '\\"\\:\\")[\\w\\s.]+(?=\\")', 'g');
      const find = json.match(regex);
      if (find === null) {
        this.tag[i].innerHTML = this.tag[i].innerHTML.replace(
            /\{\{[\w]+\}\}/, '');
      } else {
        this.tag[i].innerHTML = this.tag[i].innerHTML.replace(
            /\{\{[\w]+\}\}/, find);
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
    const str = this.tag.match(/(?<=\")[A-Z][0-9]+(?=\"\:)/g);
    for (let i = 0; i < str.length; i++) {
      const id = document.getElementById(str[i]);
      const regex = new RegExp(
          '(?<=' + str[i] + '\\"\\:\\")[\\w\\s.]+(?=\\")', 'g');
      const find = this.tag.match(regex);
      id.textContent = find;
    }
  }
}

// To satisfy linter rules
new Templater();
