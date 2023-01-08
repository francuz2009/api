
export class CreatePostDto {
  readonly title: string;
  readonly content: string;
  //TODO сделать из токена
  readonly userId: number;
}