import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @Column()
    product: string;

    @Column()
    user: string;

    @Column()
    text: string;

    @Column()
    data: number;
    
}