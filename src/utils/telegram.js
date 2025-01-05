export const telegram = window.Telegram?.WebApp;

// Get Telegram user data
export const getTelegramUser = () => {
  if (!telegram) {
    console.error('Telegram WebApp is not available');
    return null;
  }

  const user = telegram.initDataUnsafe?.user;
  if (!user) {
    console.error('No user data available');
    return null;
  }

  return {
    id: user.id.toString(), // Telegram user ID
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
    languageCode: user.language_code,
    isPremium: user.is_premium
  };
};

// Check if running in Telegram WebApp
export const isTelegramWebApp = () => {
  return !!telegram;
};

// Initialize Telegram WebApp
export const initializeTelegram = () => {
  if (!telegram) {
    console.error('Telegram WebApp is not available');
    return;
  }

  // Enable closing confirmation
  telegram.enableClosingConfirmation();

  // Set up event handlers
  telegram.onEvent('viewportChanged', () => {
    // Handle viewport changes
  });

  // Ready event
  telegram.ready();
};