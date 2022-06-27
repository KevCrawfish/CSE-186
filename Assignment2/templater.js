/**
 * CSE186 Assignment 2
 * Kevin Crawford
 * Resources used: https://developer.mozilla.org/en-US/docs/Web
 */
class Templater {
  /**
   * Create a templater
   * @param {string} template - A {{ }} tag string
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
    const tag = /(?<=\{\{)[A-Za-z]+(?=\}\})/;
    const rep = this.str.match(re);

    for (let i = 0; i < rep.length; i++) {
      const regex = new RegExp(rep[i], 'g');
      let flag = false;
      for (const prop in map) {
        if (rep[i].match(tag) == prop) {
          this.str = this.str.replace(regex, map[prop]);
          flag = true;
        }
      }
      if (strict && flag === false) {
        throw new Error();
      } else {
        const reg = new RegExp(rep[i] + /\s/, 'g');
        this.str = this.str.replace(reg, '');
      }
    }

    this.str = this.str.replace(/\{\{ *[A-Za-z]+ *\}\}\s/, '');

    return this.str;
  }
}

// To satisfy linter rules
new Templater(undefined).apply();

module.exports = Templater;
