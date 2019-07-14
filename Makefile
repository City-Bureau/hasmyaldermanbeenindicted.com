S3_BUCKET = hasmyaldermanbeenindicted.com

.PHONY: all clean build deploy
.INTERMEDIATE: data/master.zip data/precinct_lookup-master

deploy:
	aws s3 cp ./dist/ s3://$(S3_BUCKET) --recursive --acl=public-read --region=us-east-1
	# aws s3 cp ./data/addresses s3://$(S3_BUCKET)/addresses --recursive --acl=public-read --region=us-east-1 --cache-control max-age=2628000

build:
	rm -rf dist && npm run build

data/addresses: data/precinct_lookup-master
	mv $</output $@

data/precinct_lookup-master: data/master.zip
	unzip -d $(dir $@) $<

data/master.zip:
	wget -O $@ https://github.com/chi-vote/precinct_lookup/archive/master.zip
