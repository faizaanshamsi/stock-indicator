# Naming Convention

* Signal - object created when indicator is hit
* Indicator - Class level definition of a technical analysis of a stock
* Indicator computed closing values - data calculated end of day for use by signal calculations

# Indicators

## Moving Averages

### Simple Moving Average

* Average of X day closing prices

#### 200 Day Simple Moving Average
#### 50 Day Simple Moving Average
#### 5 Day Simple Moving Average

### Exponential Moving Average

* Needs X Day SMA
* Needs multiplier: 2 / (Time periods + 1)
* EMA = (close - EMA(previous day)) x multiplier + EMA(previous day)

#### 200 Day Exponential Moving Average
#### 50 Day Exponential Moving Average
#### 5 Day Exponential Moving Average

## Bollinger Bands

* Need 20 day SMA
* Need 20 day standard deviation of closing prices
* Middle Band = 20-day simple moving average (SMA)
* Upper Band = 20-day SMA + (20-day standard deviation of price x 2)
* Lower Band = 20-day SMA - (20-day standard deviation of price x 2)

## Volume Weighted Average Price

* Dollar Volume / Unit volume
* ![VWAP](http://i.investopedia.com/inv/dictionary/terms/vwap.gif)

## Chandelier Exit

* Average true range: Current ATR = [(Prior ATR x 13) + Current TR] / 14
* Chandelier Exit (long) = 22-day High - ATR(22) x 3
* Chandelier Exit (short) = 22-day Low + ATR(22) x 3

## Pivot Points

### Standard Pivot Points

* Pivot Point (P) = (High + Low + Close)/3
* Support 1 (S1) = (P x 2) - High
* Support 2 (S2) = P  -  (High  -  Low)
* Resistance 1 (R1) = (P x 2) - Low
* Resistance 2 (R2) = P + (High  -  Low)

### Fibonacci Pivot Points

* Pivot Point (P) = (High + Low + Close)/3
* Support 1 (S1) = P - {.382 * (High  -  Low)}
* Support 2 (S2) = P - {.618 * (High  -  Low)}
* Support 3 (S3) = P - {1 * (High  -  Low)}
* Resistance 1 (R1) = P + {.382 * (High  -  Low)}
* Resistance 2 (R2) = P + {.618 * (High  -  Low)}
* Resistance 3 (R3) = P + {1 * (High  -  Low)}

## Price Channels

* Upper Channel Line: 20-day high
* Lower Channel Line: 20-day low
* Centerline: (20-day high + 20-day low)/2

## MACD (Not important interday)

* MACD Line: (12-day EMA - 26-day EMA)
* Signal Line: 9-day EMA of MACD Line
* MACD Histogram: MACD Line - Signal Line

## RSI (Relative Strength Index)

* Average Gain: 14 days
* Average Loss: 14 days
* RS = Average Gain / Average Loss
* RSI =  100 - (100 / 1 + RS)

## Trendlines

# Architecture

## Server

### Badass Go? servers(x100)

* Beginning of day: load computed closing values into memory from RDS Postgres (firebase for now)
* Streaming - Read in stock data from Tradier
* Calculate Signals for each stock against all indicators and push to firebase

### Ruby server

* 8 p.m. EST - Get day's closing prices, append computed closing values with newly calculated data into RDS postgres (firebase for now)

## Firebase

* Truncate old (more than 1000?) signals and store somewhere else

## Client

* Gets pushed signals from firebase realtime
* Client side calculations for UI behavior

# Signal Structure

* Ticker
* Name
* Timestamp
* Current tick price
* Direction
