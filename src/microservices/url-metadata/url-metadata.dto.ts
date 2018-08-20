import { IsUrl } from 'class-validator';
import { RequestBody } from './url-metadata.interface';

export class UrlMetadataDto implements RequestBody {

    @IsUrl()
    url: string;

}