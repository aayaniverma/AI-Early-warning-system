const axios = require('axios');
const User = require('../models/User');
const { sendSMS } = require('./twilioService');

const SEVERE_WEATHER_CONDITION = 'Severe'; // Customize based on your criteria

const checkWeatherAndSendAlerts = async () => {
  // Replace with actual weather API endpoint and logic
  const weatherData = await axios.get('https://api.weather.com/alerts'); 

  const severeAlerts = weatherData.data.alerts.filter(alert => alert.severity === SEVERE_WEATHER_CONDITION);

  for (const alert of severeAlerts) {
    const users = await User.find({
      location: alert.location
    });

    for (const user of users) {
      const message = `Alert: Severe weather conditions detected in your area (${alert.location}). Stay safe!`;
      await sendSMS(`${user.countryCode}${user.phoneNumber}`, message);
    }
  }
};

module.exports = { checkWeatherAndSendAlerts };
