import {PDFOptions} from 'puppeteer';

export interface IRenderHtmlService {
  toPdf(htmlTemplate: string, options?: PDFOptions): Promise<Buffer>;
}
