import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatChipInput, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { HttpClient } from '@angular/common/http';
import {FormControl} from '@angular/forms';
import { Observable, startWith, map, switchMap, from, filter, tap, debounceTime } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

export interface Fic {
  title: string;
  author: string;
  tags: string[];
  summary: string;
  url: string;
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

export class SearchComponent implements OnInit {
  page = 1;
  FicTitle?: string;
  FicAuthor?: string;
  FicSummary?: string;

  Fandom?: string;
  FicChars?: string;
  FicRels?: string;
  FicTags?: string;

  numOfFics?: number;
  NumRes?: number;
  pageSize = 5;

  myControl = new FormControl('');
  filteredOptions?: Observable<string[]>;

  myTags = new FormControl('');
  filteredTags?: Observable<string[]>;

  myChars = new FormControl('');
  filteredChars?: Observable<string[]>;

  myRels = new FormControl('');
  filteredRels?: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(2000),
      filter(value => !!value?.length && value.length > 0),
      switchMap(value => this.http.get<string[]>("/getFandoms", {params: {text: value || ''}} )),
    );

    this.filteredTags = this.myTags.valueChanges.pipe(
      debounceTime(2000),
      filter(value => !!value?.length && value.length > 0),
      switchMap(value => this.http.get<string[]>("/getTags", {params: {text: value || ''}} )),
    );

    this.filteredChars = this.myChars.valueChanges.pipe(
      debounceTime(2000),
      filter(value => !!value?.length && value.length > 0),
      switchMap(value => this.http.get<string[]>("/getChars", {params: {text: value || ''}} )),
    );

    this.filteredRels = this.myRels.valueChanges.pipe(
      debounceTime(2000),
      filter(value => !!value?.length && value.length > 0),
      switchMap(value => this.http.get<string[]>("/getRels", {params: {text: value || ''}} )),
    );
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  public fic:any = [];
  separatorKeyCodes = [ENTER, COMMA] as const;
  // mockResults: Fic[] = [
  //   { title: 'Blood and Iron', author: 'Fire Lord Sozin', tags: ['Imperialism', 'Propaganda'], summary: 'Where some see harmony, others see tyranny. Where some see balance, others see stratification. The longest dark age in human history is being ended by enlightened Fire Nation.' },
  //   { title: 'Love from the Ashes of War', author: 'Minion of Set', tags: ['Hurt&comfort', 'Romance'], summary: 'Her fate is left in the Avatars gentle hands.' },
  //   { title: 'Salvage', author: 'The Muffin Lance', tags: ['Fluff', 'Hurt&comfort'], summary: 'Hakoda rescues certain 13 years old banished prince.' },
  //   { title: 'Saga of Sun and Moon', author: 'Charles', tags: ['Drama','Adventure'], summary: 'Choice made echoes and alters te whole story of Gaang adventures.' },
  // ];

  constructor(private http: HttpClient) {}
  async getFanfiction (FicTitle?: string, FicAuthor?: string, FicSummary?: string, FicChars?: string[], FicRels?: string[], FicTags?: string[], Fandom?: string) {
    this.http.post('http://localhost:3000/getFictions', {FicTitle, FicAuthor, FicSummary, FicChars, FicRels, FicTags, Fandom}).subscribe(res => {
      this.fic = res;
      this.numOfFics = this.fic.length;
    });
  }

  tiles: Tile[] = [
    { cols: 1, rows: 1, text: 'FicTitle' },
    { cols: 1, rows: 1, text: 'Author'},
    { cols: 2, rows: 1, text: 'Tags', multiple: true},
    { cols: 2, rows: 1, text: 'Summary', textArea: true }
  ]

  tags: string[] = [];
  addTags: string[] = [];
  chars: string[] = [];
  rels: string[] = [];

  @ViewChild('tagInput')
  tagInput!: ElementRef<HTMLInputElement>;


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.addTags.push(value);
    }
    event.chipInput!.clear();
  }

  addClick(event: MatAutocompleteSelectedEvent): void {
    const value = (event.option.value || '').trim();
    if (value) {
      this.addTags.push(value);
    }
    this.tagInput.nativeElement.value = ""
  }

  remove(tag: string): void {
    const index = this.addTags.indexOf(tag);

    if (index >= 0) {
      this.addTags.splice(index, 1);
    }
  }

  @ViewChild('charInput')
  charInput!: ElementRef<HTMLInputElement>;

  addChar(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.chars.push(value);
    }
    event.chipInput!.clear();
  }

  addCharClick(event: MatAutocompleteSelectedEvent): void {
    const value = (event.option.value || '').trim();
    if (value) {
      this.chars.push(value);
    }
    this.charInput.nativeElement.value = ""
  }

  removeChar(tag: string): void {
    const index = this.chars.indexOf(tag);

    if (index >= 0) {
      this.chars.splice(index, 1);
    }
  }

  @ViewChild('relInput')
  relInput!: ElementRef<HTMLInputElement>;

  addRel(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.rels.push(value);
    }
    event.chipInput!.clear();
  }

  addRelClick(event: MatAutocompleteSelectedEvent): void {
    const value = (event.option.value || '').trim();
    if (value) {
      this.rels.push(value);
    }
    this.relInput.nativeElement.value = ""
  }

  removeRel(tag: string): void {
    const index = this.rels.indexOf(tag);

    if (index >= 0) {
      this.rels.splice(index, 1);
    }
  }
}
