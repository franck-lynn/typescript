export type Point = {
  x: number
  y: number
}

const moved = (p1: Point, dx: number, dy: number) => ({
  x: p1.x + dx,
  y: p1.y + dy,
})
console.log(moved({ x: 10, y: 5 }, 30, 12))
