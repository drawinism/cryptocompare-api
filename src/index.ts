// tslint:disable
/// <reference path="./typings/global.d.ts" />
global.fetch = require('node-fetch');

import { request } from './helpers';

import {
    CoinListResponse,
    DayAverageOptions,
    DayAverageResponse,
    GenerateAverageOptions,
    GenerateAverageResponse,
    PriceHistoricalOptions,
    PriceHistoricalResponse,
    PriceMultiFullResponse,
    PriceMultiOptions,
    PriceMultiResponse,
    PriceOptions,
    PriceResponse,
    QueryParamsObject,
    RateLimitStatsResponse,
} from './interfaces';

/**
 * Get general info for all the coins available on the website.
 */
export const getCoinList = (): Promise<CoinListResponse> => {
    return request('data/all/coinlist');
};

/**
 * Get the latest price for a list of one or more currencies.
 * Really fast, 20-60 ms. Cached each 10 seconds.
 */
export const getPrice = (options: PriceOptions): Promise<PriceResponse> => {
    return request('data/price', options);
};

/**
 * Same as single getPrice but with multiple from symbols.
 * Returns a matrix.
 */
export const getPriceMulti = (options: PriceMultiOptions): Promise<PriceMultiResponse> => {
    return request('data/pricemulti', options);
};

/**
 * Get all the current trading info (price, vol, open, high, low etc)
 * of any list of cryptocurrencies in any other currency that you need.
 * If the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion.
 * This API also returns Display values for all the fields.
 * If the oposite pair trades, it is inverted (eg.: BTC-XMR).
 */
export const getPriceMultiFull = (options: PriceMultiOptions): Promise<PriceMultiFullResponse> => {
    return request('data/pricemultifull', options);
};

/**
 * Same as getPriceMultiFull, but values are averaged based on markets
 */
export const generateAverage = (options: GenerateAverageOptions): Promise<GenerateAverageResponse> => {
    return request('data/generateAvg', options);
};

/**
 * Get the price of any cryptocurrency in any other currency that you need at a given timestamp.
 * The price comes from the daily info, so it would be the price at the end of the day GMT based on the requested TS.
 * If the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion.
 * Tries to get direct trading pair data. If there is none or it is more than 30 days before the ts requested, it uses BTC conversion.
 * If the opposite pair trades, it is inverted (eg.: BTC-XMR).
 */
export const getPriceHistorical = (options: PriceHistoricalOptions): Promise<PriceHistoricalResponse> => {
    return request('data/pricehistorical', options);
};

/**
 * Get day average price. The values are based on hourly vwap data and the average can be calculated in different ways.
 * It uses BTC conversion if data is not available because the coin is not trading in the specified currency.
 * If tryConversion is set to false it will give you the direct data.
 * If no toTS is given it will automatically do the current day.
 * Also for different timezones use the UTCHourDiff param.
 * The calculation types are:
 *  - VWAP: a VWAP of the hourly close price
 *  - MidHighLow: the average between the 24 H high and low
 *  - VolFVolT - the total volume from / the total volume to (only available with tryConversion set to false so only for direct trades but the value should be the most accurate average day price)
 */
export const getDayAverage = (options: DayAverageOptions): Promise<DayAverageResponse> => {
    return request('data/dayAvg', options);
};

/**
 * Get the rate limits left for you on the histo, price and news paths in the current hour.
 */
export const getHourRateLimit = (): Promise<RateLimitStatsResponse> => {
    return request('stats/rate/hour/limit');
};

/**
 * Get the rate limits left for you on the histo, price and news paths in the current minute.
 */
export const getMinuteRateLimit = (): Promise<RateLimitStatsResponse> => {
    return request('stats/rate/minute/limit');
};

/**
 * Get the rate limits left for you on the histo, price and news paths in the current minute.
 */
export const getSecondRateLimit = (): Promise<RateLimitStatsResponse> => {
    return request('stats/rate/second/limit');
};
