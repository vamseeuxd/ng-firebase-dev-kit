// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AlertButtonOverlayHandler = boolean | void | { [key: string]: any };
export interface AlertButton {
  text: string;
  role?: 'basic' | 'primary' | 'accent' | 'warn' | 'link';
  dismiss?: boolean;
  cssClass?: string | string[];
  id?: string;
  handler?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  ) => AlertButtonOverlayHandler | Promise<AlertButtonOverlayHandler>;
}
export type AlertButtons = AlertButton[];
