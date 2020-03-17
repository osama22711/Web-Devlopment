import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './searchpipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SearchPipe],
  exports: [SearchPipe],
})
export class PipesModule {}
