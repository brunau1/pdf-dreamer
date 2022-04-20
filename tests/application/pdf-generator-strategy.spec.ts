import { PdfGeneratorOptionsModel } from '../../src/application/pdf-generator-strategy/interfaces/pdf-generator-options';
import { PdfGeneratorStrategy } from '../../src/application/pdf-generator-strategy/pdf-generator-strategy';

describe('Dado uma estratégia para gerar PDFs', () => {
	const pdfGeneratorStrategy = new PdfGeneratorStrategy();

	describe('Dado o método para gerar um buffer a partir de um template HTML renderizado', () => {
		const simpleHtmlText = '<html><body><h1>Hello World</h1></body></html>';
		const renderedBufferExpectedLength = {
			withOptions: 13907,
			withoutOptions: 13880,
		};

		describe('Dado que as options foram informadas', () => {
			const options: PdfGeneratorOptionsModel = {
				format: 'a4',
				height: '100px',
			};

			it('Deve gerar o buffer PDF com o template HTML renderizado', async () => {
				const renderedBuffer =
					await pdfGeneratorStrategy.renderHtmlTemplateIntoPdf(
						simpleHtmlText,
						options
					);

				expect(renderedBuffer.length).toBe(
					renderedBufferExpectedLength.withOptions
				);
			});
		});
		describe('Dado que as options não foram informadas', () => {
			it('Deve gerar o buffer PDF com o template HTML renderizado', async () => {
				const renderedBuffer =
					await pdfGeneratorStrategy.renderHtmlTemplateIntoPdf(simpleHtmlText);

				expect(renderedBuffer.length).toBe(
					renderedBufferExpectedLength.withoutOptions
				);
			});
		});
	});
});
