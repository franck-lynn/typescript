// https://www.bilibili.com/video/BV1Ks411575U/?spm_id_from=333.788.recommend_more_video.-1&vd_source=a9a0c57b5d0d771fbd9b6bec7ba901ee
// 先描述出无向图
export const graph = {
  A: ["B", "C"],
  B: ["A", "C", "D"],
  C: ["A", "B", "D", "E"],
  D: ["B", "C", "E", "F"],
  E: ["C", "D"],
  F: ["D"],
}
// 从A点开始 答案是: A B C D E F
type Graph = Record<string, string[]>
const bfs = (graph: Graph, s: string) => {
  const quene: string[] = [] // 定义一个空的数组, 用于存放节点(key值),
  quene.push(s) // 把 任意一个节点作为开始节点放进来
  const seen = new Set<string>() // 用过的节点放进这个集合,
  seen.add(s)
  while (quene.length > 0) {
    // 当第1个节点放进来后, quene 就不为空, 进入循环
    // 从头部出去 第1个节点, 弹出的是 节点的 key 值
    const vertex = quene.shift()
    // 获取这个节点
    let nodes: string[] = []
    if (vertex) {
      nodes = graph[vertex]
    }

    for (const w of nodes) {
      if (!seen.has(w)) {
        // 节点没有见过, 就把节点放入队列
        quene.push(w)
        // 同时, 把这个节点放进 seen 集合, 表示已经见过了
        seen.add(w)
      }
    }
    process.stdout.write(vertex + ", ")
  }
}

bfs(graph, "E")
