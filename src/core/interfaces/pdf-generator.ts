import { PdfGeneratorOptionsModel } from '../../..';

export interface IPdfGenerator {
	generatePdfBufferFromHtmlTemplate(
		htmlTemplate: any,
		options?: PdfGeneratorOptionsModel
	): Promise<Buffer>;
}
