import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { timer, interval } from 'rxjs';
import { FieldComponent } from '../field/field.component';
import { TextComponent } from '../text/text.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor() { }

  @ViewChild(FieldComponent) field: FieldComponent | undefined;
  @ViewChild(TextComponent) text: TextComponent | undefined;

  @Output() openMenu = new EventEmitter();
  @Input() timer: number = 0;

  public score:number = 0;
  public game:string = 'none';

  public countdown:number = 0;
  public cVisible:string = 'hidden';
  private cSubscription:any;
  private tSubscribtion:any ;
  

  receiveScore(){
    this.score += 1;
    this.text?.bounce();
  }

  endGame(event: string){
    this.cVisible = 'hidden';
    if(this.cSubscription) this.cSubscription.unsubscribe();
    this.game = event;
    if(this.tSubscribtion) this.tSubscribtion.unsubscribe(); // to be changed later if this function goes to (game state update) function
    
    if(event==='menu') this.timer = 0;
    else this.text?.stopTimer();
  }


  open(){
    this.openMenu.emit();
    this.endGame('menu');
  }

  // rework ?
  startFrenzy(){
    if(!this.tSubscribtion || this.tSubscribtion.isStopped && this.game === 'frenzy'){
      this.text!.color = 'black';
      this.game = 'none';
      this.score = 0;
      this.field?.clear();
      this.counter();
  
      this.tSubscribtion = timer(4000,1000).subscribe((time) => {
        this.timer!--;
        console.log(time);
        if(this.timer === 0) {
          this.endGame('none');
        };
      });
    }

  }

  startMemo(){
    this.text!.color = 'black';
    this.score = 0;
    this.field?.clear();
    this.timer = 0;
    this.game = 'memorizer';
  }

  
  counter(){
    if(!this.cSubscription || this.cSubscription.isStopped && this.game!='frenzy'){ // prevent counter from starting twice+
      this.cVisible = 'visible';
      this.countdown = 3;

      this.cSubscription = interval(1000).subscribe(() => {

        this.countdown--;
        
        if(this.countdown < 1) {
        
          this.cVisible = 'hidden';
          this.cSubscription.unsubscribe();
          this.game = 'frenzy';
        
        }
      });
    };
    
  }


  ngOnInit(): void {
  }

}
