import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mail: string;

    @Column()
    name: string;

    @Column()
    password: string;
    
}