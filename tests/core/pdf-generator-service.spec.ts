import { Mock } from 'moq.ts';
import { PDFOptions } from 'puppeteer';
import { IPdfGeneratorService } from '../../src/core/interfaces/pdf-generator-service';
import { IRenderHtmlService } from '../../src/core/interfaces/render-html-service';
import { PdfGeneratorService } from '../../src/core/services/pdf-generator-service';
describe('Dado um serviço para manipular o texto HTML', () => {
	const renderService = new Mock<IRenderHtmlService>();
	const pdfGenerator: IPdfGeneratorService = new PdfGeneratorService(
		renderService.object()
	);

	describe('Dado um texto HTML simples', () => {
		const simpleHtmlText = '<html><body><h1>Hello World</h1></body></html>';

		describe('Dado o método para criar um buffer PDF a partir de um texto HTML', () => {
			describe('Dado que as options foram informadas', () => {
				const optionsWithPath: PDFOptions = {
					format: 'a4',
					height: '100px',
					path: './test/test.pdf',
				};

				describe('Dado que o arquivo PDF não deve ser salvo', () => {
					const expectedOptions: PDFOptions = {
						format: 'a4',
						height: '100px',
						path: undefined,
					};

					it('Deve criar o buffer PDF com sucesso', async () => {
						const htmlRenderSpy = jest.fn().mockReturnValue({
							promise: Buffer.from(simpleHtmlText),
						});
						renderService.setup((mock) => mock.toPdf).returns(htmlRenderSpy);

						await pdfGenerator.fromHtml(simpleHtmlText, optionsWithPath);

						expect(htmlRenderSpy).toHaveBeenNthCalledWith(
							1,
							simpleHtmlText,
							expectedOptions
						);
					});
				});
			});

			describe('Dado que as options não foram informadas', () => {
				it('Deve criar o buffer PDF com sucesso', async () => {
					const htmlRenderSpy = jest.fn().mockReturnValue({
						promise: Buffer.from(simpleHtmlText),
					});
					renderService.setup((mock) => mock.toPdf).returns(htmlRenderSpy);

					await pdfGenerator.fromHtml(simpleHtmlText);

					expect(htmlRenderSpy).toHaveBeenNthCalledWith(1, simpleHtmlText, {
						path: undefined,
					});
				});
			});
		});
	});

	describe('Dado uma fábrica para o gerador de PDFs', () => {
		it('Deve retornar uma instancia de PdfGeneratorService', () => {
			const className = PdfGeneratorService.make().constructor.name;

			expect(className).toBe('PdfGeneratorService');
		});
	});
});
