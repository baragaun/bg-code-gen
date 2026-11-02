import { expect } from 'chai';
import { escapeForSingleQuotedString } from './getClassAttributes.js';

describe('escapeForSingleQuotedString', () => {
  it('escapes a single apostrophe', () => {
    expect(escapeForSingleQuotedString("the user's session")).to.equal("the user\\'s session");
  });

  it('escapes a backslash before escaping quotes, so it does not double-escape', () => {
    expect(escapeForSingleQuotedString("a\\'b")).to.equal("a\\\\\\'b");
  });

  it('escapes a newline', () => {
    expect(escapeForSingleQuotedString('line one\nline two')).to.equal('line one\\nline two');
  });

  it('escapes a carriage return', () => {
    expect(escapeForSingleQuotedString('line one\r\nline two')).to.equal('line one\\r\\nline two');
  });

  it('escapes apostrophes and newlines together, as in a multi-line SDL description', () => {
    const input = "the user's session\nexpires after 30 days";
    const result = escapeForSingleQuotedString(input);

    expect(result).to.equal("the user\\'s session\\nexpires after 30 days");
    // The whole point: embedding the result in a single-quoted literal must be valid JS.
    // eslint-disable-next-line no-eval
    expect(eval(`'${result}'`)).to.equal(input);
  });

  it('leaves a plain string with none of these characters unchanged', () => {
    expect(escapeForSingleQuotedString('plain description')).to.equal('plain description');
  });
});
