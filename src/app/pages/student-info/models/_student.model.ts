export interface StudentModelResponseData{
    status:number,
    data:StudentModel
}

export interface StudentModel {
    id: number
    name: string
    surname: string
    image:string
}