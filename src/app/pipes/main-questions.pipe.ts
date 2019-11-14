import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../questions/questions.component';

@Pipe({
  name: 'mainQuestions',
  pure: false
})
export class MainQuestionsPipe implements PipeTransform {

  transform(value: Question[]): any[] {
    const ques = value ? value.filter((x) => x.parentid === '') : [];
    // console.log(ques);
    return ques;
  }

}
