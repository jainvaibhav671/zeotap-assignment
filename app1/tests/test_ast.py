from zeotap.ast import *

def test_parse_rule_1():
    rule = "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
    rule_tree = combine_rules([rule])
    level_order(rule_tree)

def test_parse_rule_2():
    rule = "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"
