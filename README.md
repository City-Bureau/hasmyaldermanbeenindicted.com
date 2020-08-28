# Has my alderman been indicted?

Source code for [hasmyaldermanbeenindicted.com](https://hasmyaldermanbeenindicted.com)

## Setup

Requires `node`, `wget` and GNU Make.

```bash
npm install
npm start
```

## Deploy

The site is deployed to AWS S3 behind a CloudFront distribution. To deploy, install the AWS CLI, change the values for `S3_BUCKET` and `CLOUDFRONT_ID` in `Makefile` and run `make build && make deploy`
