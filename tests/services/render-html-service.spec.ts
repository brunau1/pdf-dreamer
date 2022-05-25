import {Mock} from 'moq.ts';
import {Page, PDFOptions} from 'puppeteer';

import {IRenderHtmlService} from '../../../../../src/infrastructure/html-pdf/interfaces/render-html-service';
import {RenderHtmlService} from '../../../../../src/infrastructure/html-pdf/services/render-html-service';
import {
  browserMock,
  puppeteerMoq,
} from '../../../__mocks__/html-pdf/puppeteer-mock';

describe('Dado uma estratégia para gerar PDFs', () => {
  let service: IRenderHtmlService;

  beforeEach(() => {
    service = new RenderHtmlService(puppeteerMoq.object());
  });

  describe('Dado o método para gerar um buffer a partir de um template HTML renderizado', () => {
    it('Deve gerar o buffer PDF com as options', async () => {
      const templateHtml = '<html><body><h1>Hello World</h1></body></html>';

      const bufferMoq = new Mock<Buffer>();
      const pageMock = {
        pdf: jest.fn().mockResolvedValue(bufferMoq.object()),
      };

      const pageMoq = new Mock<Page>()
        .setup(mock => mock.setContent)
        .returns(async () => {})
        .setup(mock => mock.pdf)
        .returns(pageMock.pdf)
        .setup(mock => mock.close)
        .returns(async () => {});

      browserMock.newPage.mockResolvedValue(pageMoq.object());

      const options: PDFOptions = {
        format: 'a4',
        height: '100px',
      };

      await service.toPdf(templateHtml, options);

      expect(pageMock.pdf).toHaveBeenNthCalledWith(1, options);
    });

    it('Deve gerar o buffer PDF sem as options', async () => {
      const templateHtml = '<html><body><h1>Hello World</h1></body></html>';

      const bufferMoq = new Mock<Buffer>();
      const pageMock = {
        pdf: jest.fn().mockResolvedValue(bufferMoq.object()),
      };

      const pageMoq = new Mock<Page>()
        .setup(mock => mock.setContent)
        .returns(async () => {})
        .setup(mock => mock.pdf)
        .returns(pageMock.pdf)
        .setup(mock => mock.close)
        .returns(async () => {});

      browserMock.newPage.mockResolvedValue(pageMoq.object());

      await service.toPdf(templateHtml);

      expect(pageMock.pdf).toHaveBeenNthCalledWith(1, undefined);
    });
  });

  describe('Dado um serviço para renderizar html', () => {
    it('Deve retornar uma instância de render html service', () => {
      const className = RenderHtmlService.make().constructor.name;

      expect(className).toBe('RenderHtmlService');
    });
  });
});
