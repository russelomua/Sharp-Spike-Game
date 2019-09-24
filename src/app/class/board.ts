import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Board {
  public lines: number = 5;
  public cols: number = 8;

  public presets = [
    {
      name: 'easy',
      template: [2, 1, 0, 0, 0, 0],
      speed: 600,
    }, {
      name: 'normal',
      template: [2, 1, 1, 0, 0],
      speed: 500,
    }, {
      name: 'hard',
      template: [2, 2, 1, 1, 0],
      speed: 400,
    }, {
      name: 'hell',
      template: [2, 2, 2, 2, 1, 1, 0],
      speed: 300,
    },
  ];

  public getPreset(presetName) {
    const presets = this.presets.filter(preset => preset.name === presetName);
    return presets[0];
  }

  public getPresetTemplate(presetName) {
    return this.getPreset(presetName).template;
  }

  public getPresetSpeed(presetName) {
    return this.getPreset(presetName).speed;
  }
}
