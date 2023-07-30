import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fic } from '../search/search.component';

@Component({
  selector: 'app-fanfiction-read',
  templateUrl: './fanfiction-read.component.html',
  styleUrls: ['./fanfiction-read.component.scss']
})
export class FanfictionReadComponent {
  url?: string;
  fanfiction?: Fic;
  constructor(public activatedRoute:ActivatedRoute, private http:HttpClient) {
    this.activatedRoute.params.subscribe(params => {
      this.url = params['url'];
      this.http.get<Fic>('/fanfiction', {params: {url: this.url??""}}).subscribe(fanfiction =>
        {
          this.fanfiction = fanfiction;
        });
    } )
  }



}
