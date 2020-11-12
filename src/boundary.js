const boundaryTestRegex = /^----[a-z0-9]{16}$/;

function generateBoundary() {
  let result = '----';
  let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < 16; i++) {
    result += characters[Math.floor(Math.random() * charactersLength)];
  }
  return result;
}

function validateBoundary(boundary) {
  return boundaryTestRegex.test(boundary);
}

module.exports = {
  boundaryTestRegex,
  generateBoundary,
  validateBoundary,
};
