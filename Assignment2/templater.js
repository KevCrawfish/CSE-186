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
    if (template === undefined){
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

    const re = /\{\{[a-zA-Z]+\}\}/;
    const re_nb = /(?<=\{\{)[a-zA-Z]+(?=\}\})/;

    let exp = this.str.map(str => {
      if (str.match(re_nb) !== null) {
        for (const prop in map) {
          if (prop == str.match(re_nb)){
            return map[prop];
          }
        }
      } else {
        return str;
      }
    });

    exp = exp.filter(str => str !== undefined);
    return exp.join(' ');
  }
}

// To satisfy linter rules
new Templater(undefined).apply();

module.exports = Templater;
