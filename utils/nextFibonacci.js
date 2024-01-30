const nextFibonacci = (num) => {
  if (num === 0) return 1;
  else if (num === 1) return 2;

  let a = 0;
  let b = 1;
  let next;

  while (true) {
    next = a + b;
    if (next > num) return next;
    a = b;
    b = next;
  }
};

module.exports = nextFibonacci;
