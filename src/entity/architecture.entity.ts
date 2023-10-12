import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'architecture'})
export class Architecture {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    name: string

    @Column('int')
    experience: string
}