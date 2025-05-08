import { useSetting } from "@/hooks/use-setting";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ModeToggle } from "../mode-toggle";

export const SettingsModal=()=>{
    const settings =useSetting();

    return (
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        Change your settings here. You can always change them back.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <Label>Appearnace</Label>
                      <span className="text-[0.8rem] text-muted-foreground">Customize how Jotion looks on your device</span>
                    </div>
                    <ModeToggle/>
                </div>
            </DialogContent>
        </Dialog>
    )

}