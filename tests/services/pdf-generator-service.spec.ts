import faker from '@faker-js/faker';
import {Mock} from 'moq.ts';
import {PDFOptions} from 'puppeteer';

import {IPdfGeneratorService} from '../../../../../src/infrastructure/html-pdf/interfaces/pdf-generator-service';
import {PdfGeneratorService} from '../../../../../src/infrastructure/html-pdf/services/pdf-generator-service';
import {helloWorldTemplate} from '../../../../../src/infrastructure/html-pdf/templates/hello-world-template';
import {renderServiceMock} from '../../../__mocks__/html-pdf/render-service-mock';

describe('Dado um serviço para manipular o texto HTML', () => {
  let pdfGenerator: IPdfGeneratorService;

  beforeEach(() => {
    pdfGenerator = new PdfGeneratorService(renderServiceMock);
  });

  describe('Dado o método para criar um buffer PDF a partir do template Hello World', () => {
    it('Deve criar o buffer PDF', async () => {
      const id = faker.datatype.uuid();
      const options: PDFOptions = {
        format: 'a4',
        height: '100px',
        path: undefined,
      };

      const bufferMoq = new Mock<Buffer>();
      renderServiceMock.toPdf.mockResolvedValue(bufferMoq.object());

      await pdfGenerator.fromHelloWorldHtml(id, options);

      expect(renderServiceMock.toPdf).toHaveBeenNthCalledWith(
        1,
        helloWorldTemplate(id),
        options
      );
    });

    it('Deve criar o buffer PDF com sucesso sem options', async () => {
      const id = faker.datatype.uuid();

      const bufferMoq = new Mock<Buffer>();
      renderServiceMock.toPdf.mockResolvedValue(bufferMoq.object());

      await pdfGenerator.fromHelloWorldHtml(id);

      expect(renderServiceMock.toPdf).toHaveBeenNthCalledWith(
        1,
        helloWorldTemplate(id),
        {
          path: undefined,
        }
      );
    });
  });

  describe('Dado que o PDF não deve ser salvo em um arquivo', () => {
    it('Deve criar o buffer PDF', async () => {
      const id = faker.datatype.uuid();
      const optionsWithPath: PDFOptions = {
        format: 'a4',
        height: '100px',
        path: faker.system.filePath(),
      };

      const bufferMoq = new Mock<Buffer>();
      renderServiceMock.toPdf.mockResolvedValue(bufferMoq.object());

      await pdfGenerator.fromHelloWorldHtml(id, optionsWithPath);

      const expectedOptions: PDFOptions = {
        format: 'a4',
        height: '100px',
        path: undefined,
      };

      expect(renderServiceMock.toPdf).toHaveBeenNthCalledWith(
        1,
        helloWorldTemplate(id),
        expectedOptions
      );
    });
  });

  describe('Dado uma fábrica para o gerador de PDFs', () => {
    it('Deve retornar uma instancia de PdfGeneratorService', () => {
      const className = PdfGeneratorService.make().constructor.name;

      expect(className).toBe('PdfGeneratorService');
    });
  });
});
