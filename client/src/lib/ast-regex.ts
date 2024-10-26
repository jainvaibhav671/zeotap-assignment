
interface Node {
    type: "operator" | "operand";
    operator?: "AND" | "OR"; // Only for operator nodes
    condition?: string; // Only for operand nodes
    left?: Node; // Left child node
    right?: Node; // Right child node
}

function stripParentheses(string: string) {
    return string
    const regex = /\(*(\([A-Za-z0-9\s><=']*\))\)*/;

    const res = string.match(regex);

    if (!res) return ""

    return res[1]
}

export function parseRule(rule: string) {
    if (rule.trim().length === 0) {
        return {} as Node
    }

    const regex_with_par = /(\(.*\))\s(AND|OR)\s(\(.*\))/;
    const regex_without_par = /([\s'a-zA-Z0-9><=]+)\s(AND|OR)\s([\s'a-zA-Z0-9><=]+)/;
    const condition_regex = /^(\w+)\s([>=<])\s(\w+)$/

    let match;
    if (rule.match(condition_regex)) {
        console.log("condition", rule.match(condition_regex))
        return {
            type: "operand",
            condition: rule
        } as Node
    }

    if (rule.includes("(")) {
        match = rule.match(regex_with_par);
    } else {
        match = rule.match(regex_without_par);
    }

    // @ts-ignore
    let node: Node = {}

    if (match) {
        const group1 = match[1]; // First group
        const operator = match[2]; // Operator
        const group2 = match[3]; // Second group

        const isNotLeafNode = group1.includes("AND") || group2.includes("AND") || group1.includes("OR") || group2.includes("OR")
        console.log({ rule, group1, operator, group2 })

        node = {
            rule: rule,
            type: "operator",
            // @ts-ignore
            operator: operator,
            left: isNotLeafNode
                ? parseRule(stripParentheses(group1).slice(1, group1.length-1))
                : { rule: rule, condition: group1, type: "operand" },
            right: isNotLeafNode
                ? parseRule(stripParentheses(group2).slice(1, group2.length-1))
                : { rule, condition: group2, type: "operand" },
        }
    } else {
        throw new Error("Invalid rule format");
    }

    return node
}

// Example usage:
const rule1 = "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)";
const rule2 = "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)";

console.log("RULE#1")
console.log(parseRule(rule1))

console.log("RULE#2")
console.log(parseRule(rule2))

