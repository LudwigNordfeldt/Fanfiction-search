import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Fic {
  title: string;
  author: string;
  tags: string[];
  summary: string;
}

export interface Tile {
  cols: number;
  rows: number;
  text: string;
  multiple?: boolean;
  textArea?: boolean;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  mockResults: Fic[] = [
    { title: 'Blood and Iron', author: 'Fire Lord Sozin', tags: ['Imperialism', 'Propaganda'], summary: 'Where some see harmony, others see tyranny. Where some see balance, others see stratification. The longest dark age in human history is being ended by enlightened Fire Nation.' },
    { title: 'Love from the Ashes of War', author: 'Minion of Set', tags: ['Hurt&comfort', 'Romance'], summary: 'Her fate is left in the Avatars gentle hands.' },
    { title: 'Salvage', author: 'The Muffin Lance', tags: ['Fluff', 'Hurt&comfort'], summary: 'Hakoda rescues certain 13 years old banished prince.' },
    { title: 'Saga of Sun and Moon', author: 'Charles', tags: ['Drama','Adventure'], summary: 'Choice made echoes and alters te whole story of Gaang adventures.' },
  ];

  tiles: Tile[] = [
    { cols: 1, rows: 1, text: 'Title' },
    { cols: 1, rows: 1, text: 'Author'},
    { cols: 2, rows: 1, text: 'Tags', multiple: true},
    { cols: 2, rows: 1, text: 'Summary', textArea: true }
  ]

  tags: string[] = [];
  @ViewChild('tagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
