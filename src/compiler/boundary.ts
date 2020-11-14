const boundaryTestRegex = /^----[a-z0-9]{16}$/;

export function generateBoundary(): string {
  let result = '----';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 16; i++) {
    result += characters[Math.floor(Math.random() * charactersLength)];
  }
  return result;
}

export function validateBoundary(boundary: string): boolean {
  return boundaryTestRegex.test(boundary);
}
