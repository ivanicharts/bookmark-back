import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { Type } from 'class-transformer';

import { IBookmark } from './interface';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('bookmarks')
export class BookmarkEntity implements IBookmark {

    @Type(() => String)
    @ApiModelProperty({ type: String, readOnly: true })
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    imageUrl: string;

    

} 