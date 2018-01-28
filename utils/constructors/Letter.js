function Letter(character) {
    this.character = character;
    this.visible = false;
    this.displayState = function () {
        if(this.visible){
            return ` ${this.character} `;
        } else {
            return " * ";
        }
    }
}

module.exports = Letter;