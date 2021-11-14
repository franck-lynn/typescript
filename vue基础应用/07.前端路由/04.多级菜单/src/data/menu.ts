export interface ITreeMenu {
    id: number
    title: string
    children ? : ITreeMenu[]
}

const menuData: ITreeMenu[] = [
    { id: 1, title: '菜单1' },
    { id: 2, title: '菜单2' },
    {
        id: 3,
        title: '菜单3',
        children: [{
                id: 31,
                title: '菜单3-1',
                children: [
                    { id: 311, title: '菜单3-1-1' },
                    {
                        id: 312,
                        title: '菜单3-1-2',
                        children: [
                            { id: 3121, title: '菜单3-1-2-1' },
                            {
                                id: 3122,
                                title: '菜单3-1-2-2',
                                children: [
                                    { id: 31221, title: '5级菜单' }
                                ]
                            }
                        ]
                    },
                    {
                        id: 313,
                        title: '菜单3-1-3',
                        children: [{
                            id: 3131,
                            title: '菜单3-1-3-1',
                            children: [
                                { id: 31311, title: '5级菜单B' }
                            ]
                        }, ]
                    },
                ]
            },
            { id: 32, title: '菜单3-2' },
            {
                id: 33,
                title: '菜单3-3',
                children: [
                    { id: 331, title: '菜单3-3-1' },
                    { id: 332, title: '菜单3-3-2' },
                    { id: 333, title: '菜单3-3-3' },
                ]
            },
        ]
    },
    { id: 4, title: '菜单4' },
    { id: 5, title: '菜单5' },
]

export default menuData