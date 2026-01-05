export function twoSum(inputArray: number[], targetSum: number): number[] {
  const valueToIndexMap = new Map<number, number>();

  for (let currentIndex = 0; currentIndex < inputArray.length; currentIndex++) {
    const currentValue = inputArray[currentIndex];
    const requiredComplement = targetSum - currentValue;

    if (valueToIndexMap.has(requiredComplement)) {
      return [valueToIndexMap.get(requiredComplement)!, currentIndex];
    }

    valueToIndexMap.set(currentValue, currentIndex);
  }

  return [];
}
