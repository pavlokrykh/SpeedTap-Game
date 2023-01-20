import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() timer: number = 0;
  @Input() score: number = 0;
  @Input() game: string = 'none';

  public color: string;
  public fontSize = 'min(4.8vw,24px)';


  
  bounce(){
    this.fontSize = 'min(8vw,40px)';
    setTimeout(() => this.fontSize = 'min(4.8vw,24px)', 100);
  }

  stopTimer(){
    this.timer = 0;
    this.color = 'red';
  }
  

  constructor() { 
    this.color = 'black'; 
  }

  ngOnInit(): void {
  }

}
