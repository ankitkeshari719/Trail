import { Component, OnInit } from "@angular/core";
import { GraphService } from "../graph.service";
import { InternalResponse, INTERNAL_RESPONSE_STATUS } from "src/app/services";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-overall-distribution-driver",
  templateUrl: "./overall-distribution-driver.component.html",
  styleUrls: ["../../style.css"]
})
export class OverallDistributionDriverComponent implements OnInit {
  isLoading: boolean = false;
  barOptions: any;
  pieOption: any;
  dailyScoreDateList: any;
  dailyScoreList: any;
  scoreList: any;
  scorePercentList: any;
  constructor(private graphService: GraphService) {}

  ngOnInit() {
    this.getOverallDriverScore();
  }

  getOverallDriverScore() {
    this.graphService.getOverallDriverScore().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.isLoading = false;
          this.getData();
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
  }

  createGraph() {
    this.barOptions = {
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
      xAxis: {
        type: "category",
        data: this.dailyScoreDateList
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: this.dailyScoreList,
          type: "bar"
        }
      ]
    };

    this.pieOption = {
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
        data: this.scoreList
      },
      series: [
        {
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: this.scorePercentList,
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

  getData() {
    let data = {
      dailyScoreList: [
        {
          date: "2019-09-19",
          scoreValue: 3
        },
        {
          date: "2019-09-19",
          scoreValue: 5
        },
        {
          date: "2019-09-19",
          scoreValue: 6
        },
        {
          date: "2019-09-19",
          scoreValue: 2
        },
        {
          date: "2019-09-19",
          scoreValue: 1
        },
        {
          date: "2019-09-19",
          scoreValue: 4
        },
        {
          date: "2019-09-19",
          scoreValue: 19
        },
        {
          date: "2019-09-19",
          scoreValue: 0
        },
        {
          date: "2019-09-19",
          scoreValue: 13
        },
        {
          date: "2019-09-19",
          scoreValue: 4
        },
        {
          date: "2019-09-19",
          scoreValue: 5
        },
        {
          date: "2019-09-19",
          scoreValue: 7
        },
        {
          date: "2019-09-19",
          scoreValue: 3
        },
        {
          date: "2019-09-19",
          scoreValue: 5
        },
        {
          date: "2019-09-19",
          scoreValue: 6
        },
        {
          date: "2019-09-19",
          scoreValue: 2
        },
        {
          date: "2019-09-19",
          scoreValue: 1
        },
        {
          date: "2019-09-19",
          scoreValue: 4
        },
        {
          date: "2019-09-19",
          scoreValue: 19
        },
        {
          date: "2019-09-19",
          scoreValue: 0
        },
        {
          date: "2019-09-19",
          scoreValue: 13
        },
        {
          date: "2019-09-19",
          scoreValue: 4
        },
        {
          date: "2019-09-19",
          scoreValue: 5
        },
        {
          date: "2019-09-19",
          scoreValue: 7
        },
        {
          date: "2019-09-19",
          scoreValue: 3
        },
        {
          date: "2019-09-19",
          scoreValue: 5
        },
        {
          date: "2019-09-19",
          scoreValue: 6
        },
        {
          date: "2019-09-19",
          scoreValue: 2
        },
        {
          date: "2019-09-19",
          scoreValue: 1
        },
        {
          date: "2019-09-19",
          scoreValue: 4
        },
        {
          date: "2019-09-19",
          scoreValue: 19
        },
        {
          date: "2019-09-19",
          scoreValue: 0
        },
        {
          date: "2019-09-19",
          scoreValue: 13
        },
        {
          date: "2019-09-19",
          scoreValue: 4
        },
        {
          date: "2019-09-19",
          scoreValue: 5
        },
        {
          date: "2019-09-19",
          scoreValue: 7
        }
      ],
      percentScoreList: [
        {
          score: "Acceptable",
          scorePercent: 24
        },
        {
          score: "Acceptable",
          scorePercent: 25
        },
        {
          score: "Acceptable",
          scorePercent: 13
        },
        {
          score: "Acceptable",
          scorePercent: 23
        },
        {
          score: "Acceptable",
          scorePercent: 15
        }
      ]
    };

    this.dailyScoreDateList = data.dailyScoreList.map(d => {
      return d.date;
    });

    this.dailyScoreList = data.dailyScoreList.map(d => {
      return d.scoreValue;
    });

    this.scoreList = data.percentScoreList.map(d => {
      return d.score;
    });

    this.scorePercentList = data.percentScoreList.map(d => {
      return d.scorePercent;
    });
    this.createGraph();
  }
}
