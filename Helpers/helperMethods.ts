const helperMethods = {
  formatSSN: (SSN: string) => {
    const cleaned = SSN.replace(/\D+/g, '');
  
    let formatted = cleaned;
    if (cleaned.length > 3 && cleaned.length <= 5) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else if (cleaned.length > 5) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 9)}`;
    }
    return formatted;
  },

  maskSSN: (ssn: string) => {
    const cleaned = ssn.replace(/\D+/g, '');
    if (cleaned.length !== 9) return '';
    return `***-**-${cleaned.slice(5, 9)}`;
  }
  
};

export default helperMethods;