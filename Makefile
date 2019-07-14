.PHONY: all clean build deploy
.INTERMEDIATE: data/master.zip data/precinct_lookup-master

deploy:
	aws s3 cp ./data/addresses s3://$(S3_BUCKET)/addresses --recursive --acl=public-read --region=us-east-1

build: 
	npm run build

data/addresses: data/precinct_lookup-master
	mv $</output $@

data/precinct_lookup-master: data/master.zip
	unzip -d $(dir $@) $<

data/master.zip:
	wget -O $@ https://github.com/chi-vote/precinct_lookup/archive/master.zip
