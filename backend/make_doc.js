const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

// Map questions to the respective source code paths
const qaData = [
  {
    q: "Task 2. Implement authentication module: define User entity in domain, create Register/Login use-cases in application layer, auth controller/routes with JWT generation, bcrypt hashing, role assignment, input validation, and Winston logging for auth events; add JWT middleware for protected routes.",
    files: [
      'src/domain/entities/User.js',
      'src/application/use-cases/AuthUseCase.js',
      'src/presentation/controllers/AuthController.js',
      'src/presentation/routes/authRoutes.js',
      'src/presentation/middlewares/authMiddleware.js'
    ]
  },
  {
    q: "Task 3. Develop Book management module: create Book entity, CRUD use-cases (create/read/update/delete/search), controllers and routes with librarian-only role middleware, express-validator, and detailed Winston logging for each operation.",
    files: [
      'src/domain/entities/Book.js',
      'src/application/use-cases/BookUseCase.js',
      'src/presentation/controllers/BookController.js',
      'src/presentation/routes/bookRoutes.js'
    ]
  },
  {
    q: "Task 4. Implement User management module: use-cases for CRUD/profile operations (restricted to librarian), controllers/routes with RBAC middleware, input sanitization, and logging for user actions.",
    files: [
      'src/application/use-cases/UserUseCase.js',
      'src/presentation/controllers/UserController.js',
      'src/presentation/routes/userRoutes.js'
    ]
  },
  {
    q: "Task 5. Create Transaction management module: define Transaction entity, use-cases for issue (availability check + due date = 14 days), renew (extend due date), return (update status + fine calculation if overdue), controllers/routes with role checks and comprehensive Winston transaction logging.",
    files: [
      'src/domain/entities/Transaction.js',
      'src/application/use-cases/TransactionUseCase.js',
      'src/presentation/controllers/TransactionController.js',
      'src/presentation/routes/transactionRoutes.js'
    ]
  },
  {
    q: "Task 6. Build Reports module: use-cases for various reports (overdue books, popular books, user-wise history, inventory summary) using business logic, protected librarian-only controllers/routes, and logging for report generation.",
    files: [
      'src/application/use-cases/ReportUseCase.js',
      'src/presentation/controllers/ReportController.js',
      'src/presentation/routes/reportRoutes.js'
    ]
  },
  {
    q: "Database (MongoDB) Tasks 1-6: Design Mongoose schemas, establish DB connection, implement Repository Pattern implementations for Book, User, Transaction, handle optimizations, indexes, timestamps, and integrate with backend.",
    files: [
      'src/infrastructure/config/db.js',
      'src/infrastructure/database/models/User.js',
      'src/infrastructure/database/models/Book.js',
      'src/infrastructure/database/models/Transaction.js',
      'src/infrastructure/repositories/UserRepository.js',
      'src/infrastructure/repositories/BookRepository.js',
      'src/infrastructure/repositories/TransactionRepository.js'
    ]
  }
];

const children = [];
children.push(new Paragraph({
  text: "Backend Implementation Report",
  heading: HeadingLevel.TITLE,
}));

for (const item of qaData) {
  children.push(new Paragraph({
    text: item.q,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 }
  }));

  for (const filePath of item.files) {
    let content = "File not found.";
    if (fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath, 'utf-8');
    }
    
    children.push(new Paragraph({
      text: `File: ${filePath}`,
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 200, after: 100 }
    }));
    
    // Split by newlines to respect formatting
    const lines = content.split('\n');
    for (const line of lines) {
      children.push(new Paragraph({
        children: [new TextRun({ text: line, font: "Courier New", size: 20 })]
      }));
    }
  }
}

const doc = new Document({
  sections: [{
    properties: {},
    children: children,
  }]
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("../Backend_Answers_Code.docx", buffer);
  console.log("Document created successfully at Backend_Answers_Code.docx");
});
