export default class FormValidator {
  static emailValidator(value: string): boolean {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    return emailRegex.test(value);
  }

  static passwordValidator(value: string): boolean {
    return !(value.length < 8 || value.length > 20);
  }

  static numberValidator(value: string): boolean {
    const number = parseFloat(value);
    return !(isNaN(number) || number <= 0);
  }

  static walletAmountValidator(value: string): boolean {
    const number = parseFloat(value);
    return !(isNaN(number) || number < 1000);
  }

  static phoneNumberValidator(value: string): boolean {
    if (value.length !== 11) {
      return false;
    }
    const number = parseInt(value, 10);
    return !isNaN(number);
  }

  static basicValidator(value: string): boolean {
    return value.trim() !== '';
  }

  static isValidForm(
    fields: {value: string; validator: (value: string) => boolean}[],
  ): boolean {
    for (let field of fields) {
      const error = field.validator(field.value);
      if (!error) {
        return false;
      }
    }
    return true;
  }
}
