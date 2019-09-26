import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  availableExerices: Exercise[] = [];

  private runinigExercise: Exercise;
  private exercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    return this.db
      .collection('available-exercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.availableExerices = exercises;
        this.exercisesChanged.next([...this.availableExerices]);
      });
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
