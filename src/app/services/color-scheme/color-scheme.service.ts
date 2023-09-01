import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeService {
  public themes: {
    name: 'light' | 'dark';
    title: string;
    icon: string;
    toolTip: string;
  }[] = [
    {
      name: 'light',
      toolTip: 'Change to Light Theme',
      title: 'Light',
      icon: 'wb_sunny',
    },
    {
      name: 'dark',
      toolTip: 'Change to Dark Theme',
      title: 'Dark',
      icon: 'brightness_3',
    },
  ];
  themeAction: BehaviorSubject<'light' | 'dark'> = new BehaviorSubject<
    'light' | 'dark'
  >('light');
  theme$ = this.themeAction.asObservable().pipe(
    tap(theme => {
      this.renderer.removeClass(
        document.body,
        'color-scheme-' + (theme === 'dark' ? 'light' : 'dark')
      );
      this.renderer.addClass(
        document.body,
        'color-scheme-' + (theme === 'dark' ? 'dark' : 'light')
      );
      localStorage.setItem('theme', theme);
    })
  );

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.themeAction.next(
      localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
    );
  }
}
