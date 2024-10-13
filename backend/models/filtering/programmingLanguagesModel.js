const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      enum: [
        'Angular',
        'Assembly',
        'C',
        'C#',
        'C++',
        'Cobol',
        'CSS',
        'Dart',
        'Elixir',
        'Erlang',
        'Fortran',
        'Go',
        'GraphQL',
        'Groovy',
        'Haskell',
        'HTML',
        'Java',
        'JavaScript',
        'JSON',
        'Kotlin',
        'Lisp',
        'Lua',
        'MATLAB',
        'MongoDB-query-language',
        'Node',
        'Objective-C',
        'Other',
        'Perl',
        'PHP',
        'Plaintext',
        'PowerShell',
        'Python',
        'React',
        'Ruby',
        'R',
        'Rust',
        'Scala',
        'Shell',
        'SQL',
        'Swift',
        'TypeScript',
        'Vue',
        'YAML',
        'Racket',
        'Scheme',
        'Smalltalk',
        'Tcl',
        'VHDL',
        'Verilog',
        'Arduino',
        'Raspberry-Pi',
        'FPGA',
        'PLC',
        'Microcontroller',
        'All'
      ],
      default: 'All'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username: String,
    bugReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BugReport'
    },
    bugFix: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserAttempt'
    },
    reusableCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ReusableCode'
    },
    blogPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    },
    timestamp: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
