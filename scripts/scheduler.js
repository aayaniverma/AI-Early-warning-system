import { schedule } from 'node-cron';
import { checkWeatherAndSendAlerts } from './services/weatherAlertService';

// Schedule to run every hour (adjust as needed)
schedule('0 * * * *', async () => {
  try {
    await checkWeatherAndSendAlerts();
    console.log('Weather alerts sent successfully.');
  } catch (error) {
    console.error('Error sending weather alerts:', error);
  }
});
