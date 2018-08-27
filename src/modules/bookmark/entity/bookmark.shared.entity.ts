import { Entity, Column } from 'typeorm';

import { IBookmarkSHared } from '../interface';
import { BookmarkEntity } from '.';

@Entity('bookmarks.shared')
export class BookmarkSharedEntity extends BookmarkEntity implements IBookmarkSHared {
    
    @Column({ default:0 })
    savedCount: number;

}