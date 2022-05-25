import {Mock} from 'moq.ts';
import {Browser, PuppeteerNode} from 'puppeteer';

export const browserMock = {
  newPage: jest.fn(),
  close: jest.fn(),
};

export const browserMoq = new Mock<Browser>()
  .setup(m => m.newPage)
  .returns(browserMock.newPage)
  .setup(m => m.close)
  .returns(browserMock.close);

export const puppeteerMoq = new Mock<PuppeteerNode>()
  .setup(mock => mock.launch)
  .returns(async () => browserMoq.object());
