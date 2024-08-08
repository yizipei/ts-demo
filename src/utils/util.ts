enum types {
  a,
  b
}
type tt = keyof typeof types
export function test<T extends keyof types>(qq: T): Array<T> {
  console.log(111)
  return [qq]
}
test('toFixed')


const data = ['hello', 'world'] as const;
type Greeting = typeof data[number];

