import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  @Input() model: string | undefined;
  @Input() name: string | undefined;
  @Input() value: string[] | undefined;
  @Input() state: boolean = false;
  @Input() v: number = 1;
  @Output() changeOption = new EventEmitter<string>();


  update(event:any){
    
    this.changeOption.emit(event);
  
  }
  

  constructor() { }

  ngOnInit(): void {
  }

}
