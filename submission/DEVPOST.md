# FitReceipt

A garment try-on with consent and a reviewable task record.

DRAFT — not submitted. Event: https://youcam-api-skin-ai-ecommerce.devpost.com/

## Inspiration

A virtual garment preview should make image handling and the limits of the result clear to the shopper.

## What it does

Collects explicit image consent, uploads permitted photos directly through signed provider URLs, creates and polls a YouCam cloth-v4 task, and saves a workspace-owned receipt that can be removed locally.

## How it was built

Next.js routes hold the YouCam credential on the server. Short-lived ownership tokens bind uploaded assets to the requesting workspace. PostgreSQL stores task records, while the browser handles the signed image transfer and preview.

## Challenges

An upload URL must not become a credential leak or allow another workspace to reuse an asset. The local suite checks token ownership, permitted provider hosts and the actual cloth-v4 request shape.

## What is verified

The standalone build and eight tests pass. No real image rendering, provider task success or live end-to-end result is claimed yet.

## Technical lessons

Deleting a local receipt and deleting a provider-held image are different operations. A visual preview also does not establish physical fit.

## Next steps

Use an authorized YouCam key and permitted test images to verify a complete live render, task failure handling and local deletion, then record a one-to-three-minute demonstration.

## Judging requirements

Applies YouCam to a defined e-commerce decision and makes the task auditable. Actual cloth-v4 execution is mandatory evidence before entry.

## Demo sequence

1. Explain the garment decision and label the permitted test photos.
2. Give consent, upload and create a real YouCam task.
3. Show the finished preview and its task record.
4. Explain the fit limitation and remove the local receipt accurately.

## Authorship

Prepared with ChatGPT/Codex assistance. Shared Next.js/workspace infrastructure originates in code-up-matrix/axios-fx-compliance-agent; the product module was developed on 27 October 2026. Shared code must be disclosed under the event’s reuse rules.

## Outstanding artifacts

Repository: https://github.com/code-up-matrix/fitreceipt-devpost-2026. The deployed demo URL, required video, private judge access and entrant declarations must be completed from real outputs. No success receipt is claimed.
