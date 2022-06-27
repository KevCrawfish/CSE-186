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
    this.str = template;
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

    const re = /\{\{[A-Za-z]+\}\}/g;
    const reg = /(?<=\{\{)[A-Za-z]+(?=\}\})/;
    const rep = this.str.match(re);
    let flag = false;
    
    for (const i in rep) {
      let regex = new RegExp(rep[i], 'g');
      for (const prop in map) {
        if (rep[i].match(reg) == prop) {
          this.str = this.str.replace(regex, map[prop]);
        }
      }
      if (strict) {
        throw new Error();
      } else {
        this.str = this.str.replace(regex, '');
      }
    }

    this.str = this.str.replace(/\{\{ *[A-Za-z]+ *\}\}/, '');

    return this.str;
  }
}

// To satisfy linter rules
new Templater(undefined).apply();

module.exports = Templater;
