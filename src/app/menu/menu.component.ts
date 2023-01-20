import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { RadioComponent } from '../radio/radio.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() timerMode = new EventEmitter<[number,string]>();
  @ViewChildren(RadioComponent) radio!: QueryList<RadioComponent>;

  public timer: any = '20s';
  public game: any = 'frenzy';
  public menuState:string = 'menu-hide';
  public state: boolean = false;


  constructor() {
    this.timer = localStorage.getItem('app.timer');  
  }

  disable(event:any){

    if(event === 'memorizer') this.state = true;
    
    else this.state = false;
    
  }

  start() {
    this.timer = this.radio.toArray()[0].model;
    this.game = this.radio.toArray()[1].model;
    this.timerMode.emit([Number(this.timer.slice(0,-1)), this.game]);
    this.menuState = 'menu-hide';
    localStorage.setItem('app.timer', this.timer);
  }

  open() {
    this.menuState = 'menu';
  }

  ngOnInit(): void {
    setTimeout(() => this.open(), 500)
  }

}
