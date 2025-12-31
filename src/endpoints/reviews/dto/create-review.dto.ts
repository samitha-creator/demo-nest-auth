export class CreateReviewDto {
  rating: number;
  comment: string;
  taskId: number;
  toUserId: number;
  fromUserId: number;
}
