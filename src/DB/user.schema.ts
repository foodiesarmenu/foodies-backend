import { Schema, SchemaFactory, Prop } from "@nestjs/mongoos";


@Schema()
export class User{

@Prop(
    { type:String,required:true,min:2,max:25}
)
name:string


@Prop(
    { type:String,required:true,min:3,max:40}
)
email:string

@Prop(
    { type:String,required:true,min:8,max:25}
)
password:string

@Prop(
    { type:String,required:true,min:10,max:11}
)
phnoeNumber:string

@Prop(
    { type:String,default:'other',enum:['female', 'male', 'other']}
)
gender:string

}

// turn a class into a schem to be used later, this has to be exported to the dbhandler
export const userSchema = SchemaFactory.createForClass(User)    