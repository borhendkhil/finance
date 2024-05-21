export class CreateTransactionDto {
    readonly amount: number;
    readonly date: Date;
    readonly category: string;
    readonly description?: string;
  }
  