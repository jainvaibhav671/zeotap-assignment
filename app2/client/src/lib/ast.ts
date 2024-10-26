import { Node } from "@/types";

export function createRule(ruleString: string): Node {
    const tokens = tokenizeRule(ruleString);
    const ast = parseTokens(tokens);
    return ast;
}

// Tokenize function to handle strings, operators, and parentheses
function tokenizeRule(ruleString: string): string[] {
    const regex = /([()])|(\bAND\b|\bOR\b)|([><=]+)|(\'.+?\'|\".+?\")|(\w+)/g;
    const tokens = ruleString.match(regex);
    return tokens ? tokens.map(token => token.trim()) : [];
}

// Parse tokens into an AST structure
function parseTokens(tokens: string[]): Node {
    const stack: Node[] = [];
    let currentNode: Node | null = null;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token === "(") {
            // Push current node onto the stack to process a sub-tree
            if (currentNode) {
                stack.push(currentNode);
            }
            currentNode = null;
        } else if (token === ")") {
            // End of a sub-tree, pop from the stack and attach current node
            if (stack.length > 0) {
                const parentNode = stack.pop()!;
                if (!parentNode.left) {
                    parentNode.left = currentNode!;
                } else {
                    parentNode.right = currentNode!;
                }
                currentNode = parentNode;
            }
        } else if (token === "AND" || token === "OR") {
            // Create an operator node
            const operatorNode: Node = {
                type: "operator",
                operator: token
            };
            operatorNode.left = currentNode; // Attach the left operand
            currentNode = operatorNode;
        } else if (/[><=]/.test(token)) {
            // Handle comparison operators (e.g., "age > 30")
            const leftOperand = currentNode ? currentNode.condition : "";
            const operator = token;
            const rightOperand = tokens[++i];
            currentNode = {
                type: "operand",
                condition: `${leftOperand} ${operator} ${rightOperand}`
            };
        } else if (token.match(/^['"].+['"]$/)) {
            // Handle string literals in quotes (e.g., 'Sales')
            const quotedValue = token;
            if (currentNode && currentNode.type === "operand") {
                currentNode.condition += ` ${quotedValue}`;
            } else {
                currentNode = { type: "operand", condition: quotedValue };
            }
        } else {
            // Handle simple operands (e.g., age, department, salary, etc.)
            if (currentNode && currentNode.type === "operand") {
                currentNode.condition += ` ${token}`;
            } else {
                currentNode = { type: "operand", condition: token };
            }
        }
    }

    return currentNode!;
}

// Example usage:
const ruleString = "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)";
const ast = createRule(ruleString);
console.log(JSON.stringify(ast, null, 2));

