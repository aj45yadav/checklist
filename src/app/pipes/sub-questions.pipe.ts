import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../questions/questions.component';

@Pipe({
  name: 'subQuestions',
  pure: false
})
export class SubQuestionsPipe implements PipeTransform {

  transform(value: Question[], parentId: number): any[] {
    return value.filter((x) => x.parentId !== -1 && x.parentId === parentId);
  }
}
