import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ColorSchemeService } from 'src/app/services/color-scheme.service';

@Component({
  selector: 'app-appearance-setting',
  templateUrl: './appearance-setting.component.html',
  styleUrls: ['./appearance-setting.component.scss'],
})
export class AppearanceSettingComponent {
  theme$: Observable<'light' | 'dark'>;
  constructor(public service: ColorSchemeService) {
    this.theme$ = service.theme$;
  }

  setTheme(theme: 'light' | 'dark') {
    this.service.themeAction.next(theme);
  }
}
