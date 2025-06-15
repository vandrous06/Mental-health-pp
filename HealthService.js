// HealthService.js

/**
 * Simulates fetching sleep data for the current day.
 * @returns {Promise<Object>} A promise that resolves to an object with sleep hours.
 */
export const getSleepData = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    today: {
      hours: 7.5,
      quality: 'Good', // Example additional metric
    },
    // Placeholder for 7-day trend data
    trend: [6, 7, 8, 6.5, 7.5, 7, 7.2],
  };
};

/**
 * Simulates fetching step count for the current day.
 * @returns {Promise<Object>} A promise that resolves to an object with step count.
 */
export const getStepCount = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    today: 8500,
    // Placeholder for 7-day trend data
    trend: [7000, 8000, 9000, 7500, 8500, 8200, 8800],
  };
};