module.exports = (field, ...reqdField) => {
    return function(next) {
        this.populate(field, reqdField);
        next();
    }
}