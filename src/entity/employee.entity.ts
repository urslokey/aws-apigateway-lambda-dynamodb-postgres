import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'employee'})
export class Employee {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text',{ nullable : true})
    name: string

    @Column('text',{ nullable : true})
    experience: string
}