/**
 * Command-line interface for Turkcell Superonline's infrastructure checker.
 *
 * @author Yağızhan Burak Yakar (evrifaessa)
 * @license Apache-2.0
 */

const API = require('./lib/api');

async function main() {
    const cityID = 34;
    const cities = API.fetchCities();
    const city = await API.fetchCityByID(cityID);
    const counties = await API.fetchCounties(cityID);

    console.log(`${city.name} (${city.ID})`);
    console.log(counties);
}

main();