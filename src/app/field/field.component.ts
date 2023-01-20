import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  // update score in Text component
  @Output() scoreUpdate = new EventEmitter();
  @Output() gameEnd = new EventEmitter<string> ();
  @Input() game:string = 'none';

  ngOnChanges(changes: SimpleChanges) {
    // start game
    if(changes.game.currentValue === 'frenzy') {
      this.randomize(this.black, 3, -1);
    } else if(changes.game.currentValue === 'memorizer') {
      this.memoStep();
      this.step = 1;
    }

  }


  public buttons: any[] = new Array(16);
  public states = new Array(16).fill('white');

  private black:any[] = [];
  private step:number = 1;
  public counter:number = 0;

  

  hit(i:number, event:any){
    if(this.game === 'frenzy'){// === frenzy
  
      this.frenzy(i);

    } else if(this.game === 'memorizer'){

      this.memo(i);

    }

    event.preventDefault(); // mousedown will not be called after touchstart to prevent doubleclicking on touchscreens
  
  }

  
  frenzy(i:number){

    if(this.states[i]==='black') {
      // hit
      this.states[i] = 'green';
      this.randomize(this.black, 3, i); // passing current tile so it is not randomized
      this.scoreUpdate.emit();

    } else {
      // miss
      this.states[i] = 'red';
      this.gameEnd.emit(this.game = 'none');
    
    };

  }

  memo(i:number){
    
    if(this.states[i]!='black') {

      if(i === this.black[this.counter]){
        this.states[i] = 'black';
        this.counter++;

        if(this.counter===this.black.length && this.counter!=0){

          if(this.black.length>15){
            this.clear();
            console.log('win');
            this.gameEnd.emit('win');

          } else {
            this.game = 'print';
            setTimeout(()=>this.memoStep(),1000);
            this.step++;
            this.counter=0;
            this.scoreUpdate.emit();

          }
        }

      } else {
        this.states[i] = 'red';
        this.gameEnd.emit(this.game = 'none');
        this.counter = 0;

      }
    }
  }

  memoStep(){
    
    this.game = 'print'
    this.clear();
    setTimeout(()=>this.randomize(this.black, this.step, -1),1000);

  }


  randomize(black:any[], n:number, x:any) {
    black.splice(black.indexOf(x),1);

    while(black.length < n){
      let i = Math.floor(Math.random()*16); 
      if(black.indexOf(i) == -1 && i != x) black.push(i);

    }

    this.draw(black);

  }


  draw(black:any[]) {
    if(this.game === 'frenzy') {
      for(let i of black) this.states[i] = 'black';

    } else if(this.game === 'print') {

      for(let i of black) {
        setTimeout(() => this.states[i] = 'black', 500*black.indexOf(i));
        setTimeout(() => this.states[i] = 'white', 500*black.indexOf(i)+500*this.step); 
      
      }
      
      setTimeout(() => this.game='memorizer', 1000*this.step);

    }
  }


  clear(){
    this.states = new Array(16).fill('green');
    this.black = [];
  }



  constructor() { }

  ngOnInit(): void {
    this.clear();
  }

}
