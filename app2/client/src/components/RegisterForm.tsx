import * as Dialog from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Form, redirect, useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/utils";

export async function loader() {
    const authorized = await isAuthenticated()

    if (authorized) return redirect("/")

    return null
}

export default function RegisterForm() {

    const navigate = useNavigate()

    return (
        <>
            <Dialog.Dialog open={true} onOpenChange={() => navigate("/")}>
                <Dialog.DialogContent>
                    <Dialog.DialogHeader>
                        <Dialog.DialogTitle>Register</Dialog.DialogTitle>
                        <Dialog.DialogDescription>Join and get timely updates</Dialog.DialogDescription>
                    </Dialog.DialogHeader>
                    <Form action="/register" method="POST" className="flex flex-col gap-5 mt-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" id="name" name="name" placeholder="Eg. John Doe" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" name="email" placeholder="Eg. john@example.com" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input type="password" id="confirm-password" name="confirm-password" />
                        </div>
                        <Button type="submit">Register</Button>
                    </Form>
                </Dialog.DialogContent>
            </Dialog.Dialog>
        </>
    )
}
