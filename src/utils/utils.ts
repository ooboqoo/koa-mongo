/**
 * how to use:
 * 
 * ```
 * async function test() {
 *   console.log('Hello');
 *   await sleep(1000);
 *   console.log('world!');
 * }
 * ```
 */
export function sleep(ms: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}
