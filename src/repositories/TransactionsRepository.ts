import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(types => types.type === 'income')
      .map(values => values.value)
      .reduce(
        (valueAccumulator, current): number => valueAccumulator + current,
        0,
      );
    const outcome = this.transactions
      .filter(types => types.type === 'outcome')
      .map(values => values.value)
      .reduce(
        (valueAccumulator, current): number => valueAccumulator + current,
        0,
      );

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
