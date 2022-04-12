import { PdfGeneratorOptionsModel } from './pdf-generator-options';

export interface IPdfGeneratorStrategy {
	renderHtmlTemplateIntoPdf(
		htmlTemplate: any,
		options?: PdfGeneratorOptionsModel
	): Promise<Buffer>;
}
