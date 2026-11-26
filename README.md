# Campaign Link Checker

A small preflight check for campaign links. It finds missing tags, duplicates and inconsistent naming before a link makes it into an ad, email or partner post.

## Run it

Use a current version of Node.js. No installation or API key is needed. Put one URL per line.

```sh
node check-links.mjs sample-links.txt
```

The sample has two passing links and an intentional failure. Exit codes are 0 for all links passing, 1 for validation failures, and 2 for missing or unreadable input.

The three required tags are `utm_source`, `utm_medium` and `utm_campaign`. Each needs one lowercase value. This is a campaign naming convention for the demo. The checker reads the URL locally and never visits it or sends it anywhere.

## Why I built this demo

I’ve set up campaign tracking and worked with developers to verify conversion events. A clean URL does not tell you if the tracking event fires, but it does help keep bad campaign labels out of the reporting in the first place. This demo uses synthetic links only.
