<script setup lang="ts">
import { ref, computed } from "vue"

interface TreeNode {
  id: number
  name: string
  children?: TreeNode[]
  level?: number
  expanded?: boolean
}

const treeData = ref<TreeNode[]>([
  {
    id: 1,
    name: "Node 1",
    children: [
      {
        id: 2,
        name: "Node 1-1",
        children: [
          {
            id: 3,
            name: "Node 1-1-1",
            children: [
              {
                id: 11,
                name: "Node 1-1-1-1",
              },
              {
                id: 12,
                name: "Node 1-1-1-2",
              },
            ],
          },
          {
            id: 4,
            name: "Node 1-1-2",
          },
        ],
      },
      {
        id: 5,
        name: "Node 1-2",
      },
    ],
    level: 0,
    expanded: true,
  },
  {
    id: 6,
    name: "Node 2",
    children: [
      {
        id: 7,
        name: "Node 2-1",
        children: [
          {
            id: 8,
            name: "Node 2-1-1",
          },
          {
            id: 9,
            name: "Node 2-1-2",
            children: [
              {
                id: 13,
                name: "Node 2-1-2-1",
              },
              {
                id: 14,
                name: "Node 2-1-2-2",
              },
            ],
          },
        ],
      },
      {
        id: 10,
        name: "Node 2-2",
      },
    ],
    level: 0,
    expanded: true,
  },
])

const flattenedNodes = computed(() => {
  const result: TreeNode[] = []
  const queue: [TreeNode[], number][] = [[treeData.value, -1]]

  while (queue.length > 0) {
    const [currentNodes] = queue.shift()!
    currentNodes.forEach((node, index) => {
      result.push(node)
      if (node.children && node.children.length > 0) {
        node.children.forEach((child: TreeNode) => {
          child.level = node.level! + 1
          child.expanded = true
        })
        queue.push([node.children, index])
      }
    })
  }

  return result
})

const toggleNode = (node: TreeNode) => {
  node.expanded = !node.expanded
}
</script>
<template>
  <div class="tree text-white">
    <ul>
      <li v-for="node in flattenedNodes" :key="node.id" :class="{ expanded: node.expanded }" @click="toggleNode(node)">
        <span :style="{ 'padding-left': node.level! * 20 + 'px' }">{{ node.name }}</span>
        <ul v-if="node.children && node.children.length > 0 && node.expanded">
          <li
            v-for="child in node.children"
            :key="child.id"
            :class="{ expanded: child.expanded }"
            @click="toggleNode(child)"
          >
            <span :style="{ 'padding-left': (node.level! + 1) * 20 + 'px' }">{{ child.name }}</span>
            <ul v-if="child.children && child.children.length > 0 && child.expanded">
              <li
                v-for="grandchild in child.children"
                :key="grandchild.id"
                :class="{ expanded: grandchild.expanded }"
                @click="toggleNode(grandchild)"
              >
                <span :style="{ 'padding-left': (node.level! + 2) * 20 + 'px' }">{{ grandchild.name }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
