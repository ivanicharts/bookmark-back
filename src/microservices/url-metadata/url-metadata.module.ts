import { Module } from '@nestjs/common';
import { UrlMetadataController } from './url-metadata.controller';
import { UrlMetadataService } from './url-metadata.service';

@Module({
    controllers: [UrlMetadataController],
    providers: [UrlMetadataService],
})
export class UrlMetadataServiceModule {}