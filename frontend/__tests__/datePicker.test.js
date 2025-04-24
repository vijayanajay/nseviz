// datePicker.test.js
// Jest unit tests for frontend/main.js date picker logic

const { setupDatePicker, getDatePickerValue } = require('../main');

describe('Date Picker', () => {
  let input;

  beforeEach(() => {
    document.body.innerHTML = '<input type="date" id="datepicker">';
    input = document.getElementById('datepicker');
    setupDatePicker();
  });

  test('should initialize with empty value', () => {
    expect(input.value).toBe('');
  });

  test('should update value on change', () => {
    input.value = '2025-04-25';
    input.dispatchEvent(new Event('change'));
    expect(getDatePickerValue()).toBe('2025-04-25');
  });

  test('should add focus class on focus', () => {
    input.dispatchEvent(new Event('focus'));
    expect(input.classList.contains('focus')).toBe(true);
  });

  test('should remove focus class on blur', () => {
    input.classList.add('focus');
    input.dispatchEvent(new Event('blur'));
    expect(input.classList.contains('focus')).toBe(false);
  });
});
