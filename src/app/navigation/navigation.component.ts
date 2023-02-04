import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  public select!: string;

  @Output()
  onChanged = new EventEmitter<string>();
  selectChange(newSelect: string) {
    this.select = newSelect;
    this.onChanged.emit( this.select );
  }

}
