import { PDFOptions, launch } from "puppeteer";

import { IRenderHtmlService } from "../interfaces/render-html-service";

export class RenderHtmlService implements IRenderHtmlService {
  public async toPdf(
    htmlTemplate: string,
    options?: PDFOptions
  ): Promise<Buffer> {
    const browser = await launch({ headless: true });
    const page = await browser.newPage();

    await page.setContent(htmlTemplate);

    const pdfBuffer = await page.pdf(options);

    await page.close();
    await browser.close();

    return pdfBuffer;
  }

  static make(): IRenderHtmlService {
    return new RenderHtmlService();
  }
}
