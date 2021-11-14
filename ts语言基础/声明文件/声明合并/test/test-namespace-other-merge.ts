
// 导入声明文件
import '../typings/namespace-other-merge'

let album = new Album()
// 这个类的定义了一个属性 label, 所以可以 点 到
let label = album.label
// 这里不能 . 到 id 属性
// Album 命名空间 有一个 类 AlbumLabel
// AlbumLabel 有个静态属性 id
// label 是 AlbumLabel 类实例, 为什么 . 不到呢?
// let id  = label.

// 直接访问就可以
Album.AlbumLabel.id
// 加上 label: typeof Album.AlbumLabel
// 就可以访问了
let id = label.id

// label: typeof Album.AlbumLabel 中的
// Album.AlbumLabel 是实例, 而不是类, 实例上并没有 idd
// 属性, 所以访问不到, 但是, 如果改成静态属性
// 实例上就有这个属性了, 所以可以访问得到
let label1 = album.label
label1.idd

let author = album.author
author.name
author.show()