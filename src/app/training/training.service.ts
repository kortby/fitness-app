import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  availableExerices: Exercise[] = [
    { id: "crunches", name: "Crunches", duration: 1, calories: 8 },
    { id: "touch-toes", name: "Touch Toes", duration: 80, calories: 1 },
    { id: "side-lunges", name: "Side Lunges", duration: 20, calories: 8 },
    { id: "burquees", name: "Burquees", duration: 10, calories: 18 }
  ];

  private runinigExercise: Exercise;

  getAvailableExercises() {
    return this.availableExerices.slice();
  }

  startExercise(selectedId: string) {
    this.runinigExercise = this.availableExerices.find((exercise) => exercise.id === selectedId);
    this.exerciseChanged.next({ ...this.runinigExercise });
  }

  getRunningExercise() {
    console.log({ ...this.runinigExercise });
    return { ...this.runinigExercise };
  }
}
