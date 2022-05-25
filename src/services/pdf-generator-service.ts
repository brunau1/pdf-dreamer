import {PdfGeneratorOptions} from '../interfaces/pdf-generator-options';
import {IPdfGeneratorService} from '../interfaces/pdf-generator-service';
import {IRenderHtmlService} from '../interfaces/render-html-service';
import {RenderHtmlService} from './render-html-service';

export class PdfGeneratorService implements IPdfGeneratorService {
  constructor(private renderHtmlService: IRenderHtmlService) {}

  public fromHtml(
    htmlTemplate: string,
    options?: PdfGeneratorOptions
  ): Promise<Buffer> {
    return this.renderHtmlService.toPdf(htmlTemplate, {
      ...options,
      path: undefined,
    });
  }

  static make(): IPdfGeneratorService {
    const renderHtmlService = RenderHtmlService.make();
    return new PdfGeneratorService(renderHtmlService);
  }
}
