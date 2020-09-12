import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExerciseChanged = new Subject<Exercise[]>();
  availableExerices: Exercise[] = [];
  private fireSubscription: Subscription[] = [];

  private runinigExercise: Exercise;

  constructor(private db: AngularFirestore, private uiService: UIService) {}

  fetchAvailableExercises() {
    this.uiService.loadingState.next(true);
    this.fireSubscription.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map(actions =>
            actions.map(a => {
              // throw new Error();
              const data = a.payload.doc.data() as Exercise;
              const id = a.payload.doc.id;
              return { id, ...data };
            })
          )
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.uiService.loadingState.next(false);
            this.availableExerices = exercises;
            this.exercisesChanged.next([...this.availableExerices]);
          },
          error => {
            this.uiService.loadingState.next(false);
            this.uiService.showSnackbar(
              'Fetching exercises failed, try later!',
              null,
              3000
            );
            this.exercisesChanged.next(null);
          }
        )
    );
  }

  startExercise(selectedId: string) {
    // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
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
    this.fireSubscription.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            this.finishedExerciseChanged.next(exercises);
          },
          error => {
            console.log(error);
          }
        )
    );
  }

  cancelfireSubscription() {
    this.fireSubscription.forEach(sub => sub.unsubscribe);
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
