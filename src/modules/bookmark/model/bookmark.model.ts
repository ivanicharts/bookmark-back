import { Exclude, Expose } from 'class-transformer';
import { ObjectID, Tree } from 'typeorm';
import {
    IsNotEmpty, IsMongoId, IsUrl, Length, IsString, IsOptional,
    IsArray, ArrayMaxSize, ArrayContains, IsBase64, IsBoolean, IsEnum, IsNumber
} from 'class-validator';

import { IBookmark, StatusEnum, GroupEnum } from '../interface';
@Exclude()
export class BookmarkModel implements IBookmark {

    @Expose({ groups: [GroupEnum.READ, GroupEnum.UPDATE] })
    @IsNotEmpty({ groups: [GroupEnum.UPDATE] })
    // @IsMongoId({ groups: [GroupEnum.PRIVATE] })
    _id: ObjectID;

    @Expose({ groups: [GroupEnum.PRIVATE_SAVE, GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @IsMongoId({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @IsNotEmpty({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    userId: string;

    @Expose()
    @IsUrl({}, { always: true })
    @Length(3, 255, { always: true })
    url: string;

    @Expose({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED, GroupEnum.COPY] })
    @IsUrl({}, { groups: [GroupEnum.PRIVATE, GroupEnum.SHARED, GroupEnum.COPY] })
    @Length(2, 100, { groups: [GroupEnum.PRIVATE, GroupEnum.SHARED, GroupEnum.COPY] })
    domain: string;

    @Expose({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED, GroupEnum.COPY] })
    @IsString({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @Length(3, 255)
    title: string;

    @Expose({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED, GroupEnum.COPY] })
    @IsString({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @Length(3, 1000)
    @IsOptional({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    description?: string;

    @Expose({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED, GroupEnum.COPY] })
    @IsUrl({}, { groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @IsOptional({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @Length(3, 255)
    imageUrl?: string;

    @Expose({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @IsArray({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @ArrayMaxSize(10, { groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @Length(1, 15, { each: true, groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @IsString({ each: true, groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @IsOptional({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    tags?: string[];

    @Expose({ groups: [GroupEnum.SHARED] })
    @IsNumber({}, { groups: [GroupEnum.SHARED]})
    @IsOptional({ groups: [GroupEnum.SHARED]})
    savedCount: number;

    @Expose({ groups: [GroupEnum.PRIVATE] })
    @IsOptional({ groups: [GroupEnum.PRIVATE] })
    @IsBoolean()
    favorite?: boolean;

    @Expose({ groups: [GroupEnum.PRIVATE] })
    @IsOptional({ groups: [GroupEnum.PRIVATE] })
    @IsEnum(StatusEnum, { groups: [GroupEnum.PRIVATE] })
    status: StatusEnum;

    @Expose({ groups: [GroupEnum.READ] })
    createdAt: Date

    @Expose({ groups: [GroupEnum.READ] })
    updatedAt: Date
} 
