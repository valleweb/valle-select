import { pressSpace, pressEnter } from '@polymer/iron-test-helpers/mock-interactions';

suite('valle-option - default', () => {

  let optionDefault,
      selected;

  setup(() => {
    optionDefault = fixture('default');
    selected = fixture('withSelected');
  });

  test('Should render the valle-option with correct default props', () => {

    assert.isTrue(optionDefault.hasAttribute('role'));
    assert.equal(optionDefault.getAttribute('role'), 'option');

    assert.isTrue(optionDefault.hasAttribute('tabindex'));
    assert.equal(optionDefault.getAttribute('tabindex'), '0');

    assert.isTrue(optionDefault.hasAttribute('aria-selected'));
    assert.equal(optionDefault.getAttribute('aria-selected'), 'false');

    assert.equal(optionDefault.textContent, 'Content demo');

  });

  test('Shoud render a selected option', () => {

    assert.isTrue(selected.hasAttribute('selected'));
    assert.equal(selected.getAttribute('aria-selected'), 'true');

  });

  test('When clicked, set the selected state', () => {

    assert.equal(optionDefault.getAttribute('aria-selected'), 'false');
    assert.isFalse(optionDefault.hasAttribute('selected'));

    optionDefault.click();

    assert.equal(optionDefault.getAttribute('aria-selected'), 'true');
    assert.isTrue(optionDefault.hasAttribute('selected'));

  });

  test('Should toggle the selected state with javascript API', () => {

    assert.equal(optionDefault.getAttribute('aria-selected'), 'false');
    assert.isFalse(optionDefault.hasAttribute('selected'));

    optionDefault.selected = true;

    assert.equal(optionDefault.getAttribute('aria-selected'), 'true');
    assert.isTrue(optionDefault.hasAttribute('selected'));

    optionDefault.selected = false;

    assert.equal(optionDefault.getAttribute('aria-selected'), 'false');
    assert.isFalse(optionDefault.hasAttribute('selected'));

  });

  test('Should set the selected state when press space', () => {

    assert.equal(optionDefault.getAttribute('aria-selected'), 'false');
    assert.isFalse(optionDefault.hasAttribute('selected'));

    pressSpace(optionDefault);

    assert.equal(optionDefault.getAttribute('aria-selected'), 'true');
    assert.isTrue(optionDefault.hasAttribute('selected'));

  });

  test('Should set the selected state when press enter', () => {

    assert.equal(optionDefault.getAttribute('aria-selected'), 'false');
    assert.isFalse(optionDefault.hasAttribute('selected'));

    pressEnter(optionDefault);

    assert.equal(optionDefault.getAttribute('aria-selected'), 'true');
    assert.isTrue(optionDefault.hasAttribute('selected'));

  });

});
