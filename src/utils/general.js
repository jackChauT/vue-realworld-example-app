module.exports = {
  isEmpty(data) {
    return (
      data == "" ||
      data == null ||
      typeof data == "undefined" ||
      data.length == 0
    );
  }
};
