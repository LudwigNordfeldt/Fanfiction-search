import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fanfiction-read',
  templateUrl: './fanfiction-read.component.html',
  styleUrls: ['./fanfiction-read.component.scss']
})
export class FanfictionReadComponent {
  url?: string;
  fanfiction?: any[];
  constructor(public activatedRoute:ActivatedRoute, private http:HttpClient) {
    this.activatedRoute.params.subscribe(params => {
      this.url = params['url'];
      this.http.get<any[]>('/fanfiction', {params: {url: this.url??""}}).subscribe(fanfiction =>
        {
          this.fanfiction = fanfiction;
        });
    } )
  }



}
