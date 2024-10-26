import re
from zeotap.ast import combine_rules, level_order, strip_parentheses

rule1 = "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
rule2 = "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"

print("RULE 1")
rule_tree = combine_rules([rule1])
# level_order(rule_tree)

print("RULE 2")
rule_tree = combine_rules([rule2])
# level_order(rule_tree)

# print("REGEX")
# pattern = re.compile(r"\((.*)\s+(AND|OR)\s+(.*)\)")
# res = pattern.match("(age > 30 AND department = 'Marketing')")
# if res:
#     print(res.groups())
# else:
#     print("found nothing")
#
# print("STRIP")
# print(strip_parentheses("(((age > 30 AND department = 'Marketing')))"))
