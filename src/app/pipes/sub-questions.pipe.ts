import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../checklist/checklist.component';


@Pipe({
  name: 'subQuestions',
  pure: false
})
export class SubQuestionsPipe implements PipeTransform {

  transform(value: Question[], parentId: string, selectedOption?: string): any[] {
    let result = value.filter((x) => x.parentid !== '' && x.parentid === parentId);
    if (selectedOption) {
      result = result.filter(x => x.answer_opt === selectedOption || x.answer_opt === '3');
    }
    return result;
  }
}
