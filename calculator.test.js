const { add, subtract, multiply, divide } = require('./calculator');

describe('Calculator', () => {
  describe('add', () => {
    test('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('should add two negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    test('should add positive and negative numbers', () => {
      expect(add(5, -3)).toBe(2);
    });

    test('should add zero to a number', () => {
      expect(add(5, 0)).toBe(5);
    });

    test('should add decimal numbers', () => {
      expect(add(1.5, 2.3)).toBeCloseTo(3.8);
    });
  });

  describe('subtract', () => {
    test('should subtract two positive numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    test('should subtract two negative numbers', () => {
      expect(subtract(-2, -3)).toBe(1);
    });

    test('should subtract negative from positive', () => {
      expect(subtract(5, -3)).toBe(8);
    });

    test('should subtract zero from a number', () => {
      expect(subtract(5, 0)).toBe(5);
    });

    test('should subtract decimal numbers', () => {
      expect(subtract(5.7, 2.3)).toBeCloseTo(3.4);
    });
  });

  describe('multiply', () => {
    test('should multiply two positive numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    test('should multiply two negative numbers', () => {
      expect(multiply(-3, -4)).toBe(12);
    });

    test('should multiply positive and negative numbers', () => {
      expect(multiply(3, -4)).toBe(-12);
    });

    test('should multiply by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });

    test('should multiply decimal numbers', () => {
      expect(multiply(2.5, 4)).toBe(10);
    });
  });

  describe('divide', () => {
    test('should divide two positive numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    test('should divide two negative numbers', () => {
      expect(divide(-10, -2)).toBe(5);
    });

    test('should divide positive by negative', () => {
      expect(divide(10, -2)).toBe(-5);
    });

    test('should divide decimal numbers', () => {
      expect(divide(7.5, 2.5)).toBe(3);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
    });

    test('should throw error when dividing negative number by zero', () => {
      expect(() => divide(-10, 0)).toThrow('Division by zero is not allowed');
    });

    test('should handle division resulting in decimal', () => {
      expect(divide(7, 3)).toBeCloseTo(2.333333);
    });
  });
});
