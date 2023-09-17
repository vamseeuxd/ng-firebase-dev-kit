import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaders: number[] = [];
  private loadersAction: BehaviorSubject<number[]> = new BehaviorSubject(
    this.loaders
  );
  loaders$: Observable<number[]> = this.loadersAction.asObservable();
  show(): number {
    const loaderId = new Date().getTime();
    this.loaders.push(loaderId);
    this.loadersAction.next(this.loaders);
    return loaderId;
  }
  hide(loaderId: number) {
    this.loaders = this.loaders.filter(id => id != loaderId);
    this.loadersAction.next(this.loaders);
  }
}
