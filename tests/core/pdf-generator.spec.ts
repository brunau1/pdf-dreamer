import { Mock } from 'moq.ts';
import { PdfGeneratorOptionsModel } from '../../src/application/pdf-generator-strategy/interfaces/pdf-generator-options';
import { IPdfGeneratorStrategy } from '../../src/application/pdf-generator-strategy/interfaces/pdf-generator-strategy';
import { IPdfGenerator } from '../../src/core/interfaces/pdf-generator';
import { PdfGenerator } from '../../src/core/pdf-generator';
describe('Dado um serviço para manipular o texto HTML', () => {
	const pdfGeneratorStrategyMock = new Mock<IPdfGeneratorStrategy>();
	const pdfGenerator: IPdfGenerator = new PdfGenerator(
		pdfGeneratorStrategyMock.object()
	);

	describe('Dado um texto HTML simples', () => {
		const simpleHtmlText = '<html><body><h1>Hello World</h1></body></html>';

		describe('Dado o método para criar um buffer PDF a partir de um texto HTML', () => {
			const htmlRenderSpy = jest.fn().mockReturnValue({
				promise: Buffer.from(simpleHtmlText),
			});
			pdfGeneratorStrategyMock
				.setup((mock) => mock.renderHtmlTemplateIntoPdf)
				.returns(htmlRenderSpy);
			describe('Dado que as options foram informadas', () => {
				const optionsWithPath: PdfGeneratorOptionsModel = {
					format: 'a4',
					height: '100px',
					path: './test/test.pdf',
				};

				describe('Dado que o arquivo PDF não deve ser salvo', () => {
					const expectedOptions: PdfGeneratorOptionsModel = {
						format: 'a4',
						height: '100px',
						path: undefined,
					};

					it('Deve criar o buffer PDF com sucesso', async () => {
						await pdfGenerator.generatePdfBufferFromHtmlTemplate(
							simpleHtmlText,
							optionsWithPath
						);

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
					await pdfGenerator.generatePdfBufferFromHtmlTemplate(simpleHtmlText);

					expect(htmlRenderSpy).toHaveBeenNthCalledWith(2, simpleHtmlText, {
						path: undefined,
					});
				});
			});
		});
	});

	describe('Dado uma fábrica para o gerador de PDFs', () => {
		it('Deve retornar uma instancia de PdfGenerator', () => {
			const className = PdfGenerator.make().constructor.name;

			expect(className).toBe('PdfGenerator');
		});
	});
});
