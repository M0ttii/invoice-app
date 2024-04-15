import { Button } from "../../button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../card";
import { Input } from "../../input";
import TemplateGrid from "./TemplateGrid";
import { UploadPicture } from "./UploadPicture";

export default function SettingsBranding() {
    return (
        <div className="grid gap-6">
            <TemplateGrid />
            <UploadPicture />
        </div>
    )
}