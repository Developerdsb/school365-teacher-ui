// Function to store JWT token in local storage
export const storeTokenInLocalStorage = (token) => {
  try {
    localStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error storing token in local storage:', error);
  }
};

// Function to clear the token from local storage
export const clearTokenInLocalStorage = () => {
  localStorage.removeItem('authToken');
};
