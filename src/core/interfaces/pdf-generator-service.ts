import {PDFOptions} from 'puppeteer';

export interface IPdfGeneratorService {
  fromHtml(html: string, options?: PDFOptions): Promise<Buffer>;
}
