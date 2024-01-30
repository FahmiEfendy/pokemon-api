const generateFibonacci = (num) => {
  let seq = [];
  let x = 0;
  let y = 1;
  let next;

  for (let i = 0; i < num; i++) {
    seq.push(x);
    next = x + y;
    x = y;
    y = next;
  }

  return seq;
};

module.exports = generateFibonacci;
