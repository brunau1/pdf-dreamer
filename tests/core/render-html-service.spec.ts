import { RenderHtmlService } from "../../src/core/services/render-html-service";
import { IRenderHtmlService } from "../../src/core/interfaces/render-html-service";
import { browserMoq, pageMock } from "../mocks/puppeteer-mock";
import { PDFOptions } from "puppeteer";

jest.mock("puppeteer", () => ({
  launch() {
    return browserMoq;
  },
}));
describe("Dado uma estratégia para gerar PDFs", () => {
  const templateHtml = "<html><body><h1>Hello World</h1></body></html>";

  const service: IRenderHtmlService = new RenderHtmlService();

  beforeEach(() => {
    pageMock.pdf.mockClear();
    pageMock.setContent.mockClear();
    pageMock.close.mockClear();

    pageMock.setContent.mockResolvedValue(null);
    pageMock.close.mockResolvedValue(null);
  });

  describe("Dado o método para gerar um buffer a partir de um template HTML renderizado", () => {
    describe("Dado que as options foram informadas", () => {
      it("Deve gerar o buffer PDF com as options informadas", async () => {
        const options: PDFOptions = {
          format: "a4",
          height: "100px",
        };

        const pdfSpy = jest
          .spyOn(pageMock, "pdf")
          .mockResolvedValue(Buffer.from(templateHtml));

        await service.toPdf(templateHtml, options);

        expect(pdfSpy).toHaveBeenNthCalledWith(1, options);
      });
    });

    describe("Dado que as options não foram informadas", () => {
      it("Deve gerar o buffer PDF", async () => {
        const pdfSpy = jest
          .spyOn(pageMock, "pdf")
          .mockResolvedValue(Buffer.from(templateHtml));

        await service.toPdf(templateHtml);

        expect(pdfSpy).toHaveBeenNthCalledWith(1, undefined);
      });
    });
  });
});
