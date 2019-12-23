import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-fault-trend",
  templateUrl: "./fault-trend.component.html",
  styleUrls: ["../../style.css"]
})
export class FaultTrendComponent implements OnInit {
  options: any;
  constructor() {}

  ngOnInit() {
    this.createGraph();
  }

  createGraph() {
    this.options = {
      title: {
        text: "Fault Trend"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      legend: {
        data: ["All faults/failure", "Not Mission Capable"]
      },
      toolbox: {
        feature: {
          title: "Download",
          saveAsImage: {}
        }
      },
      grid: {
        containLabel: true
      },
      xAxis: {
        min: 0,
        max: 1400,
        type: "value",
        axisLine: { onZero: false }
      },
      yAxis: {
        min: 0,
        max: 100,
        type: "value"
      },
      series: [
        {
          name: "All faults/failure",
          type: "line",
          showSymbol: true,
          symbolSize: 8,
          data: [
            30.8,
            30.8,
            47.7,
            91.7,
            100.2,
            110,
            146.6,
            155.3,
            164.4,
            173,
            190.2,
            200.5,
            203,
            262.6,
            287.9,
            330.6,
            316.5,
            345.3,
            355.3,
            393.4,
            403.9,
            414.7,
            424.7,
            458.3,
            463.3,
            474.3,
            474.3,
            615.7,
            645.8,
            651.2,
            710,
            768.4,
            768.4,
            784.4,
            790.4,
            801.2,
            801.2,
            820.2,
            820.2,
            825.2,
            825.2,
            837.8,
            837.8,
            848.4,
            848.4,
            859,
            889,
            889,
            898.7,
            898.7,
            898.7,
            919.7,
            943.7,
            958.5,
            969.6,
            978,
            1017.4,
            1027.1,
            1027.1,
            1033.6,
            1033.6,
            1044.1,
            1044.1,
            1083.9,
            1101,
            1117.2,
            1213.5,
            1213.5,
            1227.4,
            1244.6,
            1253.6,
            1253.6,
            1253.6,
            1253.6,
            1253.6,
            1291.3,
            1291.3,
            1291.3,
            1291.3,
            1291.3,
            1291.3,
            1291.3,
            1291.3,
            1291.3,
            1291.3,
            1291.3,
            1291.3,
            1291.3,
            1291.3,
            1291.3,
            1291.3
          ]
        }
      ]
    };
  }
}


