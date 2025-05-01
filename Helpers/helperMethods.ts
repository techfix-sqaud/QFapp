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
  },

  
// Helper function to convert a number to a string with leading zero if needed
  padNumber(num: number) {
  return num.toString().padStart(2, '0');
},

// Function to convert datePost to "time ago" format
  getTimeAgo(datePost: string | number | Date) {
  const currentDate = new Date();
  const postDate = new Date(datePost);

  const seconds = Math.floor((currentDate.getTime() - postDate.getTime()) / 1000);
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} days ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} months ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} years ago`;
}
  
};

export default helperMethods;