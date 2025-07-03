const getLocation = (row, col) => {
  if (row === 0 && col === 0) {
    return 6;
  }
  if (row === 0 && col === 1) {
    return 3;
  }
  if (row === 0 && col === 2) {
    return 1;
  }
  if (row === 1 && col === 0) {
    return 8;
  }
  if (row === 1 && col === 1) {
    return 5;
  }
  if (row === 1 && col === 2) {
    return 2;
  }
  if (row === 2 && col === 0) {
    return 9;
  }
  if (row === 2 && col === 1) {
    return 7;
  }
  if (row === 2 && col === 2) {
    return 4;
  }
  return 0;
};

export default getLocation;
