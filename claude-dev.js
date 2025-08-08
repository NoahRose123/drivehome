#!/usr/bin/env node

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
require('dotenv').config();

// Initialize Claude client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

async function callClaude(prompt, context = '') {
    try {
        const message = await anthropic.messages.create({
            model: process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
            max_tokens: 4000,
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: context ? `${context}\n\n${prompt}` : prompt
                        }
                    ]
                }
            ]
        });

        return message.content[0].text;
    } catch (error) {
        throw new Error(`Claude API Error: ${error.message}`);
    }
}

async function analyzeFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const language = path.extname(filePath).substring(1);

        log(`📊 Analyzing ${filePath}...`, 'cyan');

        const prompt = `Please analyze this ${language} code and provide:
1. A brief description of what the code does
2. Any potential issues or improvements
3. Code quality assessment
4. Suggestions for optimization
5. Security considerations (if applicable)

Please be thorough and provide actionable feedback.`;

        const result = await callClaude(prompt, `File: ${filePath}\nLanguage: ${language}\n\nCode:\n\`\`\`${language}\n${content}\n\`\`\``);

        log('\n📋 Analysis Result:', 'green');
        console.log(result);

        return result;
    } catch (error) {
        log(`❌ Error analyzing file: ${error.message}`, 'red');
    }
}

async function generateCode(description, language = 'javascript') {
    try {
        log(`⚡ Generating ${language} code...`, 'cyan');

        const prompt = `Please generate ${language} code for the following description. 
Make sure the code is:
- Well-commented and documented
- Follows best practices
- Production-ready
- Includes error handling
- Has proper input validation

Description: ${description}`;

        const result = await callClaude(prompt);

        log('\n💻 Generated Code:', 'green');
        console.log(result);

        return result;
    } catch (error) {
        log(`❌ Error generating code: ${error.message}`, 'red');
    }
}

async function refactorCode(filePath, instructions) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const language = path.extname(filePath).substring(1);

        log(`🔧 Refactoring ${filePath}...`, 'cyan');

        const prompt = `Please refactor this ${language} code according to the following instructions:

Instructions: ${instructions}

Please provide:
1. The refactored code
2. Explanation of changes made
3. Benefits of the refactoring
4. Any potential risks or considerations

Make sure the refactored code maintains the same functionality while improving the specified aspects.`;

        const result = await callClaude(prompt, `Original Code:\n\`\`\`${language}\n${content}\n\`\`\``);

        log('\n🔄 Refactored Code:', 'green');
        console.log(result);

        return result;
    } catch (error) {
        log(`❌ Error refactoring code: ${error.message}`, 'red');
    }
}

async function debugCode(filePath, errorMessage) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const language = path.extname(filePath).substring(1);

        log(`🐛 Debugging ${filePath}...`, 'cyan');

        const prompt = `I'm getting this error with my ${language} code. Can you help me debug it?

Error: ${errorMessage}

Please provide:
1. What's causing the error
2. How to fix it
3. The corrected code
4. Prevention tips for similar issues
5. Best practices to avoid this error

Please be thorough and explain the root cause.`;

        const result = await callClaude(prompt, `Code:\n\`\`\`${language}\n${content}\n\`\`\``);

        log('\n🔧 Debug Solution:', 'green');
        console.log(result);

        return result;
    } catch (error) {
        log(`❌ Error debugging code: ${error.message}`, 'red');
    }
}

async function explainCode(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const language = path.extname(filePath).substring(1);

        log(`📚 Explaining ${filePath}...`, 'cyan');

        const prompt = `Please explain this ${language} code in detail:

1. What does each part of the code do?
2. How does the code work step by step?
3. What are the key concepts used?
4. How would you explain this to a beginner?
5. What are the important patterns or techniques used?

Please be educational and thorough.`;

        const result = await callClaude(prompt, `Code:\n\`\`\`${language}\n${content}\n\`\`\``);

        log('\n📖 Code Explanation:', 'green');
        console.log(result);

        return result;
    } catch (error) {
        log(`❌ Error explaining code: ${error.message}`, 'red');
    }
}

