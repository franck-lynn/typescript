// https://www.bilibili.com/video/BV1Ks411575U/?spm_id_from=333.788.recommend_more_video.-1&vd_source=a9a0c57b5d0d771fbd9b6bec7ba901ee
// 先描述出无向图
const graph = {
  A: ["B", "C"],
  B: ["A", "C", "D"],
  C: ["A", "B", "D", "E"],
  D: ["B", "C", "E", "F"],
  E: ["C", "D"],
  F: ["D"],
}
// 从A点开始 答案是: A B C D E F
type Graph = Record<string, string[]>

const dfs = (graph: Graph, s: string) => {
  // 定义一个空数组, 用于存放节点
  const stack: string[] = []
  // 把任意节点作为开始节点放进来
  stack.push(s)

  const seen = new Set<string>() // 用过的节点放进这个集合,
  seen.add(s)

  while (stack.length > 0) {
    const vertex = stack.pop()

    // 获取这个节点
    let nodes: string[] = []
    if (vertex) {
      nodes = graph[vertex]
    }
    for (const w of nodes) {
      if (!seen.has(w)) {
        // 节点没有见过, 就把节点放入队列
        stack.push(w)
        // 同时, 把这个节点放进 seen 集合, 表示已经见过了
        seen.add(w)
      }
    }
    process.stdout.write(vertex + ", ")
  }
}
dfs(graph, "E")
