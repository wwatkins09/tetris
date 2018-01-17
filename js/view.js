const Well = require('./well.js');
const $ = require('jQuery');

class View {

  constructor($el) {
    this.$el = $el;
    this.createGrid();
  }


  createGrid() {
    let newHtml = '';
    for (let i = 0; i < 20; i++) {
      newHtml += "<ul>";
      for (let j = 0; j < 10; j++) {
        newHtml += "<li></li>";
      }
      newHtml += "</ul>";
    }

    this.$el.innerHTML = newHtml;
  }

}

module.exports = View;
