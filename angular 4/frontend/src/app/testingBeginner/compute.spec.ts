import { compute } from './compute';

describe('compute', () => {
  it('should return 0 if input negative', () => {
    const result = compute(-254);
    expect(result).toBe(0);
  });
  it('should increment input if it is positive', () => {
    const result = compute(1);
    expect(result).toBe(2);
  });
});
