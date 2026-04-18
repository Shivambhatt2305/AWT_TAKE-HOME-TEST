// Mock data simulating a database
export const mockBooks = [
  { id: 1, title: 'The Clean Coder', author: 'Robert C. Martin', isbn: '9780137081073', status: 'available' },
  { id: 2, title: 'Refactoring', author: 'Martin Fowler', isbn: '9780134757599', status: 'issued' },
  { id: 3, title: 'Design Patterns', author: 'Erich Gamma', isbn: '9780201633610', status: 'available' },
  { id: 4, title: 'Clean Architecture', author: 'Robert C. Martin', isbn: '9780134494166', status: 'available' },
  { id: 5, title: 'Domain-Driven Design', author: 'Eric Evans', isbn: '9780321125217', status: 'issued' }
];

export const mockUsers = [
  { id: 1, name: 'Alice Smith', email: 'alice@student.test', role: 'student' },
  { id: 2, name: 'Bob Jones', email: 'bob@student.test', role: 'student' },
  { id: 3, name: 'Librarian Admin', email: 'admin@lib.test', role: 'librarian' }
];

export const mockTransactions = [
  { id: 1, bookId: 2, userId: 1, issueDate: '2023-10-01', dueDate: '2023-10-15', status: 'issued' },
  { id: 2, bookId: 5, userId: 2, issueDate: '2023-09-20', dueDate: '2023-10-04', returnDate: '2023-10-05', status: 'returned', fine: 10 }
];
