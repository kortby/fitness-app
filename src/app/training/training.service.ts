import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  availableExerices: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 1, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 80, calories: 1 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 20, calories: 8 },
    { id: 'burquees', name: 'Burquees', duration: 10, calories: 18 }
  ];

  private runinigExercise: Exercise;
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExerices.slice();
  }

  startExercise(selectedId: string) {
    this.runinigExercise = this.availableExerices.find(
      exercise => exercise.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runinigExercise });
  }

  completeExercise() {
    this.exercises.push({
      ...this.runinigExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runinigExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runinigExercise,
      duration: (this.runinigExercise.duration * progress) / 100,
      calories: (this.runinigExercise.calories * progress) / 100,
      date: new Date(),
      state: 'cancelled'
    });
    this.runinigExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runinigExercise };
  }

  getAllExercises() {
    return this.exercises.slice();
  }
}
