# hot 实例获取

在模板中设置 ref ="hot"

```vue
 <hot-table ref="hot" :data="data" :settings="hotSettings"></hot-table>
```

在 ts 中

```ts
import { ref, onMounted, DefineComponent } from "vue"
...
 
import Core from "handsontable/core"
import Handsontable from "handsontable"
import { HotTableProps, VueProps } from "@handsontable/vue3/types"


const hot = ref<DefineComponent<VueProps<HotTableProps>>>()
const instance: Core = hot.value["hotInstance"]
```

