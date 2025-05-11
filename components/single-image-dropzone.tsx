'use client';

import { SingleImageDropzone } from '@/components/upload/single-image';
import {
  UploaderProvider,
  type UploadFn,
} from '@/components/upload/uploader-provider';
import { useEdgeStore } from '@/lib/edgestore';
import * as React from 'react';
import {useParams} from "next/navigation"
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useCoverImage } from '@/hooks/use-cover-image';

export function SingleImageDropzoneUsage() {
  const { edgestore } = useEdgeStore();
  const params =useParams();
  const update =useMutation(api.documents.update);
  const coverImage = useCoverImage();

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      let res;
      if(coverImage.url){
        res= await edgestore.publicFiles.upload({
            file,
            options: {
              replaceTargetUrl: coverImage.url,
            },
           
          });
      }
      else{

       res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
      });
    }
      await update({
        id:params.documentId as Id<"documents">,
        coverImage :res.url,
      });
      coverImage.onClose();
      
      return res;
    },
    [edgestore],
  );

  return (
    <UploaderProvider uploadFn={uploadFn} autoUpload>
      <SingleImageDropzone
        height={200}
        width={200}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 1, // 1 MB
        }}
      />
    </UploaderProvider>
  );
}