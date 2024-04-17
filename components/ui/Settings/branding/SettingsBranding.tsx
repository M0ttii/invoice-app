import { Button } from "../../button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../card";
import { Input } from "../../input";
import { BrandName } from "./BrandName";
import TemplateGrid from "./TemplateGrid";
import { UploadPicture } from "./UploadPicture";

export default function SettingsBranding() {
    return (
        <div className="grid gap-6">
            <BrandName />
            <TemplateGrid />
            <UploadPicture />
        </div>
    )
}