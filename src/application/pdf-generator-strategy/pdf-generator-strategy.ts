import * as Puppeteer from 'puppeteer';
import { PdfGeneratorOptionsModel } from '../../..';
import { IPdfGeneratorStrategy } from './interfaces/pdf-generator-strategy';

export class PdfGeneratorStrategy implements IPdfGeneratorStrategy {
	public async renderHtmlTemplateIntoPdf(
		htmlTemplate: string,
		options?: PdfGeneratorOptionsModel
	): Promise<Buffer> {
		const browser = await Puppeteer.launch();
		const page = await browser.newPage();

		await page.setContent(htmlTemplate);

		const pdfBuffer = await page.pdf(options);

		await page.close();
		await browser.close();

		return pdfBuffer;
	}
}
