import { Entity, ObjectIdColumn, ObjectID, Column, BeforeInsert, BeforeUpdate, Index } from 'typeorm';
import { Type } from 'class-transformer';

import { IBookmark, StatusEnum } from '../interface';
import { BookmarkModel } from '../model'
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('bookmarks')
@Index(['url', 'userId'], { unique: true })
export class BookmarkEntity extends BookmarkModel {

    // @Type(() => String)
    @ApiModelProperty({ type: ObjectID, readOnly: true })
    @ObjectIdColumn()
    _id: ObjectID;

    @Column({ unique: true })
    url: string;

    @ApiModelProperty({ type: String, required: true })
    @Column()
    domain: string;

    @ApiModelProperty({ type: String, required: true, minLength: 3, maxLength: 255 })
    @Column()
    title: string;

    @ApiModelProperty({ type: String, required: false, minLength: 3, maxLength: 1000 })
    @Column()
    description?: string;

    @Column()
    @ApiModelProperty({ type: String, required: false })
    imageUrl?: string;

    @ApiModelProperty({ type: String, isArray: true, required: false })
    @Column()
    tags?: string[];

    @ApiModelProperty({ type: Boolean, required: false })
    @Column()
    favorite?: boolean;

    @ApiModelProperty({ type: ObjectID, required: true })
    @Column()
    userId: string;

    @ApiModelProperty({ type: String, enum: Object.keys(StatusEnum) })
    @Column({ default: StatusEnum.ACTIVE })
    status: StatusEnum

    @ApiModelProperty({ readOnly: true, type: Date })
    @Column()
    createdAt: Date;

    @ApiModelProperty({ readOnly: true, type: Date })
    @Column()
    updatedAt: Date;

    @BeforeInsert()
    beforeInsert() {
        const now = new Date();

        this.createdAt = now;
        this.updatedAt = now;
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.updatedAt = new Date();
    }
} 