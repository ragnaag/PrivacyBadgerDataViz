import React, { Component } from "react";
import * as d3 from "d3";
import "./App.css";
import BubbleChart from '@weknow/react-bubble-chart-d3';

var data = require('./data/data.json');

class Bubble extends Component {

  sort_trackers(obj){
    // convert object into array
  	var sortable=[];
  	for(var key in obj)
  		if(obj.hasOwnProperty(key))
  			sortable.push([key, obj[key]]); // each item is an array in format [key, value]

  	// sort items by value
  	sortable.sort(function(a, b){
  	  return b[1]-a[1]; // compare numbers
  	});
  	return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
  }

  get_top_10_trackers(){
    var snitch_map = data['snitch_map']; // get snitch_map
    var output_list = [];

    // we want to find the keys that have the most values
    for(let tracker in snitch_map){
      snitch_map[tracker] = snitch_map[tracker].length;
    }
    snitch_map = this.sort_trackers(snitch_map);

    for(let i = 0; i < 10; i++){
      if(snitch_map[i]){
        let new_entry = {label:snitch_map[i][0], value:snitch_map[i][1]};
        output_list.push(new_entry);
      } else {
        break;
      }
    }

    return output_list;
  }

  bubbleClick(label){
    console.log(label, ' bubble was clicked...')
    window.open('https://' + label, '_blank');
  }
  legendClick(label){
  console.log("Customer legend click func")
  }


  render(){
    var output = this.get_top_10_trackers();
    console.log(output)
    return(
      <div class="tracker_bubbles">
      <BubbleChart
        graph= {{
          zoom: 0.98,
          offsetX: 0.0,
          offsetY: -0.11,
          }}
          width={800}
          height={700}
          padding={1} // optional value, number that set the padding between bubbles
          showLegend={false} // optional value, pass false to disable the legend.
          legendPercentage={20} // number that represent the % of with that legend going to use.
          legendFont={{
            family: 'Arial',
            size: 12,
            color: '#000',
            weight: 'bold',
          }}
          valueFont={{
            family: 'Arial',
            size: 18,
            color: '#fff',
            weight: 'bold',
          }}
          labelFont={{
            family: 'Arial',
            size: 12,
            color: '#fff',
            weight: 'bold',
          }}
          //Custom bubble/legend click functions such as searching using the label, redirecting to other page
          bubbleClickFun={this.bubbleClick}
          legendClickFun={this.legendClick}
          data={output}
        />
        </div>
    );
  }
}

export default Bubble;
