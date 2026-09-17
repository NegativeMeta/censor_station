# Censor Station Web Detector

This repository contains the ONNX export used by Censor Station for browser
inference through ONNX Runtime Web.

## Source and credit

The checkpoint was exported from `nsfw-anime-xl-x1280.pt`, published by
[01miku](https://huggingface.co/01miku) in the
[anime-nsfw-segm-yolo26](https://huggingface.co/01miku/anime-nsfw-segm-yolo26)
model repository.

The export keeps the seven source classes:

`anus`, `nipple`, `penis`, `vagina`, `female face`, `male face`, and `pubic hair`.

## Intended use

The model is used locally in Censor Station to suggest image regions for manual
review. It is not a substitute for human review and should not be used to make
decisions about people.

## License note

The upstream model card currently declares MIT. The original Ultralytics
checkpoint also contains embedded metadata referring to AGPL-3.0. Review the
upstream terms and applicable obligations before redistributing or modifying
this model.
