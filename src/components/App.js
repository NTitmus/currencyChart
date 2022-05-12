import React, {useState, useEffect} from "react";
import axios from 'axios';
import BarChart2 from './BarChart2'

import Select from 'react-select';


const App = () => {
    const [tempList, setTempList] = useState([]);
    const [counter, setCounter] = useState(1);
    const [selectedCurr, setSelectedCurr] = useState(null);
    const fromCurrency = 'GBP';
    const toCurrency = 'EUR';
    //{rate: 0.99, num: 0}
    //{rate: 0.99, num: 0}, {rate: 0.9901, num: 1}, {rate: 0.99005, num: 2}

    const toCurrOptions = [
        {code: 'SGD', name: 'Singapore Dollar'},
        {code: 'USD', name: 'United States Dollar'},
        {code: 'EUR', name: 'Euro'},
        {code: 'INR', name: 'Indian Rupee'},
        {code: 'IDR', name: 'Indonesian Rupiah'},
        {code: 'ILS', name: 'Israeli New Sheqel'}
    ]

    const onButtonClick = () => {
        const makeReq = async () => {
            //const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', 
            //{params:{
            //    q: 'London',
            //    appid: '',
            //    units: 'metric'
            //}})
            if (selectedCurr===null){return}

            const response = await axios.get('https://www.alphavantage.co/query',
            {params:{
                function: 'CURRENCY_EXCHANGE_RATE',
                from_currency: fromCurrency,
                to_currency: selectedCurr,
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
        <div className="ui container">
            <div className="ui segment">
                <div className="ui header">
                <h2>Currency Conversion from {fromCurrency} to {selectedCurr}</h2>
                </div>
                    <div>
                    <p>The base currency is £ (GBP).  The button calls the <a href='https://www.alphavantage.co'>Alphavantage</a> API 
                    to get the selected target currency.  The chart is an autoscaling bar chart made 
                    using the D3 library.  The Y intercept value is NOT zero as in most bar charts, but 
                    corresponds to the value shown on the bottom left corner of the chart (to enable 
                    meaningful autoscaling).  
                    </p>
                    </div>
            
            <br/>
            
            <Select options={toCurrOptions.map((i)=>({label:i.name, value: i.code}))}
            onChange={(s)=>{setSelectedCurr(s.value); setTempList([])}}
            />
            </div>
            
            <div className="ui segment">
            <BarChart2 data={tempList}/>
            
            <button className="ui blue button" onClick={()=>onButtonClick()}>Get</button>
            </div>
        </div>
    );

}
export default App