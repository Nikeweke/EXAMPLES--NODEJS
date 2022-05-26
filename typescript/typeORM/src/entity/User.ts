import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// @Entity({name: 'user'})
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    // @Column()
    // age: number

}
