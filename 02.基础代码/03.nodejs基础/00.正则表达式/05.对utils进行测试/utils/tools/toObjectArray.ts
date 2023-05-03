import { v4 as uuidv4 } from "uuid"
import { basename, lastFolder } from ".."
/**
 * Created by franck.lynn on 2021-05-18.
 * lry_demry@163.com
 * filename:  toObjectArray
 * 这个文件的设计过程说明在 toObjectArray.ts 设计记录.md 这个文件中
 * 这个文件是将文件路径数组转成对象数组, 并进行归类, 将同一个文件夹的文件归为一类
 */

export interface IChild {
    id: string | number
    icon?: string
    title: string
    href?: string
    children?: IChild[]
}
/* 
    // prefix 是路由的前缀, 在子路由中可以加上这个前缀
    // Insert path into directory tree structure:
    // @deprecated
    const insert = (
        children: IChild[] = [],
        [head, ...tail]: string[],
        icons: string[] | undefined,
        prefix: string = ""
    ) => {
        // [head, ...tail] 是路径分割后的数组,  [ '类别一', '子类别一', 'aaa', 'index.vue' ],
        // head = 类别一, tail = '子类别一', 'aaa', 'index.vue'
        // child 刚开始是个空值, 因为 children 是空值
        let child = children.find((child) => child.title === head)

        let iconHead: string = ""
        let iconTail: string[] = []
        if (icons && icons.length > 0) {
            ;[iconHead, ...iconTail] = icons
        }
        // console.log("分割到的图标------> ", iconHead, iconTail)
        if (!child) {
            // 这里 child 还没有,
            if (tail.length > 0) {
                // 如果有图标, 就加入图标
                if (iconHead) {
                    children.push((child = { id: uuidv4(), icon: iconHead, title: head, children: [] }))
                } else {
                    children.push((child = { id: uuidv4(), title: head, children: [] }))
                }
                // 到这里 children 数组里才放东西进去
            } else {
                // /.+?\\(?=\w+)|\.\w+$|\\$/ 匹配文件名的正则, 去掉文件名
                // 不知道怎么在 vite.config.ts 设置 polyfill
                // head = path.basename(head, path.extname(head))
                head = head.replace(/.+?\\(?=\w+)|\.\w+$|\\$/, "")
                console.log("获取文件名----> ", head)
                // 如果这里还有 iconHead 就加进来
                if (iconHead) {
                    children.push(
                        (child = {
                            id: uuidv4(),
                            title: head,
                            icon: iconHead,
                            // href: prefix ? `/${prefix}/${head}` : `/${head}`,
                            //! 修改上面的 href , 对其进行编码, 解决 url 中文路径问题
                            href: encodeURI(prefix ? `/${prefix}/${head}` : `/${head}`),
                        })
                    )
                } else {
                    children.push(
                        (child = {
                            id: uuidv4(),
                            title: head,
                            //! 对href进行编码, 解决 url 中文路径问题
                            href: encodeURI(prefix ? `/${prefix}/${head}` : `/${head}`),
                        })
                    )
                }
            }
        }
        // 继续递归
        if (tail.length > 0) {
            insert(child.children, tail, iconTail, prefix)
        }

        return children
    }

    // 使用上面的递归函数进行转化
    // @deprecated
    let toObjectArray_deprecated = (paths: string[], icons?: string[], prefix?: string) => {
        // 如果前面是 / 开头, 就要去掉, 这一步可以在其他步骤里做, 这里不 加 slice(1).
        const filepaths = paths.map((path) => path.split("/"))
        //! 一般传过来的是改造的中文路径, 这就存在一个问题, 最后的文件名还是英文的,
        //! 所以, 还要把 文件名传给 insert() 函数
        let iconpaths: string[][] = []
        if (icons && icons.length > 0) {
            // 如果没有二级图标, 也会分割为一个二维数组, 哪怕只有一个 图标
            iconpaths = icons.map((icon) => icon.split("/"))
        }
        return (
            filepaths
                // 分割后为:[ [ 'AAA', 'aaa.vue' ], [ 'AAA', 'bbb.vue' ], [ 'BBB', 'ccc.vue' ] ]
                // children 累计值, path 当前值, 例如: [ 'AAA', 'bbb.vue' ]
                .reduce<IChild[]>((children: IChild[], path: string[], currentIndex: number) => {
                    if (iconpaths && iconpaths.length > 0) {
                        return insert(children, path, iconpaths[currentIndex], prefix)
                    } else {
                        return insert(children, path, undefined, prefix)
                    }
                }, [])
        )
    }
 */
