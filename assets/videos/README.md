# assets/videos

Local video files go here. The HTML only requests them when a visitor clicks a
play button, so an empty folder costs nothing on page load.

Expected file:

```
assets/videos/intro.mp4
```

Recommended: MP4 (H.264 + AAC), 1920×1080 or 1280×720, under ~25 MB.

To point a play button at a different file, edit its `data-dr-video-src`
attribute in `index.html`:

```html
<button data-dr-video-open="1"
        data-dr-video-type="local"
        data-dr-video-src="assets/videos/intro.mp4"
        data-dr-video-title="পরিচিতি ভিডিও">
```

If the file is missing, the player shows a friendly notice instead of a broken
player. YouTube videos use the same button with
`data-dr-video-type="youtube"` and `data-dr-video-id="VIDEO_ID"`.
