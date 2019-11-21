import { timeParse } from "d3-time-format";
import { SET_STOCK, SET_STOCK_ERROR, SET_STOCK_STATUS } from "../actionTypes";

const initialState = {
    quote: {},
    news: [],
    chart: [],
    inWatchlist: false,
    inPortfolio: false,
    error: '',
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_STOCK: {
            const { stock } = action.payload;
            const { quote, news, chart, inWatchlist, inPortfolio} = stock;

            return {
                ...state,
                quote,
                news,
                chart: transformChartData(chart),
                inWatchlist,
                inPortfolio,
                error: '',
            };
        }
        case SET_STOCK_STATUS: {
            return {
                ...state,
                ...action.payload
            };
        }
        case SET_STOCK_ERROR: {
            const { error } = action.payload;
            return {
                ...state,
                error,
            };
        }
        default:
            return state;
    }
}

function transformChartData(chartData) {
    const parseDate = timeParse("%Y-%m-%d");

    let data = chartData.map(d => {
        return {
            date: parseDate(d.date),
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
            volume: d.volume,
        }
    })

    data.columns = ['date', 'open', 'high', 'low', 'close', 'volume']

    return data;
}