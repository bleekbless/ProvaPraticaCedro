import { SCRPage } from './app.po';

describe('scr App', () => {
  let page: SCRPage;

  beforeEach(() => {
    page = new SCRPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
