
class Album {
    // label: Album.AlbumLabel
    label: typeof Album.AlbumLabel
    author: Album.AlbumAuthor
}

namespace Album {
    export class AlbumLabel {
        public static id = "inter" 
        // idd: number 
        static idd: number
    }
}

module Album {
    export class AlbumAuthor {
        name: string
        show(){
            console.log(this.name)
        }
        constructor (name: string){
            this.name = name
        }
    }
}


