import { Button } from "../../button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../card"
import { Input } from "../../input"
import { Label } from "../../label"

export const UploadPicture = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Custom Logo</CardTitle>
                <CardDescription>
                    Upload a custom logo shown on the invoice / the invoice page for the user.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-xl w-10 h-10 bg-red-300 mb-5"></div>
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="file" />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
            </CardFooter>
        </Card>
    )
}