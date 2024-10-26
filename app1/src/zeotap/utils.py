import re

def contains_parentheses(string: str):
    return ")" in string or "(" in string


def strip_parentheses(string: str):
    res = re.match(r"\(*(\([A-Za-z0-9\s><=']*\))\)*", string)
    if res:
        rs = res.groups()[0]
        return res.groups()[0]
    else:
        return string


print(strip_parentheses("((age > 30 AND department = 'Marketing'))"))
