/**
 * API wrapper for Turkcell Superonline's infrastructure checker.
 * Basically imitates the official fibre map: https://www.superonline.net/internet/fiber/nerede
 *
 * @author Yağızhan Burak Yakar (evrifaessa)
 * @license Apache-2.0
 */

const axios = require('axios').default;
const cities = require('./cities.json');

const baseURL = "https://www.superonline.net/location";
const HTTPHeaders = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
    'Host': 'www.superonline.net',
    'Origin': 'https://www.superonline.net',
    'Referer': 'https://www.superonline.net/internet/fiber/nerede'
};

module.exports.fetchCities = function () {
    return cities;
}

module.exports.fetchCityByID = async function (cityID) {
    const city = this.fetchCities().find(city => city.ID === cityID);
    if (city === undefined || city.length == 0) {
        throw new Error("This city ID is invalid. Turkcell Superonline likely doesn't operate in this city yet.");
    }
    return city;
}

module.exports.fetchCounties = async function (cityID) {
    // Sanity checks
    if (typeof cityID !== "number") {
        throw new Error("City ID must be a valid number");
    }
    if (cityID < 1 || cityID > 81) {
        throw new Error("City ID must be between 1 and 81"); // daha 100 il olmadık
    }

    try {
      const response = await axios.post(`${baseURL}/county.json?cityId=${cityID}`, {
        headers: HTTPHeaders,
    });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }