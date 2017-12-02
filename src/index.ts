import {
    CoinListResponse,
    PriceOptions,
    PriceResponse,
    QueryParamsObject,
} from './interfaces';

/**
 * Gets data from the CryptoCompare api.
 */
export const request = (path: string, options: QueryParamsObject = {}): Promise<any> => {
    const queryString = convertObjectToQueryString(options);
    const url = `https://min-api.cryptocompare.com/data/${path}${queryString}`;

    return fetch(url)
        .then(res => res.json())
        .then(body => {
            if (body.Response === 'Error') {
                throw new Error(body.Message);
            }

            return body;
        });
};

/**
 * Get general info for all the coins available on the website.
 */
export const getCoinList = (): Promise<CoinListResponse> => {
    return request('all/coinlist');
};

/**
 * Get data for a currency pair.
 * Returns general block explorer information, aggregated data, and individual data for each exchange available.
 */
export const getCoinSnapshot = () => {};

/**
 * Get the general, subs, and the aggregated prices for all pairs available.
 */
export const getCoinSnapshotFullById = () => {};

/**
 * Get open, high, low, close, volumefrom, and volumeto daily historical data.
 * The values are based on 00:00 GMT time.
 * It uses BTC conversion if data is not available because the coin is not trading in the specified currency.
 */
export const getHistoDay = () => {};

/**
 * Get open, high, low, close, volumefrom, and volumeto for each hour of historical data.
 * It uses BTC conversion if data is not available because the coin is not trading in the specified currency.
 */
export const getHistoHour = () => {};

/**
 * Get open, high, low, close, volumefrom and volumeto for each minute of historical data.
 * This data is only stored for 7 days. If you need more, use the hourly or daily path.
 * It uses BTC conversion if data is not available because the coin is not trading in the specified currency.
 */
export const getHistoMinute = () => {};

/**
 * Returns all the mining contracts in a JSON array.
 */
export const getMiningContracts = () => {};

/**
 * Used to get all the mining equipment available on the website.
 * It returns an array of mining equipment objects.
 */
export const getMiningEquipment = () => {};

/**
 * Get the latest price for a list of one or more currencies.
 * Really fast, 20-60 ms. Cached each 10 seconds.
 */
export const getPrice = (options: PriceOptions): Promise<PriceResponse> => {
    const { tsyms, ...opts } = options;
    const toSymbols = Array.isArray(tsyms) ? tsyms.join(',') : tsyms;

    return request('price', {
        ...opts,
        tsyms: toSymbols,
    });
};

/**
 * Get the price of any cryptocurrency in any other currency that you need at a given timestamp.
 * The price comes from the daily info, so it would be the price at the end of the day GMT based on the requested TS.
 * If the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion.
 * Tries to get direct trading pair data. If there is none or it is more than 30 days before the ts requested, it uses BTC conversion.
 * If the opposite pair trades, it is inverted (eg.: BTC-XMR).
 */
export const getPriceHistorical = () => {};

/**
 * Get CryptoCompare website, Facebook, code repository, Twitter and Reddit data for coins.
 * If called with the id of a cryptopian you just get data from the website that is available to the public.
 */
export const getSocialStats = () => {};

/**
 * Get top pairs by volume for a currency (always uses our aggregated data).
 * The number of pairs you get is the minimum of the limit you set (default 5) and the total number of pairs available.
 */
export const getTopPairs = () => {};

/**
 * Takes an object and returns a query string
 */
export const convertObjectToQueryString = (obj: QueryParamsObject) => {
    const queryParamPairs: string[] = [];

    Object.keys(obj).forEach(key => {
        const value = obj[key];

        if (value !== undefined) {
            queryParamPairs.push(`${key}=${value}`);
        }
    });

    const queryString = queryParamPairs.join('&');

    return queryString.length ? `?${queryString}` : queryString;
};
