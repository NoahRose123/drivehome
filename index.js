const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

// Initialize the Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function analyzeCode(code, language = 'javascript') {
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
              text: `Please analyze this ${language} code and provide:
1. A brief description of what the code does
2. Any potential issues or improvements
3. Code quality assessment

Here's the code:
\`\`\`${language}
${code}
\`\`\``
            }
          ]
        }
      ]
    });

    return message.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

async function generateCode(description, language = 'javascript') {
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
              text: `Please generate ${language} code for the following description. Make sure the code is well-commented and follows best practices:

${description}`
            }
          ]
        }
      ]
    });

    return message.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

async function debugCode(code, errorMessage, language = 'javascript') {
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
              text: `I'm getting this error with my ${language} code. Can you help me debug it?

Error: ${errorMessage}

Code:
\`\`\`${language}
${code}
\`\`\`

Please provide:
1. What's causing the error
2. How to fix it
3. The corrected code`
            }
          ]
        }
      ]
    });

    return message.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('🤖 Claude Code API Demo\n');

  // Check if API key is set
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ Please set your ANTHROPIC_API_KEY in the .env file');
    console.log('📝 Copy env.example to .env and add your API key');
    return;
  }

  try {
    // Example 1: Analyze code
    console.log('📊 Analyzing code...');
    const sampleCode = `
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}

console.log(fibonacci(10));
    `;
    
    const analysis = await analyzeCode(sampleCode.trim());
    console.log('Analysis Result:');
    console.log(analysis);
    console.log('\n' + '='.repeat(50) + '\n');

    // Example 2: Generate code
    console.log('⚡ Generating code...');
    const codeRequest = 'Create a function that sorts an array of objects by a specific property';
    const generatedCode = await generateCode(codeRequest);
    console.log('Generated Code:');
    console.log(generatedCode);
    console.log('\n' + '='.repeat(50) + '\n');

    // Example 3: Debug code
    console.log('🐛 Debugging code...');
    const buggyCode = `
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum);
    `;
    const errorMsg = 'TypeError: Cannot read property \'reduce\' of undefined';
    const debugResult = await debugCode(buggyCode.trim(), errorMsg);
    console.log('Debug Result:');
    console.log(debugResult);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the demo
if (require.main === module) {
  main();
}

module.exports = {
  analyzeCode,
  generateCode,
  debugCode
}; 