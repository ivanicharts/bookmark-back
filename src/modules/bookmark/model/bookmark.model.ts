import { Exclude, Expose } from 'class-transformer';
import { ObjectID, Tree } from 'typeorm';
import {
    IsNotEmpty, IsMongoId, IsUrl, Length, IsString, IsOptional,
    IsArray, ArrayMaxSize, ArrayContains, IsBase64, IsBoolean, IsEnum, IsNumber
} from 'class-validator';

import { IBookmark, StatusEnum, GroupEnum } from '../interface';
@Exclude()
export class BookmarkModel implements IBookmark {

    @Expose({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @IsNotEmpty()
    @IsMongoId()
    id: ObjectID;

    @Expose({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @IsMongoId()
    @IsNotEmpty()
    userId: ObjectID;

    @Expose()
    @IsUrl({}, { always: true })
    @Length(3, 255, { always: true })
    url: string;

    @Expose({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @IsString()
    @Length(3, 255)
    title: string;

    @Expose({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @IsString()
    @Length(3, 1000)
    @IsOptional()
    description?: string;

    @Expose({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @IsUrl()
    @IsOptional()
    @Length(3, 255)
    imageUrl?: string;

    @Expose({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @IsArray()
    @ArrayMaxSize(10)
    @Length(1, 15, { each: true })
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @Expose({ groups: [GroupEnum.PRIVATE, GroupEnum.SHARED] })
    @IsNumber()
    @IsOptional()
    savedCount: number;

    @Expose({ groups: [GroupEnum.PRIVATE] })
    @IsOptional()
    @IsBoolean()
    favorite?: boolean;

    @Expose({ groups: [GroupEnum.PRIVATE] })
    @IsOptional()
    @IsEnum(StatusEnum)
    status: StatusEnum

} 
