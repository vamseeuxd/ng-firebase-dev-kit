import { Component } from '@angular/core';
import { ColorSchemeService } from 'src/app/services/color-scheme.service';

@Component({
  selector: 'app-appearance-setting',
  templateUrl: './appearance-setting.component.html',
  styleUrls: ['./appearance-setting.component.scss'],
})
export class AppearanceSettingComponent {
  public themes = [
    { name: 'light', title: 'Light', icon: 'wb_sunny' },
    { name: 'dark', title: 'Dark', icon: 'brightness_3' },
  ];
  colorScheme = '';
  constructor(public colorSchemeService: ColorSchemeService) {
    this.colorSchemeService.load();
    if (this.colorSchemeService.colorScheme) {
      this.colorScheme = this.colorSchemeService.colorScheme;
    }
  }

  setTheme(theme: string) {
    this.colorSchemeService.update(theme);
  }
}
