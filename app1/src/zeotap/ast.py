from typing import Dict, Self, Union, Any, Literal, List
from zeotap.utils import strip_parentheses


class Node:
    def __init__(
        self,
        rule_string: str,
        node_type: Literal["AND", "OR"] = "OR",
        left: Union[Self, None] = None,
        right: Union[Self, None] = None,
    ):
        self.rule_string = rule_string
        self.type = node_type
        self.left = left
        self.right = right

    def __repr__(self):
        return f"Node({self.rule_string})"

    def isLeaf(self):
        return self.left is None and self.right is None

    def evaluate(self, values) -> bool:
        if not self.left or not self.right:
            print(self.rule_string)
            print(eval(self.rule_string, None, values))
            return eval(self.rule_string, None, values)

        left = self.left.evaluate(values)
        right = self.right.evaluate(values)

        if self.type == "AND":
            print(self.rule_string)
            print(left and right)
            return left and right
        else:
            print(self.rule_string)
            print(left or right)
            return left or right


class AST:
    def __init__(self, rule_string: str):
        rule_string = rule_string.replace("=", "==")

        self.rule_string = rule_string
        self.root = self.parse(rule_string)

    def evaluate(self, values: Dict[str, Any]):
        return self.root.evaluate(values)

    def combine(self, rule_string: str):
        ast = AST(rule_string)

    def parse(self, rule_string: str):
        depth = 0
        left_node: Union[Node, None] = None
        right_node: Union[Node, None] = None
        operator: Union[Literal["AND", "OR"], None] = None

        left_part = None
        right_part = None
        for i, ch in enumerate(rule_string):
            ch = rule_string[i]
            if ch == "(":
                depth += 1
            elif ch == ")":
                depth -= 1
            elif depth == 0 and ch == " ":
                # Set the left operand
                if not left_node:
                    left_part = strip_parentheses(rule_string[0:i])
                    # left_node = self.parse(left_part)
                # Set the right operand
                if operator is not None:
                    right_part = strip_parentheses(rule_string[i+2:-1])
                    # right_node = self.parse(right_part)
                    break

            # Set the operator
            elif depth == 0 and ch == "A":
                operator = "AND"
            elif depth == 0 and ch == "O":
                operator = "OR"

        node = Node(rule_string, operator, left_node, right_node)
        print("-----------------------------------------")
        print(rule_string)
        print(left_part, operator, right_part, sep=" | ")
        # print(left_node, operator, right_node, sep=" | ")
        print("-----------------------------------------")
        return node

def create_rule(rule_string: str):
    ast = AST(rule_string)
    return ast

def combine_rules(rules: List[str]):
    combined_rule = rules[0]
    for rule in rules[1:]:
        combined_rule = f"({combined_rule}) AND ({rule})"

    print("COMBINED RULE")
    print(combined_rule)
    return AST(combined_rule)


def evaluate_data(ast: AST, values: Dict[str, Any]):
    return ast.evaluate(values)


def level_order(tree: AST):
    q: List[Union[Node, None]] = [tree.root, None]
    while len(q) != 0:
        front = q[0]
        q = q[1:]
        if not front:
            if len(q) == 0:
                break

            q.append(None)
            continue

        if front.isLeaf():
            print(front.rule_string)
            continue

        print(front.left, front.type, front.right, sep="|")
        q.extend([front.left, front.right])
