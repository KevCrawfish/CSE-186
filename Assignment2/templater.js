/**
 * CSE186 Assignment 2
 * Kevin Crawford
 * Resources used: https://developer.mozilla.org/en-US/docs/Web
 */
class Templater {
  /**
   * Create a templater
   * @param {string} template - A {{ }} tagged string
   */
  constructor(template) {
    if (template === undefined) {
      return;
    }
    this.str = template.split(' ');
  }

  /**
   * Apply map to template to generate string
   * @param {object} map Object with propeties matching tags in template
   * @param {boolean} strict Throw an Error if any tags in template are
   *     not found in map
   * @return {string} template with all tags replaced
   * @throws An Error if strict is set and any tags in template are not
   *     found in map
   */
  apply(map, strict) {
    if (this.str === undefined) {
      return this.str;
    }

    // const re = /\{\{[a-zA-Z]+\}\}/;
    const reNb = /(?<=\{\{)[a-zA-Z]+(?=\}\})/g;

    let exp = this.str.map((str, index) => {
      if (str.match(reNb) !== null) {
        let rep = str.match(reNb);
        let arr = [];
        for (const prop in map) {
          for (let i in rep) {
            if (prop == rep[i]) {
              arr = arr.concat(map[prop]);
            }
          }
        }
        if ((strict) && (arr.length === 0)) {
          throw 'Error';
        } else {
          return arr.join('');
        }
      } else {
        if (str.includes('{') || str.includes('}')) {
          return '';
        }
        return str;
      }
    });

    exp = exp.filter((str) => str);
    return exp.join(' ');
  }
}

// To satisfy linter rules
new Templater(undefined).apply();

module.exports = Templater;
