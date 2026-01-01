export interface user{
    id:number,
    userName:string,
    email:string,
}
export interface blogg{
    id: number,
    title: string,
    description:string,
    category:string,
    date:Date,
    userId?:number
}