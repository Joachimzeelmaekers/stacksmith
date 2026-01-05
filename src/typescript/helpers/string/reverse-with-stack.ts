import { Stack } from "../data-structures/stack";

export function reverseStringWithStack(str: string): string {
  const stack = new Stack<string>();

  for (const char of str) {
    stack.push(char);
  }

  let reversed = "";
  while (!stack.isEmpty()) {
    reversed += stack.pop();
  }

  return reversed;
}
