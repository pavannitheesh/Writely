import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { useCoverImage } from "@/hooks/use-cover-image";

  export const CoverImageModal = () => {
    const coverImage = useCoverImage();
    return (
      <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader >
                    <DialogTitle className="text-lg text-center font-semibold">Cover Image</DialogTitle>
                   
                </DialogHeader>
                <div>
                  TODO : Add Cover Image
                </div>
                
            </DialogContent>
        </Dialog>
    )
  }