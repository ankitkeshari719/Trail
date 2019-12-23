import { Component, OnInit } from "@angular/core";
import { login_page_image } from "./../../config/const";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.module.style.css"]
})
export class AuthComponent implements OnInit {
  image_url: string;
  constructor() {}

  ngOnInit() {
    this.image_url = login_page_image;
  }
}
