import type {IChild} from 'typings'
// 测试数据
const data: IChild[] = [
    {
        title: "一级A",
        children: [
            { title: "二级菜单AA",  href: "/二级菜单AA" 
            // children: [
            //         { title: "三级a", href: "/三级a" },
            //         {
            //             title: "三级b",
            //             children: [
            //                 { title: "四级a", href: "/四级a" },
            //                 { title: "四级b", href: "/四级b" }
            //             ]
            //         }
            //     ] 
                },
            {
                title: "二级菜单B", children: [
                    { title: "3级a", href: "/3级a" },
                    {
                        title: "3级b",
                        children: [
                            { title: "4级a", href: "/4级a" },
                            { title: "4级b", href: "/4级b" }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: "一级B",
        children: [
            { title: "二级菜单A", href: "/二级菜单A" },
            { title: "二级菜单B", href: "/二级菜单B" }
        ]
    }
]

export {data}