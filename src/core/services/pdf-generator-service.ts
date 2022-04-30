import {IPdfGeneratorService} from '../interfaces/pdf-generator-service';
import {IRenderHtmlService} from '../interfaces/render-html-service';
import {PDFOptions} from 'puppeteer';
import {RenderHtmlService} from './render-html-service';

export class PdfGeneratorService implements IPdfGeneratorService {
  constructor(private renderHtmlService: IRenderHtmlService) {}

  public fromHtml(html: string, options?: PDFOptions): Promise<Buffer> {
    return this.renderHtmlService.toPdf(html, {
      ...options,
      path: undefined,
    });
  }

  static make(): IPdfGeneratorService {
    const renderHtmlService = RenderHtmlService.make();
    return new PdfGeneratorService(renderHtmlService);
  }
}
