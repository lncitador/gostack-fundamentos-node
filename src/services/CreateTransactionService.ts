import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const balace = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > balace.total) {
      throw Error('Not enough money');
    }
    return this.transactionsRepository.create({ title, type, value });
  }
}

export default CreateTransactionService;
