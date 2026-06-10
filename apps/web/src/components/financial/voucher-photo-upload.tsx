'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Camera, X } from 'lucide-react';

interface VoucherPhotoUploadProps {
  accountId: string;
  voucherId: string;
  existingUrl?: string | null;
  onUploaded: (url: string) => void;
}

async function compressImage(file: File, maxSizeKB = 500): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const maxDim = 1200;
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);

      let quality = 0.8;
      const tryCompress = () => {
        canvas.toBlob(
          (blob) => {
            if (blob && (blob.size / 1024 <= maxSizeKB || quality <= 0.3)) {
              resolve(blob);
            } else {
              quality -= 0.1;
              tryCompress();
            }
          },
          'image/jpeg',
          quality
        );
      };
      tryCompress();
    };
    img.src = URL.createObjectURL(file);
  });
}

export function VoucherPhotoUpload({ accountId, voucherId, existingUrl, onUploaded }: VoucherPhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(existingUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);

    const compressed = await compressImage(file);
    const path = `${accountId}/${voucherId}.jpg`;

    const supabase = createClient();
    const { error } = await supabase.storage
      .from('voucher-photos')
      .upload(path, compressed, { contentType: 'image/jpeg', upsert: true });

    if (!error) {
      const { data: urlData } = supabase.storage
        .from('voucher-photos')
        .getPublicUrl(path);
      setPreview(urlData.publicUrl);
      onUploaded(path);
    }

    setUploading(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative inline-block">
          <img src={preview} alt="Vale" className="h-32 rounded-lg border object-cover" />
          <button
            onClick={() => { setPreview(null); }}
            className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-white shadow"
          >
            <X className="size-3" />
          </button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          <Camera className="mr-1 size-3.5" />
          {uploading ? 'Enviando...' : 'Foto do Vale'}
        </Button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
