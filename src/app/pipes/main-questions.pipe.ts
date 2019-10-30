import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../questions/questions.component';

@Pipe({
  name: 'mainQuestions',
  pure: false
})
export class MainQuestionsPipe implements PipeTransform {

  transform(value: Question[]): any[] {
    return value ? value.filter((x) => x.parentId === -1) : [];
  }

}
