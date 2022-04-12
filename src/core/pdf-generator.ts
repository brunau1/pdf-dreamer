import { PdfGeneratorOptionsModel } from '..';
import { IPdfGeneratorStrategy } from '../application/pdf-generator-strategy/interfaces/pdf-generator-strategy';
import { PdfGeneratorStrategy } from '../application/pdf-generator-strategy/pdf-generator-strategy';
import { IPdfGenerator } from './interfaces/pdf-generator';

export class PdfGenerator implements IPdfGenerator {
	constructor(private generatorStrategy: IPdfGeneratorStrategy) {}

	public generatePdfBufferFromHtmlTemplate(
		htmlTemplate: string,
		options?: PdfGeneratorOptionsModel
	): Promise<Buffer> {
		return this.generatorStrategy.renderHtmlTemplateIntoPdf(htmlTemplate, {
			...options,
			path: undefined,
		});
	}

	static make(): IPdfGenerator {
		const generatorStrategy = new PdfGeneratorStrategy();
		return new PdfGenerator(generatorStrategy);
	}
}
