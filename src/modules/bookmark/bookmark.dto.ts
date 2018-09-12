import { IsUrl } from 'class-validator';

export class bookmarkDto {
    
    @IsUrl()
    url: string;

}