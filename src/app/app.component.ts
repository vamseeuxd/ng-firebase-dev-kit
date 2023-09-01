import { Component } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs/operators';
import { LoaderService } from './services/loader/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loaders$: Observable<number[]>;
  constructor(
    swUpdate: SwUpdate,
    public loaderService: LoaderService
  ) {
    this.loaders$ = loaderService.loaders$;
    swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      )
      .subscribe(() => {
        if (confirm('update available for the app please conform')) {
          // Reload the page to update to the latest version.
          document.location.reload();
        }
      });
  }
}
