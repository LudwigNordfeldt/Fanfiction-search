import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "fanfiction-search";
  public select = "Collections";

  public onSelectChanged (newSelect: string) : void {
    this.select = newSelect;
  }
}
