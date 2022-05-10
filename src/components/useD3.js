import React from 'react';
import * as d3 from 'd3';

export const useD3 = (renderChartFn, dependencies) => {
    const ref = React.useRef();
    //return () => {d3.select(ref.current).remove()};
    React.useEffect(()=>{
        renderChartFn(d3.select(ref.current));
        //return () => {};
        return () => {console.log('callback');
            d3.select(ref.current).select("svg").remove()};

    }, dependencies);
    return ref;
}