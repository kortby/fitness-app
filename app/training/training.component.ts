import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingtraining = false;
  exerciseSubsciption: Subscription;
  @Output() trainingStart = new EventEmitter<void>();

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exerciseSubsciption = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        if (exercise) {
          this.ongoingtraining = true;
        } else {
          this.ongoingtraining = false;
        }
      }
    );
  }

  onStartTraining() {
    this.trainingStart.emit();
  }
}
