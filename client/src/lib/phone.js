export const customFormatPhoneNumber = (phoneNumber) => {
    // Remove non-digit characters
    const digits = phoneNumber.replace(/\D/g, '');
    if (digits.length === 11) {
      // Example custom format
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8)}`;
    }
    return phoneNumber;
  };