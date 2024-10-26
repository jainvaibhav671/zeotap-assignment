import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { parseRule } from "./lib/ast-regex";

export default function App1() {

    const [rule, setRule] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleClick = () => {
        if (rule.trim().length == 0) {
            setError("Rule cannot be empty")
            return
        }

        setLoading(true)
        const ast = parseRule(rule)
        console.log(ast)
        setLoading(false)
    }

    return (
        <div>
            <div className="flex gap-4 p-8 flex-col items-center h-full">
                <h1 className="text-3xl font-bold">Rule Engine with AST</h1>
                <Input placeholder="Enter rule" value={rule} onChange={(e) => setRule(e.target.value)} />
                <Button onClick={handleClick} className="w-full">
                    {loading ? "Loading..." : "Parse"}
                </Button>
                <p className="text-destructive">{error}</p>
                <pre>
                    {JSON.stringify(parseRule(rule), null, 2)}
                </pre>
            </div>
        </div>
    )
}
