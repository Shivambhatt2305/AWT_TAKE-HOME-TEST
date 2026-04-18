const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

const qaData = [
  {
    q: "Task 1. API Integration and Finishing of Project (Axios integration): Integrate React frontend services with backend APIs using Axios: create API service layer for auth, books, users, transactions, reports; automatically attach JWT token from context to protected requests and handle 401/403 responses.",
    files: ['../frontend/src/services/api.js']
  },
  {
    q: "Task 2 & 3 & 4. Enhance frontend global state, end-to-end security, context API sync, Winston logging with morgan, strict CORS, express-rate-limit. Full backend/frontend RBAC enforcement.",
    files: ['src/app.js']
  }
];

const children = [];
children.push(new Paragraph({
  text: "Final API Integration & Security Report",
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
  fs.writeFileSync("../Final_API_Integration_Doc.docx", buffer);
  console.log("Document created successfully at Final_API_Integration_Doc.docx");
});
