import { Component, OnInit } from "@angular/core";
import { GraphService } from "../graph.service";
import { InternalResponse, INTERNAL_RESPONSE_STATUS } from "src/app/services";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-dutycycle-proformance",
  templateUrl: "./dutycycle-proformance.component.html",
  styleUrls: ["../../style.css"]
})
export class DutycycleProformanceComponent implements OnInit {
  isLoading: boolean = false;
  options: any;
  constructor(private graphService: GraphService) {}

  ngOnInit() {
    this.getDutyCyclePerformedData();
  }

  getDutyCyclePerformedData() {
    this.graphService.getDutyCyclePerformedData().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.isLoading = false;
          this.createGraph(response.success_data.dutyCyclePerformedlist);
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
  }

  createGraph(dutyCyclePerformedlist) {
    let legendData = dutyCyclePerformedlist.map(a => a.activityLabel);
    let finalData = dutyCyclePerformedlist.map(a => {
      return {
        value: a.hoursPerc,
        name: a.activityLabel
      };
    });
    this.options = {
      title: {
        text: "DutyCycle Performance",
        x: "center"
      },
      tooltip: {
        trigger: "item"
      },
      toolbox: {
        feature: {
          title: "Download",
          saveAsImage: {}
        }
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: legendData
      },
      series: [
        {
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: finalData,
          itemStyle: {
            emphasis: {
              shadowBlur: 5,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }
}
