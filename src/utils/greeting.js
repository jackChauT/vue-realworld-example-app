export default {
  isMaster(category) {
    if (category.toLowerCase() == "master") {
      return true;
    }
    return false;
  }
};
