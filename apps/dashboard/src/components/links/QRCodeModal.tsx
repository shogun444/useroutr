"use client";

import { Modal, Button } from "@tavvio/ui";
import { Download, X } from "@phosphor-icons/react";
import { useState, useRef } from "react";

interface QRCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  linkName?: string;
}

export function QRCodeModal({ open, onOpenChange, url, linkName }: QRCodeModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate QR code using a simple API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Fetch the QR code image
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      
      // Create download link
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${linkName?.replace(/\s+/g, "-") || "payment-link"}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Failed to download QR code:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="QR Code"
      description={linkName ? `Scan to pay: ${linkName}` : undefined}
      footer={
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            type="button"
            onClick={handleDownload}
            loading={isDownloading}
          >
            <Download size={16} />
            Download PNG
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center py-4">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm">
          <img
            src={qrCodeUrl}
            alt="Payment Link QR Code"
            className="h-48 w-48 object-contain"
            loading="lazy"
          />
        </div>
        <p className="mt-4 text-center text-sm text-[var(--muted-foreground)]">
          Scan this QR code to access the payment link
        </p>
      </div>
    </Modal>
  );
}
