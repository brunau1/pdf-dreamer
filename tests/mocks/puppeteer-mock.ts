import { Browser, Page } from "puppeteer";

export const pageMock = {
  pdf: jest.fn(),
  setContent: jest.fn(),
  close: jest.fn(),
};

export const pageMoq = {
  pdf: pageMock.pdf,
  close: pageMock.close,
  setContent: pageMock.setContent,
} as unknown as Page;

export const browserMoq = {
  newPage: jest.fn().mockResolvedValue(pageMoq),
  close: jest.fn().mockResolvedValue(null),
} as unknown as Browser;
