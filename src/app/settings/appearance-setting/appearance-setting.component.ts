import { Component } from '@angular/core';
import { ColorSchemeService } from 'src/app/services/color-scheme.service';

@Component({
  selector: 'app-appearance-setting',
  templateUrl: './appearance-setting.component.html',
  styleUrls: ['./appearance-setting.component.scss'],
})
export class AppearanceSettingComponent {
  public themes = [
    {
      name: 'dark',
      icon: 'brightness_3',
    },
    {
      name: 'light',
      icon: 'wb_sunny',
    },
  ];

  constructor(public colorSchemeService: ColorSchemeService) {}

  setTheme(theme: string) {
    this.colorSchemeService.update(theme);
  }
}
