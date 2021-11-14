interface LengthWise{
    length: number
}
function myForEach<T extends LengthWise>(arr: T[], callback: (arg: T, index?: number) => void){
    for (let i = 0; i < arr.length; i++){
        callback(arr[i])
    }   
}
console.log(myForEach)