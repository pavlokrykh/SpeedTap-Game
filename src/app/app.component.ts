import { Component, ViewChild } from '@angular/core';
import { GameComponent } from './game/game.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FinalSpeedTap';

  @ViewChild(GameComponent) game: GameComponent | undefined;
  @ViewChild(MenuComponent) menu: MenuComponent | undefined;
  


  receiveTimer(event:any){
    this.game!.timer = event[0];
    this.game!.game = event[1];
    
    if(event[1] === 'memorizer'){
      this.game?.startMemo();
    } else this.game?.startFrenzy();
    
  }

  openMenu(){
    this.menu?.open();
  }

}
