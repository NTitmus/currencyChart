import React, {useState, useEffect} from "react";
import axios from 'axios';
import BarChart2 from './BarChart2'

const App = () => {
    const [tempList, setTempList] = useState([]);
    const [counter, setCounter] = useState(1);
    const fromCurrency = 'GBP';
    const toCurrency = 'EUR';
    //{rate: 0.99, num: 0}
    //{rate: 0.99, num: 0}, {rate: 0.9901, num: 1}, {rate: 0.99005, num: 2}

    const onButtonClick = () => {
        const makeReq = async () => {
            //const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', 
            //{params:{
            //    q: 'London',
            //    appid: '',
            //    units: 'metric'
            //}})
            const response = await axios.get('https://www.alphavantage.co/query',
            {params:{
                function: 'CURRENCY_EXCHANGE_RATE',
                from_currency: fromCurrency,
                to_currency: toCurrency,
                apikey: 'OMY3B78I6Z44OO7M'
            }}
            )

            console.log(response.data)
            console.log('???')
            const newList = tempList.concat(
                {rate: response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'],
                num: counter,
                datetime: response.data['Realtime Currency Exchange Rate']['6. Last Refreshed']
        });
        if (newList.length>6) {
            const sliceNum = newList.length-6
            setTempList(newList.slice(sliceNum))
        } else {
            setTempList(newList)
        }
            
            //setTempList(newList);
            setCounter(counter+1);
        }
        makeReq();
    }

    useEffect(()=>{
        console.log(tempList)
    },
    [tempList]
    )
    //<button onClick={()=>onButtonClick()}>Get</button>

    return (
        <div>
            Currency Conversion from {fromCurrency} to {toCurrency}
            
            <br/>
            <BarChart2 data={tempList}/>
            <button onClick={()=>onButtonClick()}>Get</button>
        </div>
    );

}
export default App