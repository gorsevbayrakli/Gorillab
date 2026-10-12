import { useState } from "react";
import { Content } from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { GALERI, GALLERY_VIEWER } from "./data";
import { Photo } from "./motion";

export function GalleryViewer({ images }: { images: readonly string[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const spans = ["md:col-span-2 md:row-span-2", "md:col-span-2", "", "", "md:row-span-2", "", "", "", "", "", "", ""];
  const change = (direction: number) => setSelected((current) => current === null ? null : (current + direction + images.length) % images.length);
  const label = selected === null ? "" : GALERI[selected];

  return (
    <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
      <div className="grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
        {GALERI.map((caption, index) => (
          <Button key={caption} variant="ghost" onClick={() => setSelected(index)} aria-label={`${GALLERY_VIEWER.open}: ${caption}`}
            className={`block h-full w-full overflow-hidden rounded-none p-0 ${spans[index] ?? ""}`}>
            <Photo label={caption} src={images[index] ?? ""} className="h-full w-full" />
          </Button>
        ))}
      </div>
      {selected !== null && (
        <DialogPortal>
          <DialogOverlay className="bg-background/95" />
          <Content aria-describedby={undefined}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") { event.preventDefault(); change(-1); }
              if (event.key === "ArrowRight") { event.preventDefault(); change(1); }
            }}
             className="pointer-events-none fixed inset-4 z-50 flex flex-col items-center justify-center gap-4 outline-none md:inset-8">
            <DialogClose asChild>
               <Button variant="secondary" size="icon" aria-label={GALLERY_VIEWER.close} title={GALLERY_VIEWER.close} className="pointer-events-auto absolute right-0 top-0 h-12 w-12 rounded-full"><X /></Button>
            </DialogClose>
             <img src={images[selected]} alt={label} className="pointer-events-auto min-h-0 max-h-[75dvh] w-auto max-w-full object-contain" />
             <div className="pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-4">
              <Button variant="secondary" size="icon" className="h-12 w-12 shrink-0 rounded-full" aria-label={GALLERY_VIEWER.previous} title={GALLERY_VIEWER.previous} onClick={() => change(-1)}><ChevronLeft /></Button>
              <div className="min-w-0 text-center">
                <DialogTitle className="text-sm font-medium">{label}</DialogTitle>
                <p className="mt-1 text-xs text-muted-foreground">{selected + 1} / {images.length}</p>
              </div>
              <Button variant="secondary" size="icon" className="h-12 w-12 shrink-0 rounded-full" aria-label={GALLERY_VIEWER.next} title={GALLERY_VIEWER.next} onClick={() => change(1)}><ChevronRight /></Button>
            </div>
          </Content>
        </DialogPortal>
      )}
    </Dialog>
  );
}