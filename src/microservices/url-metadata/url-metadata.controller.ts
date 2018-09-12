import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { Client, MessagePattern, ClientProxy, Transport } from '@nestjs/microservices';
import { UrlMetadataDto } from './url-metadata.dto';
import { bodyValidation } from '../../config/validation.config';
import { UrlMetadataService } from './url-metadata.service';

@Controller()
export class UrlMetadataController {
    constructor(private readonly urlMetadataService: UrlMetadataService) {}

    @UsePipes(new ValidationPipe({
        ...bodyValidation,
    }))
    @MessagePattern('getMetadataFromUrl')
    async resolveMetadataFromUrl(data: UrlMetadataDto): Promise<string> {
        console.log('DATA', data);
        const metadata = await this.urlMetadataService.resolveMetadataFromUrl(data);
        
        // The resolved values are encoded because they may contain special chars like '…' which for some reason have
        // some problems when sending over TCP
        // TODO: maybe will be better to trim at all specials instead of encoding them ????  
        return encodeURI(JSON.stringify(metadata));
    }
}