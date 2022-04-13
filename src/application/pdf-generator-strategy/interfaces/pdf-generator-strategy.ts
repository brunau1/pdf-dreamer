import { PdfGeneratorOptionsModel } from './pdf-generator-options';

export interface IPdfGeneratorStrategy {
	renderHtmlTemplateIntoPdf(
		htmlTemplate: string,
		options?: PdfGeneratorOptionsModel
	): Promise<Buffer>;
}
