import { PdfGeneratorOptionsModel } from '../../..';

export interface IPdfGenerator {
	generatePdfBufferFromHtmlTemplate(
		htmlTemplate: string,
		options?: PdfGeneratorOptionsModel
	): Promise<Buffer>;
}
