import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollnavService {

  public scrollChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

    public setdata(value) {

        this.scrollChange.emit(value);
    }
}