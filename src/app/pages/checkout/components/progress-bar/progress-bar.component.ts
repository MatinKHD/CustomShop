import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  @Input() step1!: boolean;
  @Input() step2!: boolean;
  @Input() step3!: boolean;
  @Input() step4!: boolean;
  @Input() stepCircle!: boolean;
  @Input() progressWidth!: number;
  @Input() circlePosition!: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
