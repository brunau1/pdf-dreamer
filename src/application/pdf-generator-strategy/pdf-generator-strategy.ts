import * as Puppeteer from 'puppeteer';
import { PdfGeneratorOptionsModel } from '../..';
import { IPdfGeneratorStrategy } from './interfaces/pdf-generator-strategy';

export class PdfGeneratorStrategy implements IPdfGeneratorStrategy {
	public async renderHtmlTemplateIntoPdf(
		htmlTemplate: any,
		options?: PdfGeneratorOptionsModel
	): Promise<Buffer> {
		const browser = await Puppeteer.launch({ headless: true });
		const page = await browser.newPage();

		await page.setContent(htmlTemplate);

		const pdfBuffer = await page.pdf(options);

		await page.close();
		await browser.close();

		return pdfBuffer;
	}
}
