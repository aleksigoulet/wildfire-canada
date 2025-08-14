type LessonCollection = Lesson[];


// use of tuple and spread syntax adapted from following resources
// https://www.geeksforgeeks.org/typescript/defining-array-with-multiple-types-in-typescript/#using-a-tuple
// https://blog.logrocket.com/exploring-use-cases-typescript-tuples/#arrays-with-multiple-data-types
type Lesson = {
  metadata: LessonMetadata;
  pages: [IntroPage, ...ContentPage[]];
}

type LessonMetadata = {
  id: number;
  title: string;
}

type IntroPage = IntroWithMultiText | IntroWithObjective;

type IntroWithMultiText = {
  type: ContentType.IntroMulti;
  content: IntroContentWithMultiText;
}

type IntroWithObjective = {
  type: ContentType.Intro;
  content: IntroContentWithObjective;
}

type LessonObjective = {
  id: number;
  item: string;
}

type IntroContentWithObjective = {
  text: string;
  objectives: LessonObjective[];
}

type IntroContentWithMultiText = {
  multiText: LessonTextContent[];
}


type ContentPage = {
  type: ContentType.Page;
  content: LessonContent[];
}

/* 
  define Lesson content with multiple interface to make sure
  that lesson content can only have one of two signatures
  option 1: 
  {
    id
    text
  }

  options 2:
  {
    id
    image
  }

  this method is adapted from answer by user robstarbuck on following post
  https://stackoverflow.com/questions/37688318/typescript-interface-possible-to-make-one-or-the-other-properties-required
*/

interface LessonContentBase {
  id: number;
}

interface LessonTextContent extends LessonContentBase {
  text: string;
  image?: never;
}

interface LessonImageContent extends LessonContentBase {
  image: any;
  text?: never;
}

type LessonContent = LessonTextContent | LessonImageContent;

enum ContentType {
  Intro = 'intro',
  IntroMulti = 'intro-multi',
  Page = 'page'
}

export {
  LessonCollection,
  ContentType,
  LessonTextContent
}