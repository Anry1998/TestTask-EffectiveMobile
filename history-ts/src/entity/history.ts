import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class History {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    action: string

    @Column()
    shop_id: number

    @Column()
    plu: number

    @Column()
    name: string

    @CreateDateColumn()
    createTime: Date;
}