async function suggestTests(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const language = path.extname(filePath).substring(1);

        log(`🧪 Generating test suggestions for ${filePath}...`, 'cyan');

        const prompt = `Please suggest comprehensive tests for this ${language} code:

1. Unit tests for each function/method
2. Edge cases to test
3. Integration tests if applicable
4. Test data examples
5. Testing best practices for this code

Please provide actual test code examples.`;

        const result = await callClaude(prompt, `Code:\n\`\`\`${language}\n${content}\n\`\`\``);

        log('\n🧪 Test Suggestions:', 'green');
        console.log(result);

        return result;
    } catch (error) {
        log(`❌ Error generating test suggestions: ${error.message}`, 'red');
    }
}

async function interactiveMode() {
    log('\n🤖 Claude Code Development Assistant', 'bright');
    log('=====================================\n', 'bright');

    while (true) {
        log('\nChoose an option:', 'yellow');
        log('1. 📊 Analyze a file', 'cyan');
        log('2. ⚡ Generate code', 'cyan');
        log('3. 🔧 Refactor code', 'cyan');
        log('4. 🐛 Debug code', 'cyan');
        log('5. 📚 Explain code', 'cyan');
        log('6. 🧪 Suggest tests', 'cyan');
        log('7. 💬 Chat with Claude', 'cyan');
        log('8. ❌ Exit', 'red');

        const choice = await askQuestion('\nEnter your choice (1-8): ');

        switch (choice) {
            case '1':
                const filePath = await askQuestion('Enter file path to analyze: ');
                await analyzeFile(filePath);
                break;

            case '2':
                const description = await askQuestion('Describe the code you want to generate: ');
                const language = await askQuestion('Enter programming language (default: javascript): ') || 'javascript';
                await generateCode(description, language);
                break;

            case '3':
                const refactorFile = await askQuestion('Enter file path to refactor: ');
                const instructions = await askQuestion('Enter refactoring instructions: ');
                await refactorCode(refactorFile, instructions);
                break;

            case '4':
                const debugFile = await askQuestion('Enter file path to debug: ');
                const errorMsg = await askQuestion('Enter the error message: ');
                await debugCode(debugFile, errorMsg);
                break;

            case '5':
                const explainFile = await askQuestion('Enter file path to explain: ');
                await explainCode(explainFile);
                break;

            case '6':
                const testFile = await askQuestion('Enter file path for test suggestions: ');
                await suggestTests(testFile);
                break;

            case '7':
                const question = await askQuestion('Ask Claude anything: ');
                log('\n🤖 Claude:', 'green');
                const response = await callClaude(question);
                console.log(response);
                break;

            case '8':
                log('\n👋 Goodbye! Happy coding!', 'green');
                rl.close();
                return;

            default:
                log('❌ Invalid choice. Please try again.', 'red');
        }
    }
}

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

// Command line interface
async function main() {
    // Check if API key is set
    if (!process.env.ANTHROPIC_API_KEY) {
        log('❌ Please set your ANTHROPIC_API_KEY in the .env file', 'red');
        log('📝 Copy env.example to .env and add your API key', 'yellow');
        return;
    }

    const args = process.argv.slice(2);

    if (args.length === 0) {
        // Interactive mode
        await interactiveMode();
    } else {
        // Command line mode
        const command = args[0];
        const filePath = args[1];

        switch (command) {
            case 'analyze':
                await analyzeFile(filePath);
                break;

            case 'generate':
                const description = args.slice(1).join(' ');
                await generateCode(description);
                break;

            case 'refactor':
                const instructions = args.slice(2).join(' ');
                await refactorCode(filePath, instructions);
                break;

            case 'debug':
                const errorMessage = args.slice(2).join(' ');
                await debugCode(filePath, errorMessage);
                break;

            case 'explain':
                await explainCode(filePath);
                break;

            case 'test':
                await suggestTests(filePath);
                break;

            default:
                log('❌ Unknown command. Available commands:', 'red');
                log('  analyze <file>', 'cyan');
                log('  generate <description>', 'cyan');
                log('  refactor <file> <instructions>', 'cyan');
                log('  debug <file> <error>', 'cyan');
                log('  explain <file>', 'cyan');
                log('  test <file>', 'cyan');
                log('\nOr run without arguments for interactive mode.', 'yellow');
        }
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    log('\n👋 Goodbye! Happy coding!', 'green');
    rl.close();
    process.exit(0);
});

// Run the application
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    analyzeFile,
    generateCode,
    refactorCode,
    debugCode,
    explainCode,
    suggestTests,
    callClaude
}; 