const _insert = (
    children: IChild[] = [],
    [head, ...tail]: string[],
    href: string | undefined,
    icons: string[] | undefined,
    prefix: string = ""
) => {
    // [head, ...tail] 是路径分割后的数组,  [ '类别一', '子类别一', 'aaa', 'index.vue' ],
    // head = 类别一, tail = '子类别一', 'aaa', 'index.vue'
    // child 刚开始是个空值, 因为 children 是空值
    let child = children.find((child) => child.title === head)

    let iconHead: string = ""
    let iconTail: string[] = []
    if (icons && icons.length > 0) {
        ;[iconHead, ...iconTail] = icons
    }
    // console.log("分割到的图标------> ", iconHead, iconTail)
    if (!child) {
        // 这里 child 还没有,
        if (tail.length > 0) {
            // 如果有图标, 就加入图标
            if (iconHead) {
                children.push((child = { id: uuidv4(), icon: iconHead, title: head, children: [] }))
            } else {
                children.push((child = { id: uuidv4(), title: head, children: [] }))
            }
            // 到这里 children 数组里才放东西进去
        } else {
            // /.+?\\(?=\w+)|\.\w+$|\\$/ 匹配文件名的正则, 去掉文件名
            // 不知道怎么在 vite.config.ts 设置 polyfill
            // head = path.basename(head, path.extname(head))
            head = head.replace(/.+?\\(?=\w+)|\.\w+$|\\$/, "")
            href = href?.replace(/.+?\\(?=\w+)|\.\w+$|\\$/, "")
            // console.log("获取文件名----> ", head)
            // 如果这里还有 iconHead 就加进来
            if (iconHead) {
                children.push(
                    (child = {
                        id: uuidv4(),
                        title: head,
                        icon: iconHead,
                        // href: prefix ? `/${prefix}/${head}` : `/${head}`,
                        //! 修改上面的 href , 对其进行编码, 解决 url 中文路径问题
                        href: encodeURI(prefix ? `/${prefix}/${href}` : `/${href}`),
                    })
                )
            } else {
                children.push(
                    (child = {
                        id: uuidv4(),
                        title: head,
                        //! 对href进行编码, 解决 url 中文路径问题
                        href: encodeURI(prefix ? `/${prefix}/${href}` : `/${href}`),
                    })
                )
            }
        }
    }
    // 继续递归
    if (tail.length > 0) {
        _insert(child.children, tail, href, iconTail, prefix)
    }

    return children
}
// 判断是不是二维数组(一维数组里的元组)
const is2DArray = (arr: [string, string?, string?][]) => arr.some((item) => Array.isArray(item))

let toObjectArray = (paths: [string, string?, string?][], prefix?: string, EXTNAME = ".vue") => {
    if (!is2DArray(paths)) {
        throw new Error("[toObjectArray]: 不是二维数组(一维数组里一个元组)")
    }
    if (!paths[0]) {
        throw new Error("[toObjectArray]: 二维数组里至少有一个元组")
    }
    // 这里的 path 是一个 2 维数组, 包含中英文菜单, 元组里 第1个英文路径, 第2个是中文路径, 第3个 图标
    // 例如:
    //  [[  '../components/units/consign/consign-index.vue', '快递/快递100/consign-index.vue' , 'icon-cogs'], ...]
    // 获取第1个英文路径中的文件名 , 如果没有, 就取 最后一个文件夹表示文件名, 一般文件名是 index.vue 的情况使用
    const hrefs = paths.map((path) => {
        // 这里加上对后缀名, 表示这个函数只处理某类文件, 如 .vue 文件, 其他文件不处理
        const base = basename(path[0], EXTNAME)
        if (base) {
            return base
        } else {
            return lastFolder(path[0])
        }
    })

    // 对第2个路径进行分割.
    const filepaths = paths.map((path) => {
        if (path[1] && path[1].length > 0) {
            return path[1].split("/")
        } else {
            return path[0].split("/")
        }
    })
    // 对图标进行分割, 这样, 二级菜单也是可以有图标的
    const icons = paths.map((path) => {
        if (path[2]) {
            return path[2].split("/")
        }
    })
    return (
        filepaths
            // 分割后为:[ [ 'AAA', 'aaa.vue' ], [ 'AAA', 'bbb.vue' ], [ 'BBB', 'ccc.vue' ] ]
            // children 累计值, path 当前值, 例如: [ 'AAA', 'bbb.vue' ]
            .reduce<IChild[]>((children: IChild[], path: string[], currentIndex: number) => {
                const href = hrefs ? hrefs[currentIndex] : undefined
                if (icons && icons.length > 0) {
                    return _insert(children, path, href, icons[currentIndex], prefix)
                } else {
                    return _insert(children, path, href, undefined, prefix)
                }
            }, [])
    )
}

export { toObjectArray }
