/**
 * Calculator module with basic arithmetic operations
 */

/**
 * Adds two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Subtracts two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The difference of a and b
 */
function subtract(a, b) {
  return a - b;
}

/**
 * Multiplies two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The product of a and b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Divides two numbers
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} The quotient of a and b
 * @throws {Error} If b is zero (division by zero)
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}

/**
 * Returns the remainder of division (modulus)
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} The remainder of a % b
 * @throws {Error} If b is zero (modulus by zero)
 */
function modulus(a, b) {
  if (b === 0) {
    throw new Error('Modulus by zero is not allowed');
  }
  return a % b;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulus
};
