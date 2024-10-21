import * as Dialog from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { isAuthenticated } from "@/lib/utils";
import { Form, redirect, useNavigate } from "react-router-dom";

export async function loader() {
    const authorized = await isAuthenticated()
    if (authorized) return redirect("/")

    return null
}

export default function LoginForm() {

    const navigate = useNavigate()

    return (
        <>
            <Dialog.Dialog open={true} onOpenChange={() => navigate("/")}>
                <Dialog.DialogContent>
                    <Dialog.DialogHeader>
                        <Dialog.DialogTitle>Login</Dialog.DialogTitle>
                        <Dialog.DialogDescription>Please enter your credentials to login.</Dialog.DialogDescription>
                    </Dialog.DialogHeader>
                    <Form action="/login" method="POST" className="flex flex-col gap-4 mt-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" name="email" placeholder="Eg. john@example.com" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password" />
                        </div>
                        <Button type="submit">Login</Button>
                    </Form>
                </Dialog.DialogContent>
            </Dialog.Dialog>
        </>
    )
}
