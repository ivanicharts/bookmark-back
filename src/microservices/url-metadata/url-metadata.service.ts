import { Injectable } from '@nestjs/common'; 
import * as rp from 'request-promise-native';
import * as cheerio from 'cheerio';

import { DefaultResolveFields } from './url-metadata.interface';
import { UrlMetadataDto } from './url-metadata.dto';

@Injectable()
export class UrlMetadataService {

    defaultFields: DefaultResolveFields = {
        title: '[property="og:title"]',
        description: '[property="og:description"]',
        imageUrl: '[property="og:image"]',
    }

    async resolveMetadataFromUrl({ url }: UrlMetadataDto): Promise<object> {
        const html = await rp(url);
        const metadata = UrlMetadataService.resolveMetadata<DefaultResolveFields>(html, this.defaultFields);

        return metadata;
    }

    static resolveMetadata<T>(html: string, selectors: T, attribute: string = 'content'): object {
        const $ = cheerio.load(html);
        return Object.entries(selectors)
            .reduce((acc, [selectorName, selectorPattern]) => {
                const el = $(selectorPattern);

                acc[selectorName] = el ? el.attr(attribute) : el;
    
                return acc;
            }, {});
    }
}