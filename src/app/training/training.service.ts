import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExerciseChanged = new Subject<Exercise[]>();
  availableExerices: Exercise[] = [];

  private runinigExercise: Exercise;

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Exercise;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExerices = exercises;
        this.exercisesChanged.next([...this.availableExerices]);
      });
  }

  startExercise(selectedId: string) {
    this.runinigExercise = this.availableExerices.find(
      exercise => exercise.name === selectedId
    );
    this.exerciseChanged.next({ ...this.runinigExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runinigExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runinigExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
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

  fetchAllCompletedExercises() {
    return this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExerciseChanged.next(exercises);
      });
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
