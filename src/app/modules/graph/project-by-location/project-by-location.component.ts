import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-project-by-location",
  templateUrl: "./project-by-location.component.html",
  styleUrls: ["../../style.css"]
})
export class ProjectByLocationComponent implements OnInit {
  options: any;
  constructor() {}

  ngOnInit() {
    this.createGraph();
  }

  createGraph() {
    this.options = {
      title: {
        text: "No. of NPIP & C&M "
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
        data: ["NPIP", "C&M"]
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
      xAxis: [
        {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6", "7"]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "NPIP",
          type: "bar",
          stack: "project_type",
          areaStyle: {},
          data: [2, 4, 1, 2, 4, 1, 2, 4, 1]
        },
        {
          name: "C&M",
          type: "bar",
          stack: "project_type",
          areaStyle: {},
          data: [3, 2, 5, 3, 2, 5, 3, 2, 5]
        }
      ]
    };
  }
}
