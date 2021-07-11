export class CreateTaskDto {
  readonly id?: string;
  readonly title: string;
  readonly order: number;
  readonly description: string;
  readonly userId: string | null;
  readonly columnId: string;
  readonly boardId: string | undefined;
}
