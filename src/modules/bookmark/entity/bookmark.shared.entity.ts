import { Entity } from 'typeorm';

import { IBookmarkSHared } from '../interface';
import { BookmarkEntity } from '.';

@Entity('bookmarks.shared')
export class BookmarkSharedEntity extends BookmarkEntity implements IBookmarkSHared { }