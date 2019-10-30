import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChecklistComponent implements  OnDestroy {


  // ngOnInit() {
  // }
  options = ['Yes', 'No'];
  mobileQuery: MediaQueryList;
  category = CategoryData;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  panelOpenState = false;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}

export interface CategoryElement {
  CategoryId: number;
  CategoryName: string;
  CategoryQuestions: QuestionsSet[];
}
export interface QuestionsSet {
  QuestionId: Number;
  Question: string;
  info: string;
  Hasoption: boolean;
  uploadLink: string;
  uploadDoc: string;
  SelectOption: Option[];
  selectedoption: string;
}
export interface Option {
  Yes: QuestionsSet [];
  No: QuestionsSet [];
}

const CategoryData: CategoryElement[] = [
  {
    CategoryId: 123,
    CategoryName: 'Category 1',
    CategoryQuestions: [
      {
        QuestionId: 123,
        Question: 'Have we identified talent across all key roles  ?',
        info: 'Identity of info from question tooltip',
        uploadLink: '',
        uploadDoc: '',
        Hasoption: true,
        SelectOption : [
          {
            Yes : [
              {
                QuestionId: 321,
                Question: 'Category Question Yes selection ?',
                info: 'this is tooltip of yes selection',
                uploadLink: '',
                uploadDoc: '',
                Hasoption: true,
                SelectOption: [
                  {
                    No: [
                      {
                        QuestionId: 412,
                        Question: 'This no question selection',
                        info: 'this is tooltip of no selection',
                        uploadLink: '',
                        uploadDoc: '',
                        Hasoption: false,
                        SelectOption: [],
                        selectedoption: '',
                      }
                    ],
                    Yes: [
                      {
                        QuestionId: 613,
                        Question: 'This yes question selection',
                        info: 'info about yes selection tooltip',
                        uploadDoc: '',
                        uploadLink: '',
                        Hasoption: false,
                        SelectOption: [],
                        selectedoption: '',
                      }
                    ],
                  }
                ],
                selectedoption: '',
              }
            ],
            No: [
              {
                QuestionId: 322,
                Question: 'Category Question no selection ?',
                info: 'Category of no selections tooltip',
                uploadLink: '',
                uploadDoc: '',

                Hasoption: true,
                SelectOption: [
                  {
                    Yes: [
                      {
                        QuestionId: 413,
                        Question: 'Yes of selection from no option',
                        info: 'info about yes selection of no option tooltip',
                        uploadLink: '',
                        uploadDoc: '',
                        Hasoption: false,
                        SelectOption: [],
                        selectedoption: ''
                      }
                    ],
                    No: [
                      {
                        QuestionId: 512,
                        Question: 'Selection of no from no option',
                        info: 'info about of no tooltip option',
                        uploadLink: '',
                        uploadDoc: '',
                        Hasoption: false,
                        SelectOption: [],
                        selectedoption: '',
                      }
                    ]
                  }
                ],
                selectedoption: '',
              }
            ],
          }
        ],
        selectedoption: '',
      },
      {
        QuestionId: 125,
        Question: 'Lorem Ipsum is simply dummy text of the printing and typesetting  ?',
        info: 'Lorem',
        uploadLink: '',
        uploadDoc: '',
        Hasoption: true,
        SelectOption : [

        ],
        selectedoption: '',
      },
      {
        QuestionId: 126,
        Question: 'Lorem Ipsum has been the industry standard dummy  ?',
        info: 'lorem',
        uploadLink: '',
        uploadDoc: '',
        Hasoption: true,
        SelectOption : [

        ],
        selectedoption: '',
      },
    ],
  },
  {
    CategoryId: 153,
    CategoryName: 'Category 2',
    CategoryQuestions: [
      {
        QuestionId: 321,
        Question: 'Aldus PageMaker including versions of Lorem Ipsum ?',
        info: 'lorem',
        Hasoption: true,
        uploadLink: '',
        uploadDoc: '',
        SelectOption : [

        ],
        selectedoption: '',
      },
      {
        QuestionId: 521,
        Question: 'Contrary to popular belief, Lorem Ipsum is not simply  ?',
        info: 'lorem',
        Hasoption: true,
        uploadLink: '',
        uploadDoc: '',
        SelectOption : [

        ],
        selectedoption: '',
      },
      {
        QuestionId: 621,
        Question: 'the more obscure Latin words, consectetur, from ?',
        info: 'lorem',
        Hasoption: true,
        uploadLink: '',
        uploadDoc: '',
        SelectOption : [

        ],
        selectedoption: '',
      },
    ],
  },
  {
    CategoryId: 138,
    CategoryName: 'Category 3',
    CategoryQuestions: [
      {
        QuestionId: 213,
        Question: 'Aldus PageMaker including versions of Lorem Ipsum ?',
        info: 'lorem',
        Hasoption: true,
        uploadLink: '',
        uploadDoc: '',
        SelectOption : [

        ],
        selectedoption: '',
      },
      {
        QuestionId: 215,
        Question: 'Contrary to popular belief, Lorem Ipsum is not simply  ?',
        info: 'lorem',
        Hasoption: true,
        uploadLink: '',
        uploadDoc: '',
        SelectOption : [

        ],
        selectedoption: '',
      },
      {
        QuestionId: 216,
        Question: 'the more obscure Latin words, consectetur, from ?',
        info: 'lorem',
        Hasoption: true,
        uploadLink: '',
        uploadDoc: '',
        SelectOption : [

        ],
        selectedoption: '',
      },
    ],
  }
];

