<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Marketing site sections live in src/components/site; copy/data in data.ts so Turkish text is edited in one place.
- Public site media should be stored as project assets and rendered through the shared Photo component so sections retain consistent motion and cropping.
- Photo uses centered cover cropping with overscan, scale-in, and optional parallax; video framing anchors to the top and contains the frame on narrow screens to keep faces visible.
- Studio gallery interactions live in GalleryViewer, using an accessible dialog and uncropped full-size images so thumbnails and enlarged viewing stay separate.
- Member reviews share one grid cell with inactive entries hidden but measured, keeping section height and navigation stable without clipping long reviews.
