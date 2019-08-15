import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { TrainingService } from "./training.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.scss"]
})
export class TrainingComponent implements OnInit {
  ongoingtraining = false;
  exerciseSubsciption: Subscription;

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

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
