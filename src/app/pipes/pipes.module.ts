import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParesPipe } from './pares.pipe';
import { FiltroImagenPipe } from './filtro-imagen.pipe';
import { DomSanitizerPipe } from "./dom-sanitizer.pipe";
import { ImageSanitizerPipe } from "./image-sanitizer.pipe";
import { ImagenPipe } from "./imagen.pipe";

@NgModule({
  declarations: [
    ImagenPipe,
    ParesPipe,
    DomSanitizerPipe,
    ImageSanitizerPipe,
    FiltroImagenPipe
  ],
  exports: [
    ImagenPipe,
    ParesPipe,
    FiltroImagenPipe,
    DomSanitizerPipe,
    ImageSanitizerPipe
  ],
  imports: [CommonModule]
})
export class PipesModule {}
